import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import UserHomePage from '../../components/pages/HomePages/UserHomePage';

vi.mock('../../shared/RankingBlock', () => ({
  default: ({ title, info1, info2, dropdownContent }: any) => (
    <div>
      <h3>{title}</h3>
      <p>{info1}</p>
      <p>{info2}</p>
      {dropdownContent}
    </div>
  )
}));

const mockUsers = [
  {
    id: 1,
    title: 'Software Engineer Intern',
    salary: 3000,
    company_name: 'OpenAI',
  },
  {
    id: 2,
    title: 'Data Analyst Intern',
    salary: 2800,
    company_name: 'Google',
  },
];

describe('UserHomePage', () => {
  let fetchSpy: any;
  let alertSpy: any;

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch');
    alertSpy = vi.stubGlobal('alert', vi.fn());

    fetchSpy.mockImplementation((url: string) => {
      if (url.includes('get-residencies')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        });
      }

      if (url.includes('submit-rankings')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ success: true }),
        });
      }

      return Promise.reject(new Error('Unhandled fetch'));
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading then displays fetched residencies', async () => {
    render(<UserHomePage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Software Engineer Intern/i)).toBeInTheDocument();
      expect(screen.getByText(/Data Analyst Intern/i)).toBeInTheDocument();
    });
  });

  it('drags a user into the shortlist', async () => {
    render(<UserHomePage />);
    await waitFor(() => screen.getByText(/Software Engineer Intern/i));

    const draggableItem = screen.getByText(/Software Engineer Intern/i).closest('div')!;
    const dropZone = screen.getByText(/Shortlist/i).closest('div')!;

    fireEvent.dragStart(draggableItem);
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone);

    await waitFor(() => {
      expect(screen.getAllByText(/Software Engineer Intern/i).length).toBeGreaterThan(1);
    });
  });

  it('removes a user from the shortlist', async () => {
    render(<UserHomePage />);
    await waitFor(() => screen.getByText(/Software Engineer Intern/i));

    const dragItem = screen.getByText(/Software Engineer Intern/i).closest('div')!;
    const dropZone = screen.getByText(/Shortlist/i).closest('div')!;

    fireEvent.dragStart(dragItem);
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone);

    await waitFor(() => {
      expect(screen.getAllByText(/Software Engineer Intern/i).length).toBeGreaterThan(1);
    });

    const removeButton = screen.getByText(/Remove/i);
    fireEvent.click(removeButton);

    await waitFor(() => {
      // Should only appear once again in "Available" list
      expect(screen.getAllByText(/Software Engineer Intern/i).length).toBe(1);
    });
  });

  it('submits the shortlist when all residencies are moved', async () => {
    render(<UserHomePage />);
    await waitFor(() => screen.getByText(/Software Engineer Intern/i));

    const dropZone = screen.getByText(/Shortlist/i).closest('div')!;
    const items = mockUsers.map(user =>
      screen.getByText(new RegExp(user.title, 'i')).closest('div')!
    );

    for (const item of items) {
      fireEvent.dragStart(item);
      fireEvent.dragOver(dropZone);
      fireEvent.drop(dropZone);
    }

    await waitFor(() => {
      const submitButton = screen.getByText(/Submit Rankings/i);
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/submit-rankings'),
        expect.objectContaining({ method: 'POST' })
      );
      expect(alertSpy).toHaveBeenCalledWith('Rankings submitted successfully!');
    });
  });

  it('allows drag-sorting within the shortlist', async () => {
    render(<UserHomePage />);
    await waitFor(() => screen.getByText(/Software Engineer Intern/i));

    const dropZone = screen.getByText(/Shortlist/i).closest('div')!;
    const items = mockUsers.map(user =>
      screen.getByText(new RegExp(user.title, 'i')).closest('div')!
    );

    // Add both to shortlist
    for (const item of items) {
      fireEvent.dragStart(item);
      fireEvent.dragOver(dropZone);
      fireEvent.drop(dropZone);
    }

    // Simulate sorting: move second item to first position
    const dragSource = screen.getByText(/Data Analyst Intern/i).closest('div')!;
    const dragTarget = screen.getByText(/Software Engineer Intern/i).closest('div')!;

    fireEvent.dragStart(dragSource);
    fireEvent.dragOver(dragTarget);

    // Check both titles are still rendered
    await waitFor(() => {
      expect(screen.getByText(/Software Engineer Intern/i)).toBeInTheDocument();
      expect(screen.getByText(/Data Analyst Intern/i)).toBeInTheDocument();
    });
  });
});
