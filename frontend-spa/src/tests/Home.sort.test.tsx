import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../pages/Home';

describe('Home sort change', () => {
  it('changes sort and refetches', async () => {
    const ok = { total: 0, page: 1, per: 12, results: [] };
    const mockFetch = vi.fn().mockResolvedValue(new Response(JSON.stringify(ok), { status: 200 }));
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
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    fireEvent.mouseDown(screen.getByDisplayValue('Newest'));
    // simulate selecting price asc
    fireEvent.change(screen.getByDisplayValue('Newest'), { target: { value: 'price_asc' } });
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    global.fetch = orig;
  });
});


