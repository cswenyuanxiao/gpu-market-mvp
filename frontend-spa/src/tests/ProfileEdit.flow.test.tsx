import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProfileEdit from '../pages/ProfileEdit';
import { useAuth } from '../store/auth';

vi.mock('../store/auth', async (orig) => {
  const real = await (orig as any)();
  return {
    ...real,
    useAuth: vi.fn(() => ({
      login: vi.fn(),
      init: vi.fn(),
      logout: vi.fn(),
      user: { id: 1, username: 'u' },
    })),
  };
});

describe('ProfileEdit', () => {
  it('updates display name and refreshes avatar preview after upload', async () => {
    const qc = new QueryClient();
    const okUser = { id: 1, username: 'u', display_name: 'User', avatar_path: null };
    const responses = [
      new Response(JSON.stringify(okUser), { status: 200 }), // GET /api/users/me
      new Response(JSON.stringify({ user: { ...okUser, display_name: 'New' }, token: 'new.jwt' }), {
        status: 200,
      }), // PATCH
      new Response(JSON.stringify({ avatar_path: '/uploads/a.webp' }), { status: 200 }), // POST avatar
      new Response(JSON.stringify({ ...okUser, avatar_path: '/uploads/a.webp' }), { status: 200 }), // GET /api/users/me refresh
    ];
    const mockFetch = vi.fn().mockImplementation(() => Promise.resolve(responses.shift()!));
    const orig = global.fetch;
    global.fetch = mockFetch as any;
    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <ProfileEdit />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    const input = screen.getByPlaceholderText(/display name/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New' } });
    // select avatar
    const file = new File([new Uint8Array([0xff, 0xd8, 0xff])], 'a.jpg', { type: 'image/jpeg' });
    const avatar = screen.getByLabelText(/avatar/i) as HTMLInputElement | null;
    const avatarInput = document.getElementById('avatar') as HTMLInputElement;
    fireEvent.change(avatarInput, { target: { files: [file] } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(4));
    global.fetch = orig;
  });
});
