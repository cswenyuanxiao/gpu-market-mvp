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
  const wrapperClass = `form-field-wrapper ${error ? 'has-error' : ''}`;
  return (
    <div className={wrapperClass}>
      {label && (
        <label className="form-label-modern" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      <div className="form-control-slot">{children}</div>
      {hint && !error && <div className="form-hint">{hint}</div>}
      {error && <div className="form-error" role="alert">{error}</div>}
    </div>
  );
}


