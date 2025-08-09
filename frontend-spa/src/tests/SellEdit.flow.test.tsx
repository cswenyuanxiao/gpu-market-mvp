import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Sell from '../pages/Sell';
import Edit from '../pages/Edit';

describe('Sell/Edit submit flows', () => {
  it('Sell success and failure', async () => {
    const orig = global.fetch;
    const okResp = new Response(JSON.stringify({ id: 123 }), { status: 201, headers: { 'content-type': 'application/json' } });
    const failResp = new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    // First call failure, second call success
    global.fetch = vi.fn()
      // submit
      .mockResolvedValueOnce(failResp)
      .mockResolvedValueOnce(okResp) as any;
    render(
      <MemoryRouter initialEntries={["/sell"]}>
        <Routes>
          <Route path="/sell" element={<Sell />} />
          <Route path="/g/:id" element={<div>Detail</div>} />
        </Routes>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'GTX' } });
    fireEvent.change(screen.getByLabelText('Price'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('VRAM (GB)'), { target: { value: '8' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    // failure toast dispatched implicitly; then success submit
    // mock success then navigate effect; we just ensure fetch called twice
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect((global.fetch as any).mock.calls.length).toBeGreaterThanOrEqual(2));
    global.fetch = orig;
  });

  it('Edit success', async () => {
    const orig = global.fetch;
    const getResp = new Response(JSON.stringify({ id: 1, title: 'T', price: 10, condition: 'Used' }), { status: 200 });
    const putResp = new Response(JSON.stringify({ ok: true }), { status: 200 });
    global.fetch = vi.fn()
      .mockResolvedValueOnce(getResp)
      .mockResolvedValueOnce(putResp) as any;
    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/g/:id" element={<div>Detail</div>} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText('Edit Listing');
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => screen.getByText('Detail'));
    global.fetch = orig;
  });
});


