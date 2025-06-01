import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmPassword } from '../../components/forms/confirmPassword';

describe('ConfirmPassword', () => {
  it('renders with the correct value', () => {
    render(
      <ConfirmPassword value="abc123" onChange={() => {}} />
    );

    const input = screen.getByPlaceholderText(/#+/);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('abc123');
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(
      <ConfirmPassword value="" onChange={handleChange} />
    );

    const input = screen.getByPlaceholderText(/#+/);
    fireEvent.change(input, { target: { value: 'newpass' } });
    expect(handleChange).toHaveBeenCalledWith('newpass');
  });

  it('applies passed styles', () => {
    const customStyle = { border: '2px solid red' };
    render(
      <ConfirmPassword value="" onChange={() => {}} style={customStyle} />
    );

    const input = screen.getByPlaceholderText(/#+/);
    expect(input).toHaveStyle('border: 2px solid red');
  });
});
