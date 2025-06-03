import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import UserHomePage from '../../components/pages/HomePages/UserHomePage';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

vi.stubGlobal('fetch', vi.fn());

const mockUsers = [
  {
    id: 1,
    description: 'Frontend Developer',
    salary: 2500,
    company_name: 'Transact',
  },
  {
    id: 2,
    description: 'Backend Developer',
    salary: 2700,
    company_name: 'Stripe',
  },
];

describe('UserHomePage', () => {
  beforeEach(() => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });
  });

  it('renders users after fetch', async () => {
    render(<UserHomePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText('Available Residencies')).toBeInTheDocument()
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
    expect(screen.getByText('Shortlist')).toBeInTheDocument();
  });

  it('adds user to shortlist by simulating drag logic manually', async () => {
    render(<UserHomePage />);

    await waitFor(() =>
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    );

    // Simulate drag logic by clicking on the actual user card
    const frontendCard = screen.getByText('Frontend Developer');
    fireEvent.click(frontendCard); // Simulate selecting it for drag

    const dropZone = screen.getByText('Shortlist').closest('.shortlist');
    fireEvent.drop(dropZone!); // Simulate dropping into shortlist

    await waitFor(() => {
      const shortlist = screen.getByText('Shortlist').closest('.shortlist')!;
      expect(within(shortlist).getByText('Frontend Developer')).toBeInTheDocument();
    });
  });

  it('submits shortlist with mocked alert', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserHomePage />);

    await waitFor(() =>
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    );

    const frontendCard = screen.getByText('Frontend Developer');
    const backendCard = screen.getByText('Backend Developer');
    const dropZone = screen.getByText('Shortlist').closest('.shortlist');

    fireEvent.click(frontendCard);
    fireEvent.drop(dropZone!);

    fireEvent.click(backendCard);
    fireEvent.drop(dropZone!);

    const submitButton = await screen.findByText('Submit Rankings');
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith('Rankings submitted successfully!')
    );

    alertMock.mockRestore();
  });
});
