import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: 'var(--surface-alt)' }}>
      <header className="border-bottom bg-white">
        <div className="container py-2 d-flex align-items-center justify-content-between">
          <a href="/" className="text-decoration-none fw-bold" style={{ color: 'var(--brand-primary)' }}>
            GPU Market
          </a>
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted">ReqID:</small>
            <span id="reqIdBadge" className="badge text-bg-light">-</span>
          </div>
        </div>
      </header>
      <main className="flex-grow-1">{children}</main>
      <footer className="border-top bg-white">
        <div className="container py-3 text-muted small d-flex justify-content-between">
          <span>© {new Date().getFullYear()} GPU Market</span>
          <span className="d-none d-sm-inline">Buy & Sell Used GPUs</span>
        </div>
      </footer>
    </div>
  );
}


