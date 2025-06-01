import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../../components/pages/Login/LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mocks
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('{}'),
      })
    ) as any;
  });

  it('renders all main input fields', () => {
    render(<LoginPage />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Home Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Upload CV/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it('conditionally shows Student ID when role is "user"', () => {
    render(<LoginPage />, { wrapper: MemoryRouter });
    expect(screen.getByLabelText(/Student ID/i)).toBeInTheDocument();
  });

  it('conditionally shows Company Name when role is "company"', () => {
    render(<LoginPage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Select Role/i), {
      target: { value: 'company' },
    });

    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
  });

  it('shows alert on password mismatch', () => {
    window.alert = vi.fn();
    render(<LoginPage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'pass123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match.');
  });

  it('submits form successfully and navigates to user dashboard', async () => {
    render(<LoginPage />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'pass123' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'pass123' },
    });
    fireEvent.change(screen.getByLabelText(/Student ID/i), {
      target: { value: 'S1234567' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() =>
      expect(mockedNavigate).toHaveBeenCalledWith('/user-dashboard')
    );
  });
});
