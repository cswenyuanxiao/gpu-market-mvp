import { Component, ErrorInfo, ReactNode } from 'react';

export class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: unknown) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('AppErrorBoundary', error, info);
  }
  render() {
    if (this.state.hasError) {
      // Show a stable fallback instead of reloading to avoid refresh loop
      return (
        <div className="container py-5" role="alert" aria-live="assertive">
          <h2 style={{ marginBottom: 8 }}>Something went wrong</h2>
          <p className="text-muted" style={{ marginBottom: 16 }}>
            An unexpected error occurred. Please go back to the homepage or try again.
          </p>
          <a href="/" className="ant-btn ant-btn-primary">Go Home</a>
        </div>
      );
    }
    return this.props.children;
  }
}
