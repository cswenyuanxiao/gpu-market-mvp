import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';

function mount(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/login" element={<FloatingWhatsApp />} />
        <Route path="/register" element={<FloatingWhatsApp />} />
        <Route path="/500" element={<FloatingWhatsApp />} />
        <Route path="/" element={<FloatingWhatsApp />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('FloatingWhatsApp visibility', () => {
  it('is hidden on login/register/error pages', () => {
    ['/login', '/register', '/500'].forEach((p) => {
      mount(p);
      expect(screen.queryByRole('link', { name: /chat on whatsapp/i })).toBeNull();
    });
  });
  it('is visible on home', () => {
    mount('/');
    expect(screen.getByRole('link', { name: /chat on whatsapp/i })).toBeInTheDocument();
  });
});
