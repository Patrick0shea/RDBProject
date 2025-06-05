import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'; // Enables toBeInTheDocument()
import AdminLogin from '../../components/pages/Login/AdminLogin'; // Adjust path if needed

describe('AdminLoginPage', () => {
  it('renders form inputs and heading', () => {
    render(
      <MemoryRouter>
        <AdminLoginPage />
      </MemoryRouter>
    );

    // Check for heading
    expect(screen.getByRole('heading', { name: /admin login/i })).toBeInTheDocument();

    // Check for Name input
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();

    // Check for Password input
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check for Login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
