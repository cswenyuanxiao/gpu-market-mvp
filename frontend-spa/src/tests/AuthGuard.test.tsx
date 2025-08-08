import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AuthGuard } from '../components/AuthGuard';

function App() {
  return (
    <MemoryRouter initialEntries={[{ pathname: '/my' }] as any}>
      <Routes>
        <Route path="/login" element={<div>LoginPage</div>} />
        <Route
          path="/my"
          element={
            <AuthGuard>
              <div>MyPage</div>
            </AuthGuard>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('AuthGuard', () => {
  beforeEach(() => localStorage.clear());
  it('redirects to login if no token', async () => {
    render(<App />);
    expect(await screen.findByText('LoginPage')).toBeInTheDocument();
  });
});


