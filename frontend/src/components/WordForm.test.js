
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordForm from './WordForm';

describe('WordForm', () => {
  it('renders input fields', () => {
    render(<WordForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText('Word:')).toBeInTheDocument();
    expect(screen.getByLabelText('Definition:')).toBeInTheDocument();
    expect(screen.getByLabelText('Example:')).toBeInTheDocument();
  });
  it('calls onSubmit with form data', () => {
    const onSubmit = jest.fn();
    render(<WordForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Word:'), { target: { value: 'foo' } });
    fireEvent.change(screen.getByLabelText('Definition:'), { target: { value: 'bar' } });
    fireEvent.change(screen.getByLabelText('Example:'), { target: { value: 'baz' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(onSubmit).toHaveBeenCalledWith({ word: 'foo', definition: 'bar', example: 'baz' });
  });
});
