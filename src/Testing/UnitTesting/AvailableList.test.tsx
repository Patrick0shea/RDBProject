import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AvailableList from '../../components/shared/AvailableList';
import type { Residency } from '../../types/common';

const mockResidencies: Residency[] = [
  { id: 1, title: 'Transact', salary: 2500, company_name: 'Transact Inc' },
  { id: 2, title: 'Innovate', salary: 2600, company_name: 'Innovate LLC' },
];

describe('AvailableList component', () => {
  it('renders fallback when no companies are available', () => {
    render(<AvailableList items={[]} handleDragStart={vi.fn()} />);
    expect(screen.getByText(/No companies available/i)).toBeInTheDocument();
  });

  it('renders all companies passed as props', () => {
    render(<AvailableList items={mockResidencies} handleDragStart={vi.fn()} />);
    
    // Heading
    expect(screen.getByText(/Available Companies/i)).toBeInTheDocument();
    
    // Company blocks
    expect(screen.getByText(/Transact details/i)).toBeInTheDocument();
    expect(screen.getByText(/Innovate details/i)).toBeInTheDocument();
  });

  it('triggers handleDragStart when an item is dragged', () => {
    const handleDragStart = vi.fn();

    render(<AvailableList items={mockResidencies} handleDragStart={handleDragStart} />);

    const draggableItems = screen.getAllByRole('generic', { hidden: true }); // fallback for divs

    fireEvent.dragStart(draggableItems[0]);
    expect(handleDragStart).toHaveBeenCalledWith(mockResidencies[0]);

    fireEvent.dragStart(draggableItems[1]);
    expect(handleDragStart).toHaveBeenCalledWith(mockResidencies[1]);
  });

  it('shows an error message when rendering an item throws', () => {
    const faultyItem: Residency = {
      id: 999,
      title: 'Broken',
      salary: 0,
      company_name: 'Oops Inc',
    };

    // Override console.error temporarily
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const BrokenComponent = () => {
      const brokenProps = [{ ...faultyItem }];
      return (
        <AvailableList
          items={brokenProps}
          handleDragStart={() => {
            throw new Error('Crash');
          }}
        />
      );
    };

    expect(() => render(<BrokenComponent />)).not.toThrow();
    expect(screen.getByText(/Error rendering company block/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
