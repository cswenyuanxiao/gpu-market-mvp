import { useEffect } from 'react';
import { Button } from 'antd';
import { useTitle } from '../lib/seo';

export default function Home() {
  useEffect(() => useTitle('GPU Market — Shop Graphics Cards'), []);

  return (
    <div className="container py-3 px-3 px-md-4">
      {/* Welcome section for homepage */}
      <div className="welcome-section text-center py-5">
        <h1 className="welcome-title mb-4">Welcome to GPU Market</h1>
        <p className="welcome-description mb-4">
          Whether you're here to buy, sell, or trade GPUs, we're confident that we can help you find what you're looking for.
        </p>
        <p className="welcome-shortcuts mb-5">USE THESE SHORTCUTS TO GET AROUND</p>
        <div className="welcome-buttons">
          <div className="welcome-buttons-grid">
            <Button 
              type="primary" 
              size="large" 
              className="welcome-btn"
              onClick={() => window.location.href = '/everything'}
            >
              Buy from GPU Market
            </Button>
            <Button 
              type="primary" 
              size="large" 
              className="welcome-btn"
              onClick={() => window.location.href = '/sell-to-us'}
            >
              Sell to GPU Market
            </Button>
            <Button 
              type="primary" 
              size="large" 
              className="welcome-btn"
              onClick={() => window.location.href = '/sell'}
            >
              Part Exchange
            </Button>
            <Button 
              type="primary" 
              size="large" 
              className="welcome-btn"
              onClick={() => window.location.href = '/contact'}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider" />

      {/* Best Selling Category - simple CTA */}
      <div className="text-center py-4">
        <h2 className="h4 mb-3">Best Selling Category -</h2>
        <p className="text-muted mb-3">Our best selling category is graphics cards.</p>
        <Button type="default" onClick={() => (window.location.href = '/everything?sort=price_desc')}>
          View All GPUs Here!
        </Button>
      </div>

      <div className="section-divider" />

      {/* A Few Reviews - placeholder links to Google search */}
      <div className="text-center py-4">
        <h2 className="h4 mb-3">A Few Reviews -</h2>
        <p className="text-muted mb-3">See all of our reviews here (We're rated 5/5!).</p>
        <Button
          type="default"
          onClick={() => window.open('https://www.google.com/search?q=GPU+Market+Reviews', '_blank')}
        >
          See Reviews on Google
        </Button>
      </div>

      <div className="section-divider" />

      {/* FAQs - compact */}
      <div className="py-4">
        <h2 className="h4 text-center mb-3">FAQs -</h2>
        <div className="accordion" id="faq-accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq1">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq1c">
                Are all of your items used?
              </button>
            </h2>
            <div id="faq1c" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
              <div className="accordion-body">
                Mostly used; we test each item thoroughly to ensure quality and reliability.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq2">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2c">
                What's the best way to get in touch?
              </button>
            </h2>
            <div id="faq2c" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
              <div className="accordion-body">Use the Contact page form; messages go straight to our inbox.</div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq3">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3c">
                What's your return policy?
              </button>
            </h2>
            <div id="faq3c" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
              <div className="accordion-body">30-day return policy if the item does not meet the advertised standard.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
