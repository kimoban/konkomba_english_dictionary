
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WordTable from './WordTable';

describe('WordTable', () => {
  const words = [
    { word: 'foo', definition: 'bar', example: 'baz' },
    { word: 'hello', definition: 'world', example: 'test' },
  ];
  it('renders table headers', () => {
    render(<WordTable words={words} />);
    expect(screen.getByText('Word')).toBeInTheDocument();
    expect(screen.getByText('Definition')).toBeInTheDocument();
    expect(screen.getByText('Example')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
  it('renders word rows', () => {
    render(<WordTable words={words} />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
  it('calls onEdit and onDelete', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(<WordTable words={words} onEdit={onEdit} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByText('Edit')[0]);
    expect(onEdit).toHaveBeenCalled();
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(onDelete).toHaveBeenCalled();
  });
});
