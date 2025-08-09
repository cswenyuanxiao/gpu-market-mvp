import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../pages/Home';

describe('Home React Query flow', () => {
  it('loads list and paginates', async () => {
    const results = Array.from({ length: 2 }).map((_, i) => ({
      id: i + 1,
      title: 'GPU ' + (i + 1),
      price: 100,
    }));
    const first = { total: 24, page: 1, per: 12, results };
    const second = { total: 24, page: 2, per: 12, results };
    const mockFetch = vi
      .fn()
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
      </QueryClientProvider>,
    );
    expect(await screen.findByText('GPU 1')).toBeInTheDocument();
    // go to page 2 (Antd pagination uses li[title="2"])
    const li = document.querySelector('li[title="2"]') as HTMLElement;
    fireEvent.click(li);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    global.fetch = orig;
  });

  it('applies multiple filters combo', async () => {
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
      </QueryClientProvider>,
    );
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    const searchInputs = screen.getAllByPlaceholderText('Search GPUs...');
    fireEvent.change(searchInputs[0], { target: { value: 'rtx' } });
    // set brand
    const trigger = document.querySelectorAll('.ant-select-selector')[1] as HTMLElement;
    fireEvent.mouseDown(trigger);
    const brandOpt = await waitFor(() => {
      const el = Array.from(document.querySelectorAll('.ant-select-item-option-content')).find(
        (n) => /NVIDIA/i.test(n.textContent || ''),
      ) as HTMLElement | undefined;
      if (!el) throw new Error('opt');
      return el;
    });
    fireEvent.click(brandOpt);
    // set VRAM
    const vramTrigger = document.querySelectorAll('.ant-select-selector')[2] as HTMLElement;
    fireEvent.mouseDown(vramTrigger);
    const vramOpt = await waitFor(() => {
      const el = Array.from(document.querySelectorAll('.ant-select-item-option-content')).find(
        (n) => /≥ 8GB/i.test(n.textContent || ''),
      ) as HTMLElement | undefined;
      if (!el) throw new Error('opt');
      return el;
    });
    fireEvent.click(vramOpt);
    const searchButtons = screen.getAllByRole('button', { name: /search/i });
    fireEvent.click(searchButtons[0]);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    global.fetch = orig;
  });

  it('retries on error then succeeds', async () => {
    const ok = { total: 0, page: 1, per: 12, results: [] };
    const mockFetch = vi
      .fn()
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
      </QueryClientProvider>,
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
