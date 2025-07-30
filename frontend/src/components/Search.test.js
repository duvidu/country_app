import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import { describe, it, expect, jest ,beforeEach} from '@jest/globals';

describe('Search Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders the search input and button', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search for a country...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();
  });

  it('updates search term when typing', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'Canada' } });
    
    expect(input.value).toBe('Canada');
  });

  it('calls onSearch when form is submitted', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(input, { target: { value: 'Germany' } });
    fireEvent.click(screen.getByRole('button'));
    
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Germany');
  });

  // it('calls onSearch when Enter key is pressed', () => {
  //   render(<Search onSearch={mockOnSearch} />);
    
  //   const input = screen.getByPlaceholderText('Search for a country...');
  //   fireEvent.change(input, { target: { value: 'France' } });
  //   fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
  //   expect(mockOnSearch).toHaveBeenCalledTimes(1);
  //   expect(mockOnSearch).toHaveBeenCalledWith('France');
  // });

  // it('does not call onSearch with empty input', () => {
  //   render(<Search onSearch={mockOnSearch} />);
    
  //   fireEvent.click(screen.getByRole('button'));
    
  //   expect(mockOnSearch).not.toHaveBeenCalled();
  // });

  // it('clears input after search', () => {
  //   render(<Search onSearch={mockOnSearch} />);
    
  //   const input = screen.getByPlaceholderText('Search for a country...');
  //   fireEvent.change(input, { target: { value: 'Japan' } });
  //   fireEvent.click(screen.getByRole('button'));
    
  //   expect(input.value).toBe('');
  // });
});