import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SellToUs from '../pages/SellToUs';

describe('SellToUs page', () => {
  it('validates and submits', async () => {
    vi.spyOn(global, 'fetch' as any).mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 1 }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    render(
      <MemoryRouter initialEntries={[{ pathname: '/sell-to-us' }] as any}>
        <Routes>
          <Route path="/sell-to-us" element={<SellToUs />} />
        </Routes>
      </MemoryRouter>,
    );

    // Fill form
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(screen.getByLabelText(/model/i), { target: { value: 'RTX 4090' } });

    // Select brand (Antd Select requires opening then picking option)
    const brandInput = screen.getByLabelText(/brand/i);
    const brandField = brandInput.closest('.mb-3') as HTMLElement;
    const trigger = brandField.querySelector('.ant-select .ant-select-selector') as HTMLElement;
    fireEvent.mouseDown(trigger);
    const optionContent = await waitFor(() => {
      const cands = Array.from(
        document.querySelectorAll('.ant-select-item-option-content'),
      ) as HTMLElement[];
      const el = cands.find((n) => /NVIDIA/i.test(n.textContent || ''));
      if (!el) throw new Error('option not ready');
      return el;
    });
    fireEvent.click(optionContent);

    const priceInput = screen.getByLabelText(/expected price/i) as HTMLInputElement;
    fireEvent.change(priceInput, { target: { value: '1000' } });
    await waitFor(() => expect(priceInput.value).toBe('1000'));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    (global.fetch as any).mockRestore();
  });
});
