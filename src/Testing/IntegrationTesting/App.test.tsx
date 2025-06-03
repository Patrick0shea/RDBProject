// src/__tests__/App.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { describe, it, expect } from 'vitest';

describe('App integration test', () => {
  it('renders the Navbar and default route (LandingPage)', () => {
    render(<App />);

    // Navbar should be present
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Adjust based on LandingPage content
    expect(screen.getByText(/landing page/i)).toBeInTheDocument();
  });

 it('renders LoginPage at /login route', () => {
  window.history.pushState({}, '', '/login');
  render(<App />);

  // Use a more specific assertion:
  expect(screen.getByRole('heading', { name: /create/i })).toBeInTheDocument();
});
  it('renders AdminDashboard at /admin-dashboard3', () => {
    window.history.pushState({}, '', '/admin-dashboard3');
    render(<App />);

    expect(screen.getByText(/students/i)).toBeInTheDocument();
    expect(screen.getByText(/companies/i)).toBeInTheDocument();
    expect(screen.getByText(/feedback/i)).toBeInTheDocument();
  });

  it('renders fallback LandingPage for unknown route', () => {
    window.history.pushState({}, '', '/this-does-not-exist');
    render(<App />);

    expect(screen.getByText(/landing page/i)).toBeInTheDocument(); // Adjust accordingly
  });
});
