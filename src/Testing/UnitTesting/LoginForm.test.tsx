import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../../components/forms/LoginForm';

describe('LoginForm Unit Tests', () => {
  const setup = (propsOverride = {}) => {
    const onEmailChange = vi.fn();
    const onPasswordChange = vi.fn();
    const onSubmit = vi.fn((e) => e.preventDefault());

    const defaultProps = {
      title: 'Test Login',
      role: 'user' as const,
      email: 'test@example.com',
      password: 'password123',
      onEmailChange,
      onPasswordChange,
      onSubmit,
      ...propsOverride,
    };

    render(<LoginForm {...defaultProps} />);
    return { ...defaultProps };
  };

  it('renders title and inputs correctly', () => {
    setup();
    expect(screen.getByText('Test Login')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('calls onEmailChange when typing in email field', () => {
    const { onEmailChange } = setup();
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    expect(onEmailChange).toHaveBeenCalledWith('new@example.com');
  });

  it('calls onPasswordChange when typing in password field', () => {
    const { onPasswordChange } = setup();
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'newpass' } });
    expect(onPasswordChange).toHaveBeenCalledWith('newpass');
  });

  it('calls onSubmit when form is submitted', () => {
    const { onSubmit } = setup();
    fireEvent.submit(screen.getByRole('form', { hidden: true }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('displays error message if provided', () => {
    setup({ error: 'Invalid login' });
    expect(screen.getByText('Invalid login')).toBeInTheDocument();
  });
});
