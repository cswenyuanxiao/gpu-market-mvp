import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(await screen.findByText('GPU 1')).toBeInTheDocument();
    // go to page 2 (Antd pagination uses li[title="2"])
    const li = document.querySelector('li[title="2"]') as HTMLElement;
    fireEvent.click(li);
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
    const qc = new QueryClient();
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </QueryClientProvider>
    );
    // initial failed once
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    // trigger explicit refetch via the first Search button
    const searchBtns = screen.getAllByRole('button', { name: /search/i });
    fireEvent.click(searchBtns[0]);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    global.fetch = orig;
  });
});


