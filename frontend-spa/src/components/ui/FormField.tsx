import { ReactNode } from 'react';

export default function FormField({
  label,
  htmlFor,
  children,
  hint,
  error,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  hint?: string;
  error?: string;
}) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && !error && <div className="form-text">{hint}</div>}
      {error && <div className="text-danger small mt-1">{error}</div>}
    </div>
  );
}


