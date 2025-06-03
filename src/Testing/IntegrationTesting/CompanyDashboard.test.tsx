import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CompanyDashboard3 from '../../components/pages/dashboards/CompanyDashboard3'; // ✅ Update this path
import '@testing-library/jest-dom';

describe('CompanyDashboard', () => {
  it('renders the CompanyHomePage component at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CompanyDashboard3 />
      </MemoryRouter>
    );

    // Adjust this to match something unique in CompanyHomePage
    expect(screen.getByText(/shortlist/i)).toBeInTheDocument();
  });

  it('shows fallback UI if an error occurs', () => {
    // Mock a broken child to force an error
    const BrokenComponent = () => {
      throw new Error('Test error');
    };

    const FaultyDashboard = () => (
      <div className="App">
        <Routes>
          <Route path="/" element={<BrokenComponent />} />
        </Routes>
      </div>
    );

    render(
      <MemoryRouter initialEntries={['/']}>
        <FaultyDashboard />
      </MemoryRouter>
    );

    // The error fallback message
    expect(
      screen.getByText(/something went wrong while loading the dashboard/i)
    ).toBeInTheDocument();
  });
});
