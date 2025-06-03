import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ShortListColumn from '../../components/shared/ShortListColumn';
import '@testing-library/jest-dom';

describe('ShortListColumn Component', () => {
  const mockHandleSort = vi.fn();
  const mockHandleRemove = vi.fn();
  const mockHandleDrop = vi.fn();
  const mockSetDraggedItem = vi.fn();
  const mockOnSubmit = vi.fn();

  const sampleItems = [
    { id: 1, title: 'Transact', salary: 100000, company_name: 'Transact Inc.' },
    { id: 2, title: 'Stripe', salary: 120000, company_name: 'Stripe Ltd.' },
  ];

  const defaultProps = {
    items: sampleItems,
    draggedItem: null,
    setDraggedItem: mockSetDraggedItem,
    handleSort: mockHandleSort,
    handleRemove: mockHandleRemove,
    handleDrop: mockHandleDrop,
    onSubmit: mockOnSubmit,
    allMoved: true,
  };

  it('renders the shortlist with all items and the submit button', () => {
    render(<ShortListColumn {...defaultProps} />);
    expect(screen.getByText('Shortlist')).toBeInTheDocument();
    expect(screen.getByText('1. Transact')).toBeInTheDocument();
    expect(screen.getByText('2. Stripe')).toBeInTheDocument();
    expect(screen.getByText('Submit Rankings')).toBeInTheDocument();
  });

  it('calls handleRemove when remove button is clicked', () => {
  // Render the shortlist with empty initial items
  render(
    <ShortListColumn
      {...defaultProps}
      items={[]} // start empty
    />
  );

  // Simulate dropping item into shortlist
  const container = screen.getByText('Shortlist').closest('div');
  fireEvent.drop(container!, {
    dataTransfer: {
      getData: () => JSON.stringify(sampleItems[0]),
    },
  });

  // Manually re-render with the item added (simulate post-drop state)
  render(
    <ShortListColumn
      {...defaultProps}
      items={[sampleItems[0]]} // now item is in shortlist
    />
  );

  // Expand the dropdown
  fireEvent.click(screen.getByText('1. Transact')); // assuming this toggles the dropdown

  // Now the Remove button should be present
  const removeBtn = screen.getByRole('button', { name: /remove/i });
  fireEvent.click(removeBtn);

  expect(mockHandleRemove).toHaveBeenCalledWith(1);
});

  it('calls onSubmit when submit button is clicked', () => {
    render(<ShortListColumn {...defaultProps} />);
    const submitButton = screen.getByText('Submit Rankings');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('handles dragStart and calls setDraggedItem', () => {
    render(<ShortListColumn {...defaultProps} />);
    const draggableItem = screen.getByText('1. Transact').closest('[draggable="true"]');
    fireEvent.dragStart(draggableItem!);
    expect(mockSetDraggedItem).toHaveBeenCalledWith(sampleItems[0]);
  });

  it('handles onDrop safely', () => {
    render(<ShortListColumn {...defaultProps} />);
    const container = screen.getByText('Shortlist').closest('div')!;
    fireEvent.drop(container);
    expect(mockHandleDrop).toHaveBeenCalled();
  });

  it('prevents default on dragOver', () => {
    render(<ShortListColumn {...defaultProps} />);
    const container = screen.getByText('Shortlist').closest('div')!;

    const event = new Event('dragover', { bubbles: true, cancelable: true });
    const preventDefault = vi.fn();
    Object.defineProperty(event, 'preventDefault', {
      value: preventDefault,
      writable: true,
    });

    container.dispatchEvent(event);
    expect(preventDefault).toHaveBeenCalled();
  });
});
