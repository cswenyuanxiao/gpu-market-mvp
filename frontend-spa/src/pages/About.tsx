export default function About() {
  document.title = 'About Us — GPU Market';
  return (
    <div className="container py-4 content-prose" style={{ maxWidth: 900 }}>
      <h1>About GPU Market</h1>
      <p>
        GPU Market is a trusted marketplace for buying and selling new and used graphics cards. Our
        mission is to help enthusiasts and professionals upgrade affordably and safely.
      </p>

      <h2>What We Do</h2>
      <ul>
        <li>Curated listings with clear specs and conditions</li>
        <li>Photo guidelines and safe upload processing</li>
        <li>Community-first pricing and transparency</li>
      </ul>

      <h2>Why Choose Us</h2>
      <ul>
        <li>Verified profiles and seller reviews (coming soon)</li>
        <li>Clear return/issue-handling policy on disputes</li>
        <li>Responsive customer support</li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions? <a href="/contact">Contact us</a>. For trade-ins, see{' '}
        <a href="/sell-to-us">Sell to us</a>.
      </p>
    </div>
  );
}
