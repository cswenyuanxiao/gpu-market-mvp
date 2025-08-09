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
      // Try a soft-reload of app shell once（避免陷入白屏循环）
      if (typeof window !== 'undefined') {
        try {
          const url = new URL(window.location.href);
          url.searchParams.set('ts', String(Date.now()));
          window.location.replace(url.toString());
        } catch {}
      }
      return null;
    }
    return this.props.children;
  }
}
