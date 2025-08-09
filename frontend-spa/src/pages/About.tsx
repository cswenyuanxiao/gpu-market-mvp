import { useEffect } from 'react';
import { useTitle } from '../lib/seo';

export default function About() {
  useEffect(() => useTitle('About — GPU Market'), []);
  return (
    <div className="container py-4">
      <h3>About</h3>
      <p className="text-muted">
        GPU Market is a minimal marketplace demo for buying and selling used GPUs.
      </p>
    </div>
  );
}
