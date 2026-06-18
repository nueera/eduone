'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  moduleName: string;
  moduleColor: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ModuleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[${this.props.moduleName}] Error:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${this.props.moduleColor}18` }}
          >
            <span className="text-2xl" style={{ color: this.props.moduleColor }}>!</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            {this.props.moduleName} — Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground max-w-md text-center">
            An unexpected error occurred in the {this.props.moduleName} module.
            Please try refreshing the page.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: this.props.moduleColor, color: 'white' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
