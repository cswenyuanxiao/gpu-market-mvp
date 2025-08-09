import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home React Query flow', () => {
  it('loads list and paginates', async () => {
    const results = Array.from({ length: 2 }).map((_, i) => ({ id: i + 1, title: 'GPU ' + (i + 1), price: 100 }));
    const first = { total: 24, page: 1, per: 12, results };
    const second = { total: 24, page: 2, per: 12, results };
    const mockFetch = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(first), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify(second), { status: 200 }));
    const orig = global.fetch;
    global.fetch = mockFetch as any;
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(await screen.findByText('GPU 1')).toBeInTheDocument();
    // go to page 2
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    global.fetch = orig;
  });

  it('retries on error then succeeds', async () => {
    const ok = { total: 0, page: 1, per: 12, results: [] };
    const mockFetch = vi.fn()
      .mockRejectedValueOnce(new Error('net'))
      .mockResolvedValueOnce(new Response(JSON.stringify(ok), { status: 200 }));
    const orig = global.fetch;
    global.fetch = mockFetch as any;
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    global.fetch = orig;
  });
});


