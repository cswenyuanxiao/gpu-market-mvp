import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-4" style={{ background: '#2f7f82', color: '#e7f2f2' }}>
      <div className="container py-5 small">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="fw-bold mb-3" style={{ color: '#ffffff' }}>
              Useful Pages
            </div>
            <ul className="list-unstyled m-0">
              <li className="mb-2">
                <Link className="footer-link" to="/everything?sort=price_desc">
                  Buy from GPU-MARK
                </Link>
              </li>
              <li className="mb-2">
                <Link className="footer-link" to="/sell-to-us">
                  Sell to GPU-MARK
                </Link>
              </li>
              <li className="mb-2">
                <Link className="footer-link" to="/b2b">
                  B2B
                </Link>
              </li>
              <li className="mb-2">
                <Link className="footer-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link className="footer-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <div className="fw-bold mb-3" style={{ color: '#ffffff' }}>
              Policies
            </div>
            <ul className="list-unstyled m-0">
              <li className="mb-2">
                <Link className="footer-link" to="/terms">
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link className="footer-link" to="/returns">
                  Refund Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link className="footer-link" to="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <a className="footer-link" href="#">
                  Payment Options
                </a>
              </li>
              <li className="mb-2">
                <a className="footer-link" href="#">
                  Grading System
                </a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <div className="fw-bold mb-3" style={{ color: '#ffffff' }}>
              Reviews
            </div>
            <ul className="list-unstyled m-0">
              <li className="mb-2">
                <a className="footer-link" href="#" target="_blank" rel="noreferrer">
                  Trustpilot Reviews
                </a>
              </li>
              <li className="mb-2">
                <a className="footer-link" href="#" target="_blank" rel="noreferrer">
                  Google Reviews
                </a>
              </li>
              <li className="mb-2">
                <a className="footer-link" href="#" target="_blank" rel="noreferrer">
                  Facebook Reviews
                </a>
              </li>
            </ul>
            <div className="mt-4 d-flex gap-3">
              <a className="footer-link" href="#" aria-label="Facebook">
                Facebook
              </a>
              <a className="footer-link" href="#" aria-label="Instagram">
                Instagram
              </a>
              <a className="footer-link" href="#" aria-label="TikTok">
                TikTok
              </a>
              <a className="footer-link" href="#" aria-label="Twitter">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <div className="row align-items-center g-2">
            <div className="col-12 col-md-6">
              <small>© {year}, GPU-MARK</small>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <div className="d-inline-flex flex-wrap gap-2 align-items-center opacity-75">
                <span>American Express</span>
                <span>Apple Pay</span>
                <span>Mastercard</span>
                <span>PayPal</span>
                <span>Visa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
