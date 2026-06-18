# ============================================================================
# CollegeOS — Makefile
# Dev convenience commands for managing the full-stack application.
# ============================================================================

.PHONY: help dev up down build logs migrate seed lint test setup

# ─── Help ────────────────────────────────────────────────────────────────────
help: ## Show all available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ─── Quick Start ─────────────────────────────────────────────────────────────
setup: ## First-time project setup (env + docker + db + seed)
	cp -n .env.example .env 2>/dev/null || true
	docker compose up --build -d
	@echo "Waiting for database to be ready..."
	@sleep 5
	docker compose exec backend alembic upgrade head
	docker compose exec backend python -m scripts.seed
	@echo ""
	@echo "✅ CollegeOS is running at http://localhost"

# ─── Docker ──────────────────────────────────────────────────────────────────
dev: ## Start all services (build + detached)
	docker compose up --build -d

up: ## Start services (no rebuild)
	docker compose up -d

down: ## Stop all services
	docker compose down

build: ## Build all Docker images
	docker compose build

logs: ## Tail logs for all services
	docker compose logs -f

logs-backend: ## Tail backend logs
	docker compose logs -f backend

logs-frontend: ## Tail frontend logs
	docker compose logs -f frontend

# ─── Database ────────────────────────────────────────────────────────────────
migrate: ## Run database migrations
	docker compose exec backend alembic upgrade head

migration: ## Create a new migration (usage: make migration name="add_table")
	docker compose exec backend alembic revision --autogenerate -m "$(name)"

seed: ## Seed the database with sample data
	docker compose exec backend python -m scripts.seed

db-shell: ## Open PostgreSQL shell
	docker compose exec db psql -U collegeos -d collegeos

# ─── Quality ─────────────────────────────────────────────────────────────────
lint: ## Lint frontend and backend code
	docker compose exec frontend npm run lint
	docker compose exec backend python -m flake8 app/

test: ## Run all tests
	docker compose exec backend python -m pytest tests/ -v
	docker compose exec frontend npm run lint

# ─── Cleanup ─────────────────────────────────────────────────────────────────
clean: ## Remove all containers, volumes, and images
	docker compose down -v --rmi all

reset-db: ## Reset database (drop + recreate)
	docker compose down -v
	docker compose up -d db redis
	@sleep 5
	docker compose exec backend alembic upgrade head
	docker compose exec backend python -m scripts.seed
