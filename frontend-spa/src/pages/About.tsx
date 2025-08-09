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
      {/* Contacts via env-backed config displayed in Contact page; keep direct links for convenience */}
      <ul>
        <li>
          WhatsApp:{' '}
          <a
            href={`https://wa.me/${(window as any)?.VITE_CONTACT_WHATSAPP || '447747310027'}`}
            target="_blank"
            rel="noreferrer"
          >
            +44 7747310027
          </a>
        </li>
        <li>
          Email: <a href="mailto:x1657217402@gmail.com">x1657217402@gmail.com</a>
        </li>
      </ul>
    </div>
  );
}
