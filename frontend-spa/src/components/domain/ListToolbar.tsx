import { ReactNode } from 'react';

export default function ListToolbar({ left, right }: { left?: ReactNode; right?: ReactNode }) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <div className="d-flex align-items-center gap-2">{left}</div>
      <div className="d-flex align-items-center gap-2">{right}</div>
    </div>
  );
}


