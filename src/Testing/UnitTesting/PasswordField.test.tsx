import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordField } from '../../components/forms/PasswordField';

describe('PasswordField Unit Tests', () => {
  it('renders the input with correct value and placeholder', () => {
    render(<PasswordField value="secret" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('############');
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe('secret');
  });

  it('calls onChange when the input value changes', () => {
    const handleChange = vi.fn();
    render(<PasswordField value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('############');
    fireEvent.change(input, { target: { value: 'newpass' } });
    expect(handleChange).toHaveBeenCalledWith('newpass');
  });

  it('applies the passed style prop correctly', () => {
    const style = { backgroundColor: 'red' };
    render(<PasswordField value="" onChange={() => {}} style={style} />);
    const input = screen.getByPlaceholderText('############');
    expect(input).toHaveStyle('background-color: red');
  });
});
