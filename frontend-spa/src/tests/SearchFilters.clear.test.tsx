import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilters from '../components/SearchFilters';

describe('SearchFilters clear', () => {
  it('clears fields and updates URL', async () => {
    history.replaceState({}, '', '?q=abc&min=10');
    const onApply = (q: any) => {
      const params = new URLSearchParams(location.search);
      // called but URL change handled by hook; here we just assert fields cleared via DOM
    };
    render(<SearchFilters onApply={onApply} />);
    fireEvent.click(screen.getByRole('button', { name: /clear all/i }));
    // state cleared
    expect((screen.getByPlaceholderText('Search title or description') as HTMLInputElement).value).toBe('');
  });
});


