import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../pages/Home';

function wrap(ui: React.ReactNode) {
  const qc = new QueryClient();
  return (
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={['/everything']}>
        <Routes>
          <Route path="/everything" element={ui} />
          <Route path="/" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('Home reset sort', () => {
  it('resets to price_desc on /everything and date_new elsewhere', async () => {
    const ok = { total: 0, page: 1, per: 12, results: [] };
    const mockFetch = vi.fn().mockResolvedValue(new Response(JSON.stringify(ok), { status: 200 }));
    const orig = global.fetch;
    global.fetch = mockFetch as any;
    // on /everything
    render(wrap(<Home />));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    mockFetch.mockClear();
    fireEvent.click(screen.getByRole('button', { name: /reset sort/i }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    const url1 = (mockFetch.mock.calls[0]?.[0] as string) || '';
    expect(url1).toMatch(/sort=price_desc/);

    // on /
    mockFetch.mockClear();
    render(wrap(<Home />));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    mockFetch.mockClear();
    fireEvent.click(screen.getByRole('button', { name: /reset sort/i }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    const url2 = (mockFetch.mock.calls[0]?.[0] as string) || '';
    expect(url2).toMatch(/sort=newest/); // backend param for date_new is mapped to newest
    global.fetch = orig;
  });
});
