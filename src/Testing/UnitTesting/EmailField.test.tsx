import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmailField } from '../../components/forms/EmailField';
import '@testing-library/jest-dom';


describe('EmailField Component', () => {
  it('renders the input field with correct type and placeholder', () => {
    render(<EmailField value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('name@email.com');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
  });

  it('renders the initial value correctly', () => {
    render(<EmailField value="test@example.com" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('name@email.com') as HTMLInputElement;
    expect(input.value).toBe('test@example.com');
  });

  it('calls onChange with the new value when typed in', () => {
    const handleChange = vi.fn();
    render(<EmailField value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('name@email.com');
    fireEvent.change(input, { target: { value: 'new@example.com' } });
    expect(handleChange).toHaveBeenCalledWith('new@example.com');
  });

  it('applies custom styles correctly', () => {
    render(
      <EmailField
        value=""
        onChange={() => {}}
        style={{ borderColor: 'blue' }}
      />
    );
    const input = screen.getByPlaceholderText('name@email.com');
    expect(input).toHaveStyle('border-color: blue');
  });
});
