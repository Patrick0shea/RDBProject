// src/Testing/UnitTests/AvailableList.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AvailableList from '../../components/shared/AvailableList';
import '@testing-library/jest-dom';

describe('AvailableList', () => {
  const mockHandleDragStart = vi.fn();
  const mockItems = [
    { id: 1, title: 'Company A', salary: 50000, company_name: 'Company A' },
    { id: 2, title: 'Transact', salary: 60000, company_name: 'Transact' },
  ];

  it('renders the heading and items', () => {
    render(<AvailableList items={mockItems} handleDragStart={mockHandleDragStart} />);

    expect(screen.getByRole('heading', { name: /Available Companies/i })).toBeInTheDocument();
    expect(screen.getByText(/Company A/i)).toBeInTheDocument();
    expect(screen.getByText(/Transact/i)).toBeInTheDocument();
  });

  it('calls handleDragStart when item is dragged', () => {
    render(<AvailableList items={mockItems} handleDragStart={mockHandleDragStart} />);

    const draggableDivs = screen.getAllByText(/Company/i).map(el => el.closest('.draggable-block'));
    expect(draggableDivs.length).toBeGreaterThan(0);

    // Simulate dragStart on first item
    fireEvent.dragStart(draggableDivs[0]!);

    expect(mockHandleDragStart).toHaveBeenCalledTimes(1);
    expect(mockHandleDragStart).toHaveBeenCalledWith(mockItems[0]);
  });

  it('displays a message when no items are available', () => {
    render(<AvailableList items={[]} handleDragStart={mockHandleDragStart} />);

    expect(screen.getByText(/No companies available/i)).toBeInTheDocument();
  });
});
