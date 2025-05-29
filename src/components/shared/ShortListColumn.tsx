import React from "react";
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
  return (
    <div
      className="shortlist scrollable"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
        Shortlist
      </h2>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => setDraggedItem(item)}
          onDragOver={(e) => {
            e.preventDefault();
            if (draggedItem && item.id !== draggedItem.id) {
              const dragIndex = items.findIndex((c) => c.id === draggedItem.id);
              const hoverIndex = items.findIndex((c) => c.id === item.id);
              handleSort(dragIndex, hoverIndex);
            }
          }}
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
          <button onClick={onSubmit} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Submit Rankings
          </button>
        </div>
      )}
    </div>
  );
};

export default ShortlistColumn;
