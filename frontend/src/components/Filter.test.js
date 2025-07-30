
import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';

describe('Filter', () => {
  it('renders all region options', () => {
    const mockOnFilter = jest.fn();
    render(<Filter onFilter={mockOnFilter} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    
    expect(screen.getByText('All Regions')).toBeInTheDocument();
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Oceania')).toBeInTheDocument();
  });

  it('calls onFilter with selected region', () => {
    const mockOnFilter = jest.fn();
    render(<Filter onFilter={mockOnFilter} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    
    const asiaOption = screen.getByText('Asia');
    fireEvent.click(asiaOption);
    
    expect(mockOnFilter).toHaveBeenCalledWith('Asia');
  });
});