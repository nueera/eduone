# CollegeOS

A full-stack, modular campus management platform combining **Admission CRM**, **Academic Operations**, **Examination**, **Campus Operations**, and **Finance** into a single unified application. Built with modern technologies for performance, scalability, and developer experience.

---

## Modules

| Module | Description | Accent |
|--------|-------------|--------|
| **Admission CRM** | Lead management, application pipeline, enrollment tracking, conversion analytics | 🟠 Orange |
| **Academic Operations** | Course management, timetables, faculty allocation, attendance tracking | 🔵 Blue |
| **Examination** | Exam scheduling, question papers, grading, result publication | 🟣 Purple |
| **Campus Operations** | Hostel management, transport routes, cafeteria, security | 🟢 Emerald |
| **Finance** | Fee collection, payroll, transactions, budgeting, reporting | 💚 Green |

Each module has its own layout, error boundaries, loading states, and module-branded UI theming for a consistent yet distinct experience.

---

## Design Philosophy

CollegeOS follows an **OS-style interface pattern** inspired by [Nue1](https://github.com/nueera/Nue1):

- **Launcher Homepage** — Tile grid with module cards (like a desktop OS)
- **Global Workspace Dock** — macOS-style dock at the bottom for module switching
- **Command Palette** — `⌘K` / `Ctrl+K` for quick navigation and search
- **Module-branded Theming** — Each module has its own accent color and visual identity
- **Glass Morphism** — Frosted glass surfaces with blur effects
- **OKLCH Color System** — Perceptually uniform colors with dynamic accent syncing
- **Animated Gradient Background** — Floating orbs with dot-grid pattern
- **Dark / Light Mode** — Full theme support with smooth transitions

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | Reusable UI components (Radix UI primitives) |
| [Zustand](https://zustand.docs.pmnd.rs/) | Lightweight state management |
| [TanStack Query](https://tanstack.com/query) | Server state management |
| [TanStack Table](https://tanstack.com/table) | Headless data tables |
| [Recharts](https://recharts.org/) | Charting and data visualization |
| [Framer Motion](https://motion.dev/) | Animations and transitions |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light theme support |
| [Zod](https://zod.dev/) | Schema validation |
| [React Hook Form](https://react-hook-form.com/) | Form management |

### Backend

| Technology | Purpose |
|------------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) | Async Python web framework |
| [SQLAlchemy 2.0](https://www.sqlalchemy.org/) | ORM with async support |
| [Alembic](https://alembic.sqlalchemy.org/) | Database migrations |
| [Pydantic v2](https://docs.pydantic.dev/) | Data validation and settings |
| [Celery](https://docs.celeryq.dev/) | Distributed task queue |
| [python-jose](https://github.com/mpdavis/python-jose) | JWT authentication |
| [asyncpg](https://magicstack.github.io/asyncpg/) | Async PostgreSQL driver |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| [PostgreSQL 16](https://www.postgresql.org/) | Primary database |
| [Redis 7](https://redis.io/) | Caching and message broker |
| [Nginx](https://nginx.org/) | Reverse proxy |
| [Docker Compose](https://docs.docker.com/compose/) | Container orchestration |

---

## Project Structure

```
CollegeOS/
├── backend/                        # 🐍 FastAPI Python Backend
│   ├── app/
│   │   ├── api/v1/                 # API route handlers
│   │   │   ├── auth.py             # Login, Register, JWT
│   │   │   ├── admission.py        # Lead CRUD, Dashboard
│   │   │   ├── academics.py        # Courses, Faculty, Students
│   │   │   ├── examination.py      # Exams, Results, Papers
│   │   │   ├── campus.py           # Hostel, Transport, Security
│   │   │   └── finance.py          # Transactions, Payroll, Budget
│   │   ├── core/                   # Core infrastructure
│   │   │   ├── config.py           # Pydantic Settings
│   │   │   ├── database.py         # Async SQLAlchemy + session
│   │   │   ├── security.py         # JWT + bcrypt
│   │   │   └── deps.py             # Shared dependencies
│   │   ├── models/                 # SQLAlchemy ORM models
│   │   ├── schemas/                # Pydantic validation schemas
│   │   ├── services/               # Business logic layer
│   │   ├── utils/                  # Utility functions
│   │   ├── main.py                 # FastAPI app entry point
│   │   └── worker.py               # Celery background worker
│   ├── alembic/                    # Database migrations
│   ├── prisma/                     # Prisma schema (optional)
│   ├── tests/                      # pytest + httpx tests
│   ├── scripts/seed.py             # Sample data seeder
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Multi-stage (dev + prod)
│   └── alembic.ini
│
├── frontend/                       # ⚡ Next.js TypeScript Frontend
│   ├── src/
│   │   ├── app/                    # Next.js App Router pages
│   │   │   ├── admission/          # Admission CRM module
│   │   │   │   ├── layout.tsx      # Module layout (sidebar + topbar)
│   │   │   │   ├── page.tsx        # Dashboard with charts
│   │   │   │   ├── loading.tsx     # Skeleton loading state
│   │   │   │   └── error.tsx       # Module error boundary
│   │   │   ├── academics/          # Academic Operations module
│   │   │   ├── examination/        # Examination module
│   │   │   ├── campus/             # Campus Operations module
│   │   │   ├── finance/            # Finance module
│   │   │   ├── globals.css         # Global styles + OKLCH theme
│   │   │   ├── layout.tsx          # Root layout with providers
│   │   │   └── page.tsx            # OS-style launcher homepage
│   │   ├── components/
│   │   │   ├── collegeos/          # Core OS components
│   │   │   ├── global/             # Shared module components
│   │   │   ├── providers/          # Context providers
│   │   │   ├── ui/                 # shadcn/ui components
│   │   │   └── workspace/          # Workspace dock
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utility libraries
│   │   └── stores/                 # Zustand state stores
│   ├── public/                     # Static assets
│   ├── package.json                # Node.js dependencies
│   ├── tsconfig.json               # TypeScript config
│   ├── next.config.ts              # Next.js config
│   ├── tailwind.config.ts          # Tailwind CSS config
│   ├── components.json             # shadcn/ui config
│   ├── eslint.config.mjs           # ESLint config
│   ├── postcss.config.mjs          # PostCSS config
│   ├── Dockerfile                  # Multi-stage (dev + prod)
│   └── .dockerignore
│
├── infra/                          # 🏗️ Infrastructure
│   └── nginx.conf                  # Reverse proxy config
│
├── shared/                         # Shared code (frontend ↔ backend)
├── scripts/                        # Root-level utility scripts
├── docker-compose.yml              # 6-service orchestration
├── Makefile                        # Dev convenience commands
├── .env.example                    # Environment variable template
├── .gitignore
├── LICENSE                         # MIT License
└── README.md                       # This file
```

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/) or [Bun](https://bun.sh/)
- [PostgreSQL 16+](https://www.postgresql.org/) (for production)

### Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/collegeos.git
   cd collegeos
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and replace the default secrets with strong random strings:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
   ```

4. **Set up the database:**

   ```bash
   npm run db:push
   # or
   bun run db:push
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   # or
   bun run dev
   ```

6. **Visit the application:**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run type-check` | Run TypeScript type checking |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |

---

## Module Details

### Admission CRM

Manage the entire admission lifecycle from lead generation to enrollment. Track conversion rates, manage application pipelines, and analyze enrollment trends with visual dashboards.

**Key Features:**
- Lead management with status tracking (New → Contacted → Qualified → Application → Enrolled)
- Enrollment funnel visualization
- Conversion rate analytics
- Document management

### Academic Operations

Handle all academic operations including course management, faculty allocation, timetable scheduling, and attendance tracking. Visualize department strength and course distribution.

**Key Features:**
- Course and curriculum management
- Faculty allocation and workload tracking
- Timetable scheduling with conflict detection
- Attendance monitoring with alerts

### Examination

Manage the complete examination process from scheduling to result publication. Track pass rates, subject-wise performance, and grading analytics.

**Key Features:**
- Exam scheduling and room allocation
- Question paper management
- Result processing and publication
- Grading and GPA calculation

### Campus Operations

Oversee all campus facilities including hostels, transport, cafeteria, and security. Monitor occupancy rates, facility usage, and incident tracking.

**Key Features:**
- Hostel room allocation and occupancy tracking
- Transport route management
- Cafeteria menu and feedback
- Security incident logging

### Finance

Manage all financial operations including fee collection, payroll processing, budgeting, and transaction tracking. Visualize revenue vs expenses and fee collection progress.

**Key Features:**
- Fee collection with category-wise tracking
- Payroll management
- Budget allocation and monitoring
- Transaction history and reporting

---

## Architecture Decisions

### OKLCH Color System

CollegeOS uses the [OKLCH color space](https://oklch.com/) for its theme system. This provides:

- **Perceptual uniformity** — Equal numeric steps produce equal visual steps
- **Dynamic accent colors** — Change the accent hue and all module colors shift proportionally
- **Better dark mode** — Colors maintain consistent perceived brightness across themes

### Module-Branded Theming

Each module has its own accent color defined as an OKLCH hue value. When navigating between modules, the sidebar, topbar, and UI accents automatically shift to match the active module's brand color.

### Error Boundaries

Each module is wrapped in its own error boundary, so a crash in one module doesn't take down the entire application. Error states are module-branded for clear identification.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure all lint checks pass before submitting:

```bash
npm run lint
npm run type-check
```

---

## Roadmap

- [ ] Backend API with authentication (NextAuth.js)
- [ ] Real database integration (Prisma + PostgreSQL)
- [ ] Sub-pages for each module (leads list, course details, etc.)
- [ ] Role-based access control (Admin, Faculty, Student)
- [ ] Email notifications
- [ ] File upload for documents
- [ ] Mobile responsive improvements
- [ ] Docker Compose for full-stack deployment
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

---

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
