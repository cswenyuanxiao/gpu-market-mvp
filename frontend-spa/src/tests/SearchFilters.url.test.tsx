import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilters from '../components/SearchFilters';

describe('SearchFilters URL sync', () => {
  it('updates URL on typing', async () => {
    history.replaceState({}, '', '/');
    render(<SearchFilters onApply={() => {}} />);
    const input = screen.getByPlaceholderText('Search title or description');
    fireEvent.change(input, { target: { value: 'rtx' } });
    // hook writes to history.replaceState
    expect(location.search).toContain('q=rtx');
  });
});


