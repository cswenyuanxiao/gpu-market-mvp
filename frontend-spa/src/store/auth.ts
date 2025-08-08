import { create } from 'zustand';

type User = { id: number; username?: string; display_name?: string } | null;

type AuthState = {
  token: string | null;
  user: User;
  login: (token: string) => void;
  logout: () => void;
  init: () => void;
};

function decodeJwt(token: string): any {
  try {
    const payload = token.split('.')[1] || '';
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,
  init: () => {
    const t = localStorage.getItem('token');
    if (t) {
      const payload = decodeJwt(t);
      set({ token: t, user: payload ? { id: payload.id, username: payload.username, display_name: payload.display_name } : null });
    }
  },
  login: (t: string) => {
    localStorage.setItem('token', t);
    const payload = decodeJwt(t);
    set({ token: t, user: payload ? { id: payload.id, username: payload.username, display_name: payload.display_name } : null });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));


