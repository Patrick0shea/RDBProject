import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar3 from '../../components/shared/Navbar3';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('Navbar3 Component', () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('renders all navigation links', async () => {
    render(<Navbar3 />, { wrapper: BrowserRouter });

    const links = [
      '/landing-page',
      '/user-dashboard',
      '/company-dashboard',
      '/admin-dashboard',
      '/acc-login-page',
      '/admin-login-page'
    ];

    links.forEach((href) => {
      const link = screen.getByRole('link', { name: new RegExp(href.split('/')[1], 'i') });
      expect(link).toHaveAttribute('href', href);
  });

    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    // useNavigate is already mocked at the top of the file, so this line is not needed and can be removed.

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as any;

    render(<Navbar3 />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Logged out successfully');
      expect(navigateMock).toHaveBeenCalledWith('/login');
    });
  });

  it('shows error alert if logout fails with message', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid token' }),
      })
    ) as any;

    render(<Navbar3 />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Logout failed: Invalid token');
    });
  });

  it('shows fallback alert if logout fails without JSON', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.reject('Invalid JSON'),
      })
    ) as any;

    render(<Navbar3 />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Logout failed: Unexpected error occurred');
    });
  });

  it('handles network error during logout', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    global.fetch = vi.fn(() => Promise.reject(new Error('Network error'))) as any;
    render(<Navbar3 />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        'An error occurred while logging out. Please check your connection and try again.'
      );
    });
  });
});

