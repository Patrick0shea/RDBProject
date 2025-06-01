import React, { useState } from "react";
import RankingBlock from "./RankingBlock";
import type { ShortlistColumnProps } from "../../types/common";

const ShortlistColumn: React.FC<ShortlistColumnProps> = ({
  items,
  draggedItem,
  setDraggedItem,
  handleSort,
  handleRemove,
  handleDrop,
  onSubmit,
  allMoved,
}) => {
  const [error, setError] = useState<string | null>(null);

  const safeDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: number
  ) => {
    try {
      e.preventDefault();
      if (draggedItem && itemId !== draggedItem.id) {
        const dragIndex = items.findIndex((c) => c.id === draggedItem.id);
        const hoverIndex = items.findIndex((c) => c.id === itemId);
        if (dragIndex !== -1 && hoverIndex !== -1) {
          handleSort(dragIndex, hoverIndex);
        }
      }
    } catch (err) {
      console.error("Error during drag over:", err);
      setError("An error occurred while sorting. Please try again.");
    }
  };

  const safeSetDraggedItem = (item: typeof draggedItem) => {
    try {
      setDraggedItem(item);
    } catch (err) {
      console.error("Error starting drag:", err);
      setError("An error occurred while dragging. Please try again.");
    }
  };

  const safeDrop = (e: React.DragEvent<HTMLDivElement>) => {
    try {
      handleDrop(e);
    } catch (err) {
      console.error("Error on drop:", err);
      setError("An error occurred while dropping. Please try again.");
    }
  };

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
      className="shortlist scrollable"
      onDragOver={(e) => e.preventDefault()}
      onDrop={safeDrop}
    >
      <h2 style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
        Shortlist
      </h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => safeSetDraggedItem(item)}
          onDragOver={(e) => safeDragOver(e, item.id)}
          className="shortlist-item"
        >
          <RankingBlock
            id={index + 1}
            title={item.title}
            info1={`Location: ${item.title === "Transact" ? "Limerick" : "Dublin"}`}
            info2={`Salary: €${2500 + item.id * 100}/month`}
            info3={`No. of Days in Office: ${item.id % 3}`}
            dropdownContent={
              <>
                <p>{item.title} in shortlist</p>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </>
            }
          />
        </div>
      ))}

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

export default ShortlistColumn;
