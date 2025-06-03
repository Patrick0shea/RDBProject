// src/Testing/UnitTests/ConfirmPasswordInput.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmPasswordInput } from '../../components/forms/confirmPassword';
import '@testing-library/jest-dom';

describe('ConfirmPasswordInput', () => {
  it('renders with initial value and placeholder', () => {
    render(<ConfirmPasswordInput value="secret" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('############') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('secret');
  });

  it('calls onChange when user types', () => {
    const handleChange = vi.fn();
    render(<ConfirmPasswordInput value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('############');
    fireEvent.change(input, { target: { value: 'newpass' } });
    expect(handleChange).toHaveBeenCalledWith('newpass');
  });

  it('applies custom style and className', () => {
  render(
    <ConfirmPasswordInput
      value=""
      onChange={() => {}}
      style={{ backgroundColor: 'red' }}
      className="custom-class"
    />
  );
  const input = screen.getByPlaceholderText('############');
  expect(input).toHaveStyle('background-color: rgb(255, 0, 0)');
  expect(input).toHaveClass('custom-class');
  });
});
