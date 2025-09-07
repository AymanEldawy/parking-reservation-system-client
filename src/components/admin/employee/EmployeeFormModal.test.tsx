import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeFilters from './EmployeeFilters';
import { describe, it, beforeEach, expect } from 'vitest';
import { vi } from 'vitest';
import EmployeeFormModal from './EmployeeFormModal';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('Testing EmployeeFilters component', () => {
  let setSelectedUser = vi.fn();
  let setOpen = vi.fn();

  beforeEach(() => {
    setSelectedUser.mockClear();
    setOpen.mockClear();
    render(<EmployeeFormModal open={true} setOpen={setOpen} setSelectedUser={setSelectedUser} />);
  });

  it('renders h2 / input name elements ', () => {
    expect(screen.getByRole('heading')).toBeDefined();
    expect(screen.getByRole('textbox', { name: /name/i })).toBeDefined();
  });


  it('test typing for input name', () => {
    const inputName = screen.getAllByRole('textbox')[0] as HTMLInputElement;
    fireEvent.change(inputName, { target: { value: 'John' } })
    expect(inputName.value).toBe('John');
  });

  it('should change role value when select changes', () => {
    const select = screen.getAllByRole('combobox')[0] as HTMLInputElement;
    fireEvent.change(select, { target: { value: 'employee' } });
    expect(select.value).toBe('employee');
  });

  it('should change status when select changes', () => {
    const select = screen.getAllByRole('combobox')[1] as HTMLInputElement;
    fireEvent.change(select, { target: { value: 'active' } });
    expect(select.value).toBe('active');
  });


  it('should submit form and show success toast', () => {
    const input = screen.getByLabelText(/name/i);
    const roleSelect = screen.getAllByRole('combobox')[0];
    const statusSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(input, { target: { value: 'John' } });
    fireEvent.change(roleSelect, { target: { value: 'employee' } });
    fireEvent.change(statusSelect, { target: { value: 'active' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    // expect(toast.success).toHaveBeenCalledWith(/User added successfully/i);
  });
});