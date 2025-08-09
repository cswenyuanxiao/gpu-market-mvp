import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sell from '../pages/Sell';

describe('Sell negative', () => {
  it('shows zod errors when required fields missing', async () => {
    render(
      <MemoryRouter>
        <Sell />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });
});


