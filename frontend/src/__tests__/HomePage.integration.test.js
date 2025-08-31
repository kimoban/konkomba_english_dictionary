
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../pages/HomePage';

describe('HomePage integration', () => {
  it('renders search, add, and table', () => {
    render(<HomePage />);
    expect(screen.getByPlaceholderText(/Search for a word/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Word/i)).toBeInTheDocument();
    expect(screen.getByText(/Konkomba English Dictionary/i)).toBeInTheDocument();
  });
});
