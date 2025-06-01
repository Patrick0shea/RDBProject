import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AccLoginPage from '../../components/pages/Login/AccLoginPage';

// Mock navigate
const mockedNavigate = vi.fn();

// Mock fetch globally
const globalFetch = global.fetch;

beforeEach(() => {
  vi.resetAllMocks();

  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockedNavigate,
    };
  });

  global.fetch = vi.fn();
  vi.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  global.fetch = globalFetch;
  vi.restoreAllMocks();
});

describe('AccLoginPage', () => {
  it('renders all form fields', () => {
    render(<MemoryRouter><AccLoginPage /></MemoryRouter>);

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('updates form input values', () => {
    render(<MemoryRouter><AccLoginPage /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Select Role/i), {
      target: { value: 'company' },
    });

    expect(screen.getByLabelText(/Email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/Password/i)).toHaveValue('password123');
    expect(screen.getByLabelText(/Select Role/i)).toHaveValue('company');
  });

  it('submits the form and navigates to correct dashboard on success', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Login successful' }),
    });

    render(<MemoryRouter><AccLoginPage /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/Select Role/i), {
      target: { value: 'admin' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard');
    });
  });

  it('shows alert on failed login', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
    });

    render(<MemoryRouter><AccLoginPage /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'bad@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Login failed. Please check your credentials.'
      );
      expect(mockedNavigate).not.toHaveBeenCalled();
    });
  });
});
