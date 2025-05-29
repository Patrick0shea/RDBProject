// Residency entity used by both Company and User
export interface Residency {
  id: number;
  title: string;
  salary: number;
  company_name: string;
}

// For a shortlist column (generic items with drag/drop)
export interface ShortlistColumnProps {
  items: Residency[];
  draggedItem: Residency | null;
  setDraggedItem: (item: Residency | null) => void;
  handleSort: (dragIndex: number, hoverIndex: number) => void;
  handleRemove: (id: number) => void;
  handleDrop: () => void;
  onSubmit: () => void;
  allMoved: boolean;
}

// For available items list
export interface AvailableListProps {
  items: Residency[];
  handleDragStart: (item: Residency) => void;
}
