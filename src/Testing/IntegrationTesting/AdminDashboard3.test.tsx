// AdminDashboard.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard3 from '../../components/pages/dashboards/AdminDashboard3';

describe('AdminDashboard', () => {
  beforeEach(() => {
    render(<AdminDashboard3 />);
  });

  it('renders student cards with names and IDs', () => {
    expect(screen.getByText(/Sam McLoughlin/i)).toBeInTheDocument();
    expect(screen.getByText(/Patrick O Shea/i)).toBeInTheDocument();
  });

  it('renders company cards with names and IDs', () => {
    expect(screen.getByText(/Amazon/i)).toBeInTheDocument();
    expect(screen.getByText(/Zerve/i)).toBeInTheDocument();
  });

  it('renders feedback entries', () => {
    expect(screen.getByText(/Bence/i)).toBeInTheDocument();
    expect(screen.getByText(/My student number doesnt work/i)).toBeInTheDocument();
  });

  it('filters students by name', async () => {
    const input = screen.getByPlaceholderText(/Search students/i);
    fireEvent.change(input, { target: { value: 'Sam' } });

    await waitFor(() => {
      expect(screen.getByText(/Sam McLoughlin/i)).toBeInTheDocument();
      expect(screen.queryByText(/Patrick O Shea/i)).not.toBeInTheDocument();
    });
  });

  it('filters companies by name', async () => {
    const input = screen.getByPlaceholderText(/Search companies/i);
    fireEvent.change(input, { target: { value: 'Amazon' } });

    await waitFor(() => {
      expect(screen.getByText(/Amazon/i)).toBeInTheDocument();
      expect(screen.queryByText(/Zerve/i)).not.toBeInTheDocument();
    });
  });

  it('filters feedback by message', async () => {
    const input = screen.getByPlaceholderText(/Search feedback/i);
    fireEvent.change(input, { target: { value: 'dashboard' } });

    await waitFor(() => {
      expect(screen.getByText(/Bence/i)).toBeInTheDocument();
      expect(screen.queryByText(/Aaron/i)).not.toBeInTheDocument();
    });
  });

  it('shows no students found when search yields nothing', async () => {
    const input = screen.getByPlaceholderText(/Search students/i);
    fireEvent.change(input, { target: { value: 'xyz123' } });

    await waitFor(() => {
      expect(screen.getByText(/No students found/i)).toBeInTheDocument();
    });
  });

  it('toggles student detail visibility on click', async () => {
    const studentCard = screen.getByText(/Sam McLoughlin/i).closest('div');
    expect(studentCard).toBeInTheDocument();

    fireEvent.click(studentCard!);
    await waitFor(() => {
      expect(screen.getByText(/QCA: 3.88/)).toBeInTheDocument();
    });

    fireEvent.click(studentCard!);
    await waitFor(() => {
      expect(screen.queryByText(/QCA: 3.88/)).not.toBeInTheDocument();
    });
  });

  it('toggles company detail visibility on click', async () => {
    const companyCard = screen.getByText(/Amazon/i).closest('div');
    expect(companyCard).toBeInTheDocument();

    fireEvent.click(companyCard!);
    await waitFor(() => {
      expect(screen.getByText(/Capacity: 6/)).toBeInTheDocument();
    });

    fireEvent.click(companyCard!);
    await waitFor(() => {
      expect(screen.queryByText(/Capacity: 6/)).not.toBeInTheDocument();
    });
  });
});
