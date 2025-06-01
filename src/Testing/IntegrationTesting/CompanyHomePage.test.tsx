import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyHomePage from '../../components/pages/HomePages/CompanyHomePage';

vi.mock('../../shared/RankingBlock', () => ({
  default: ({ title, dropdownContent }: any) => (
    <div>
      <div>{title}</div>
      {dropdownContent}
    </div>
  ),
}));

describe('CompanyHomePage Integration', () => {
  let alertMock: any;
  let consoleMock: any;

  beforeEach(() => {
    alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    consoleMock = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('renders all initial companies', () => {
    render(<CompanyHomePage />);
    expect(screen.getByText(/Amazon Web Services/)).toBeInTheDocument();
    expect(screen.getByText(/Stripe/)).toBeInTheDocument();
  });

  it('moves a company to shortlist on simulated drag-and-drop', () => {
    render(<CompanyHomePage />);

    // Simulate drag start on Amazon
    const amazon = screen.getByText('Amazon Web Services');
    fireEvent.dragStart(amazon);

    // Simulate drop on shortlist area
    const shortlistArea = screen.getByText('Shortlist');
    fireEvent.dragOver(shortlistArea);
    fireEvent.drop(shortlistArea);

    expect(screen.getAllByText('Amazon Web Services')).toHaveLength(2); // one in each block
  });

  it('removes a company from shortlist', () => {
    render(<CompanyHomePage />);
    const amazon = screen.getByText('Amazon Web Services');

    // Drag Amazon to shortlist
    fireEvent.dragStart(amazon);
    const shortlistArea = screen.getByText('Shortlist');
    fireEvent.dragOver(shortlistArea);
    fireEvent.drop(shortlistArea);

    // Click remove
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument();
  });

  it('submits and shows alert when shortlist is full', () => {
    render(<CompanyHomePage />);

    // Move all companies to shortlist
    const titles = [
      'Amazon Web Services',
      'Shannonside Capital',
      'Intercome',
      'Transact',
      'Stripe',
    ];

    titles.forEach(title => {
      const item = screen.getByText(title);
      fireEvent.dragStart(item);
      const shortlistArea = screen.getByText('Shortlist');
      fireEvent.dragOver(shortlistArea);
      fireEvent.drop(shortlistArea);
    });

    const submitButton = screen.getByText('Submit Rankings');
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Submitted! Check console for result.');
    expect(consoleMock).toHaveBeenCalledWith('Ranking array:', expect.any(Array));
  });
});
