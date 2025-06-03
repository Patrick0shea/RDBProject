// src/Testing/IntegrationTesting/UserDashboard.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDashboard3 from '../../components/pages/dashboards/UserDashboard3'; // adjust if your path differs
import '@testing-library/jest-dom';

describe('UserDashboard', () => {
  it('renders the UserHomePage at root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <UserDashboard3 />
      </MemoryRouter>
    );

    // Adjust the assertion below to match actual content in UserHomePage
expect(screen.getByRole('heading', { name: /Shortlist/i })).toBeInTheDocument();
  });
});
