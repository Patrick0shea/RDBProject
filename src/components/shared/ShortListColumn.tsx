// React and useState hook for local component state for error handling
import React, { useState } from "react";
import RankingBlock from "./RankingBlock";
import type { ShortlistColumnProps } from "../../types/common";

// Functional component to render the Shortlist column
const ShortlistColumn: React.FC<ShortlistColumnProps> = ({
  items,             // Array of shortlisted residency items
  draggedItem,       // The item currently being dragged
  setDraggedItem,    // Function to update dragged item state
  handleSort,        // Function to handle reordering
  handleRemove,      // Function to remove item from shortlist
  handleDrop,        // Handler for dropping an item into the shortlist
  onSubmit,          // Function to submit the final ranking
  allMoved,          // Boolean to determine if all items were moved
}) => {
  // Local state to manage any runtime error messages
  const [error, setError] = useState<string | null>(null);

  // Handles the drag over logic with safety checks and sorting
  const safeDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: number
  ) => {
    try {
      e.preventDefault(); // Necessary to allow dropping
      if (draggedItem && itemId !== draggedItem.id) {
        const dragIndex = items.findIndex((c) => c.id === draggedItem.id);
        const hoverIndex = items.findIndex((c) => c.id === itemId);
        // If both indices are valid, trigger sort
        if (dragIndex !== -1 && hoverIndex !== -1) {
          handleSort(dragIndex, hoverIndex);
        }
      }
    } catch (err) {
      console.error("Error during drag over:", err);
      setError("An error occurred while sorting. Please try again.");
    }
  };

  // Wrapper for setting the dragged item with error handling
  const safeSetDraggedItem = (item: typeof draggedItem) => {
    try {
      setDraggedItem(item);
    } catch (err) {
      console.error("Error starting drag:", err);
      setError("An error occurred while dragging. Please try again.");
    }
  };

  // Wrapper for handling drop logic safely
  const safeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    try {
      handleDrop(e);
    } catch (err) {
      console.error("Error on drop:", err);
      setError("An error occurred while dropping. Please try again.");
    }
  };

  // Wrapper for submission logic with error fallback
  const safeSubmit = () => {
    try {
      onSubmit();
    } catch (err) {
      console.error("Error submitting rankings:", err);
      setError("An error occurred while submitting. Please try again.");
    }
  };

  return (
    <div
      className="shortlist scrollable"                // Styling class for scroll behavior
      onDragOver={(e) => e.preventDefault()}          // Prevent default to allow drops
      onDrop={safeDrop}                               // Handle dropping items into shortlist
    >
      {/* Shortlist heading with custom styles */}
      <h2 style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
        Shortlist
      </h2>

      {/* Show error message, if any */}
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Render each item in the shortlist as a draggable RankingBlock */}
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable                                     // Makes the div is draggable
          onDragStart={() => safeSetDraggedItem(item)}  // Start dragging this item
          onDragOver={(e) => safeDragOver(e, item.id)}  // Handle hover sorting
          className="shortlist-item"
        >
          <RankingBlock
            id={index + 1}                             // Display index as 1-based
            title={item.title}
            // Conditional content based on title for demo purposes
            info1={`Location: ${item.title === "Transact" ? "Limerick" : "Dublin"}`}
            info2={`Salary: €${2500 + item.id * 100}/month`}    // Dynamic salary value
            info3={`No. of Days in Office: ${item.id % 3}`}     // Simulated office day info
            dropdownContent={     // Additional UI when expanded
              <>  {/* Fragment used to group without adding additional nodes to the DOM */}
                <p>{item.title} in shortlist</p>
                <button onClick={() => handleRemove(item.id)} aria-label="Remove">
                  Remove
                </button>
              </>
            }
          />
        </div>
      ))}

      {/* Show submit button only if all items have been moved (e.g. from available list) */}
      {allMoved && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={safeSubmit}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Submit Rankings
          </button>
        </div>
      )}
    </div>
  );
};

// Export the component to be used in larger views like UserHomePage
export default ShortlistColumn;
// This component renders a column for shortlisted items in a drag-and-drop interface.
// It handles drag-and-drop sorting, item removal, and submission of final rankings.