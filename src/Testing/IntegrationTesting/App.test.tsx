import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('App Routing Integration', () => {
  it('renders Landing Page by default', () => {
    render(
      <MemoryRouter initialEntries={['/landing-page']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/landing page/i)).toBeInTheDocument(); // Adjust based on actual heading or text
  });

  it('renders Login Page on /login', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument(); // Update if there's a more specific marker
  });

  it('renders Admin Dashboard on /admin-dashboard3', () => {
    render(
      <MemoryRouter initialEntries={['/admin-dashboard3']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument(); // Update based on content
  });

  it('renders Landing Page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/some/unknown/route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/landing page/i)).toBeInTheDocument();
  });
});
