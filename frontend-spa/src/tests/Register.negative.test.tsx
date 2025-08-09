import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../pages/Register';

describe('Register negative validations', () => {
  it('shows errors for short username and password', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'a' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(await screen.findByText(/at least 3 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();
  });
});


