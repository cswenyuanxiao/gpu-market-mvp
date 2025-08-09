import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FloatingWhatsApp from '../components/ui/FloatingWhatsApp';

describe('FAB bottom adjusts with visualViewport', () => {
  it('updates --fab-bottom when viewport shrinks', async () => {
    const vv: any = {
      height: 500,
      addEventListener: (t: string, cb: any) => {
        setTimeout(() => {
          vv.height = 400; // simulate keyboard shown
          cb();
        }, 0);
      },
      removeEventListener: () => {},
    };
    (window as any).visualViewport = vv;
    render(
      <MemoryRouter>
        <FloatingWhatsApp />
      </MemoryRouter>,
    );
    await new Promise((r) => setTimeout(r, 10));
    const val = getComputedStyle(document.documentElement).getPropertyValue('--fab-bottom');
    expect(val).toBe('80px');
  });
});
