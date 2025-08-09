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
    // open antd Select dropdown
    const trigger = document.querySelector('.ant-select .ant-select-selector') as HTMLElement;
    fireEvent.mouseDown(trigger);
    // wait for dropdown render and click the option content
    const optionContent = await waitFor(() => {
      const el = document.querySelector('.ant-select-item-option-content') as HTMLElement | null;
      if (!el) throw new Error('option not ready');
      return el;
    });
    // ensure it's the Price ↑ entry if multiple
    const candidates = Array.from(document.querySelectorAll('.ant-select-item-option-content')) as HTMLElement[];
    const priceAsc = candidates.find((n) => /Price ↑/i.test(n.textContent || '')) || optionContent;
    fireEvent.click(priceAsc);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));
    global.fetch = orig;
  });
});


