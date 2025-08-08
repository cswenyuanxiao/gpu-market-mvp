import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

const originalFetch = global.fetch;

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ token: 't.jwt.h' }), { status: 200 }),
    ) as any;
  });
  it('submits and stores token', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'u' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'p' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => expect(localStorage.getItem('token')).toBe('t.jwt.h'));
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });
});


