import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordField } from '../../components/forms/PasswordField'; // Adjust the path
import '@testing-library/jest-dom';

describe('PasswordField', () => {
  it('renders with given props', () => {
    render(
      <PasswordField
        value="myPassword"
        onChange={() => {}}
        placeholder="Enter password"
        className="test-class"
        style={{ backgroundColor: 'lightgray' }}
      />
    );

    const input = screen.getByPlaceholderText('Enter password') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('myPassword');
    expect(input.className).toContain('test-class');
    expect(input).toHaveStyle('background-color: rgb(211, 211, 211)');
  });

  it('calls onChange with new value', () => {
    const handleChange = vi.fn();
    render(<PasswordField value="" onChange={handleChange} placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password');

    fireEvent.change(input, { target: { value: 'newpass' } });
    expect(handleChange).toHaveBeenCalledWith('newpass');
  });

  it('handles onChange errors gracefully', () => {
    const errorFn = vi.fn(() => {
      throw new Error('Test error');
    });
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<PasswordField value="" onChange={errorFn} placeholder="Error test" />);
    const input = screen.getByPlaceholderText('Error test');

    fireEvent.change(input, { target: { value: 'oops' } });

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'There was a problem updating the password. Please try again.'
    );
  });
});
