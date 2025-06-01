import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CompanyDashboard3 from '../../components/pages/dashboards/CompanyDashboard3';

vi.mock('../HomePages/CompanyHomePage', () => ({
  default: () => <div>Company Home Page Loaded</div>,
}));

describe('CompanyDashboard Integration', () => {
  it('renders CompanyHomePage when at root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CompanyDashboard3 />
      </MemoryRouter>
    );

    expect(screen.getByText('Company Home Page Loaded')).toBeInTheDocument();
  });

  it('handles renderRoutes error gracefully', async () => {
    // Force an error in renderRoutes
    vi.mock('react-router-dom', async (original) => {
      const mod = await original;
      return {
        ...mod,
        Routes: () => {
          throw new Error('Forced error');
        },
      };
    });

    // Dynamically import again to apply mocked Routes
    const { default: BrokenDashboard } = await import('../../components/pages/dashboards/CompanyDashboard3');

    render(
      <MemoryRouter initialEntries={['/']}>
        <BrokenDashboard />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/something went wrong while loading the dashboard/i)
    ).toBeInTheDocument();
  });
});
