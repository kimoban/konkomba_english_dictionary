
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders input', () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    expect(screen.getByPlaceholderText(/Search for a word/i)).toBeInTheDocument();
  });
  it('calls onChange', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText(/Search for a word/i), { target: { value: 'foo' } });
    expect(onChange).toHaveBeenCalledWith('foo');
  });
});
