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
      return (
        <div className="container py-5 text-center">
          <h3>Something went wrong.</h3>
          <p className="text-muted">Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}


