import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDashboard3 from '../../components/pages/dashboards/UserDashboard3';

vi.mock('../HomePages/UserHomePage', () => ({
  default: () => <div data-testid="user-homepage">Mocked UserHomePage</div>,
}));

describe('UserDashboard (integration)', () => {
  it('renders UserHomePage when at root route ("/")', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <UserDashboard3 />
      </MemoryRouter>
    );

    expect(screen.getByTestId('user-homepage')).toBeInTheDocument();
  });

  it('displays fallback error message if renderRoutes fails', async () => {
    // Simulate renderRoutes throwing by mocking Routes
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
      return {
        ...actual,
        Routes: () => {
          throw new Error('Simulated error');
        },
      };
    });

    // Dynamically re-import after mocking
    const { default: BrokenDashboard } = await import('../../components/pages/dashboards/UserDashboard3');

    render(
      <MemoryRouter>
        <BrokenDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
