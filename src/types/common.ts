// This file defines TypeScript interfaces used to describe data structures for residencies,
// and their usage in UI components involving drag-and-drop shortlist functionality.

/**
 * Interface: Residency
 * 
 * Represents a single residency opportunity or item, 
 * whether used in a company-facing or user-facing context.
 * 
 * This is used by both Companies and Users.
 */
export interface Residency {
  id: number;             // Unique identifier for the residency
  title: string;          // A short label or name for the residency
  salary: number;         // Monthly or annual salary in numeric form
  company_name: string;   // Name of the company offering the residency
}

/**
 * Interface: WithError
 *
 * A utility - reusable - interface used to append optional error info
 * to UI-related props such as lists or columns.
 * 
 * The ? syntax indicates that the `error` property is optional:
 * - It can be omitted altogether
 * - Or set to a string
 * - Or explicitly set to null
 */
export interface WithError {
  error?: string | null;  // Optional error message to display in UI
}

/**
 * Interface: ShortlistColumnProps
 * 
 * This interface describes the expected props for a shortlist column component,
 * which supports drag and drop functionality and sorting.
 * 
 * It extends WithError, meaning it includes everything from WithError plus the fields below
 * 
 * The generic Residency[] list of items can represent either a company’s or user’s shortlist
 */
export interface ShortlistColumnProps extends WithError {
  items: Residency[];  // The currently shortlisted items

  // The item currently being dragged — null if none is being dragged
  draggedItem: Residency | null;

  // Function to update the currently dragged item
  setDraggedItem: (item: Residency | null) => void;

  // Function to reorder the list by dragging one item onto another
  // dragIndex is the item's original index, hoverIndex is where it's dropped
  handleSort: (dragIndex: number, hoverIndex: number) => void;

  // Function to remove an item from the shortlist by ID
  handleRemove: (id: number) => void;

  // Function called when an item is dropped onto the shortlist
  handleDrop: () => void;

  // Function called when the user finalizes and submits the shortlist
  onSubmit: () => void;

  // Boolean flag indicating whether all items have been moved from the available list
  allMoved: boolean;
}

/**
 * Interface: AvailableListProps
 *
 * This interface is used for the available unselected residencies list.
 * 
 * It also extends WithError, allowing the UI to show an error state if necessary.
 * 
 * This would typically be used to render the left-hand column in a drag and drop UI.
 */
export interface AvailableListProps extends WithError {
  items: Residency[];  // List of residencies not yet shortlisted

  // Called when a user starts dragging an item from the available list
  handleDragStart: (item: Residency) => void;
}
