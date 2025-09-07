import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeFilters from './EmployeeFilters';
import { describe, it, beforeEach, expect } from 'vitest';
import { vi } from 'vitest';

describe('Testing EmployeeFilters component', () => {
  const defaultFilters = { search: '', role: '', status: '' };
  const onFiltersChange = vi.fn();

  beforeEach(() => {
    onFiltersChange.mockClear();
    render(<EmployeeFilters userFilters={defaultFilters} onFiltersChange={onFiltersChange} />);
  });

  it('renders search input and selects', () => {
    expect(screen.getByPlaceholderText(/search employees/i)).toBeDefined();
    expect(screen.getByDisplayValue('All Roles')).toBeDefined();
    expect(screen.getByDisplayValue('All Statuses')).toBeDefined();
  });

  // it('calls onFiltersChange when role select changes', () => {
  //   const inputElement = screen.getAllByRole('textbox')[0] as HTMLInputElement;
  //   fireEvent.change(inputElement, { target: { value: 'John' } });
  //   expect(onFiltersChange).toHaveBeenCalledWith({ ...defaultFilters, search: 'John' });
  // });

  it('calls onFiltersChange when role select changes', () => {
    const select = screen.getAllByRole('combobox')[0];
    fireEvent.change(select, { target: { value: 'admin' } });
    expect(onFiltersChange).toHaveBeenCalledWith({ ...defaultFilters, role: 'admin' });
  });

  it('calls onFiltersChange when status select changes', () => {
    const select = screen.getAllByRole('combobox')[1];
    fireEvent.change(select, { target: { value: 'active' } });
    expect(onFiltersChange).toHaveBeenCalledWith({ ...defaultFilters, status: 'active' });
  });

});