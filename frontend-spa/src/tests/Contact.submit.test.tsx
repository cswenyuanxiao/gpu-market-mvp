import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Contact from '../pages/Contact';

describe('Contact page', () => {
  it('submits message', async () => {
    vi.spyOn(global, 'fetch' as any).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    render(
      <MemoryRouter initialEntries={[{ pathname: '/contact' }] as any}>
        <Routes>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Bob' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'b@c.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello world this is a message' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    (global.fetch as any).mockRestore();
  });
});
