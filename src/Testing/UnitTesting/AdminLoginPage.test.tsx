// AdminLoginPage.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminLoginPage from '../../components/pages/Login/AdminLoginPage';

describe('AdminLoginPage', () => {
  const mockedNavigate = vi.fn();
  const originalAlert = window.alert;

  beforeEach(() => {
    vi.resetAllMocks();
    // Mock useNavigate from react-router-dom
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => mockedNavigate,
      };
    });

    // Mock alert
    window.alert = vi.fn();
    render(
      <MemoryRouter>
        <AdminLoginPage />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    window.alert = originalAlert;
  });

  it('renders the login form with inputs and button', () => {
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('allows user to type into inputs', () => {
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);

    fireEvent.change(nameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin' } });

    expect(nameInput).toHaveValue('admin');
    expect(passwordInput).toHaveValue('admin');
  });

  it('logs in successfully with correct credentials', () => {
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(nameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);

    expect(localStorage.getItem('user_type')).toBe('2');
    expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard3');
  });

  it('shows alert with invalid credentials', () => {
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(nameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(localStorage.getItem('user_type')).not.toBe('2');
  });
});
