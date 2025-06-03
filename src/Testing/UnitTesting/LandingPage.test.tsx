// src/pages/__tests__/LandingPageTest.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../../components/pages/LandingPage';
import '@testing-library/jest-dom';

const mockNavigate = vi.fn(); // ✅ Must be defined at top level

// ✅ Mock useNavigate BEFORE importing components that use it
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// ✅ Optional: mock Button if needed
vi.mock('../../shared/Button', () => ({
  Button: ({ label, onClick, className }: any) => (
    <button onClick={onClick} className={className}>{label}</button>
  )
}));

describe('LandingPageTest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('localStorage', {
      setItem: vi.fn(),
    } as any);
  });

  it('renders all buttons', () => {
    render(<LandingPage />, { wrapper: MemoryRouter });

    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('clicking Student sets localStorage and navigates', () => {
    render(<LandingPage />, { wrapper: MemoryRouter });

    screen.getByText('Student').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('userType', '0');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('clicking Company sets localStorage and navigates', () => {
    render(<LandingPage />, { wrapper: MemoryRouter });

    screen.getByText('Company').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('userType', '1');
    expect(mockNavigate).toHaveBeenCalledWith('/company-login');
  });

  it('clicking Admin sets localStorage and navigates', () => {
    render(<LandingPage />, { wrapper: MemoryRouter });

    screen.getByText('Admin').click();

    expect(localStorage.setItem).toHaveBeenCalledWith('userType', '2');
    expect(mockNavigate).toHaveBeenCalledWith('/admin-login-page');
  });
});
