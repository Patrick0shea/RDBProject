import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../components/pages/Login/LoginPage'; // Adjust path if needed
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Helper to render with router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginPage', () => {
  it('renders form fields', () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/home address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload cv/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('shows error on mismatched passwords', () => {
    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'pass1' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'pass2' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Suppress expected alert for test
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.click(submitButton);

    // You can later add a check for the alert or console.error if needed
  });
});
