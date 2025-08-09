import { useEffect } from 'react';
import { useTitle } from '../lib/seo';

export default function Privacy() {
  useEffect(() => useTitle('Privacy — GPU Market'), []);
  return (
    <div className="container py-4">
      <h3>Privacy Policy</h3>
      <p className="text-muted">
        We respect your privacy. This demo does not collect personal data beyond what is necessary
        for authentication.
      </p>
    </div>
  );
}
