import { useEffect } from 'react';
import { useTitle } from '../lib/seo';

export default function Terms() {
  useEffect(() => useTitle('Terms — GPU Market'), []);
  return (
    <div className="container py-4">
      <h3>Terms</h3>
      <p className="text-muted">Use this demo at your own risk. No warranties provided.</p>
    </div>
  );
}
