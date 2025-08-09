import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';

describe('Floating WhatsApp', () => {
  it('renders a link to wa.me with preset text', () => {
    render(<FloatingWhatsApp />);
    const link = screen.getByRole('link', { name: /chat on whatsapp/i });
    expect(link).toHaveAttribute('href');
    expect(link.getAttribute('href')!).toMatch(/wa\.me\/447747310027/);
    expect(link.getAttribute('href')!).toMatch(/text=Hi%20%3A%29/);
  });
});
