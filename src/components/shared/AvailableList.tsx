import React from "react";
import RankingBlock from "./RankingBlock";
import type { AvailableListProps } from "../../types/common";

const AvailableList: React.FC<AvailableListProps> = ({
  items,
  handleDragStart,
}) => {
  return (
    <div className="company-list scrollable">
      <h2>Available Companies</h2>

      {items.length === 0 ? (
        <p style={{ color: 'gray', fontStyle: 'italic' }}>No companies available.</p>
      ) : (
        items.map((item) => {
          try {
            return (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item)}
                className="draggable-block"
              >
                <RankingBlock
                  id={item.id}
                  title={item.title}
                  info1={`Location: ${item.title === "Transact" ? "Limerick" : "Dublin"}`}
                  info2={`Salary: €${2500 + item.id * 100}/month`}
                  info3={`No. of Days in Office: ${item.id % 3}`}
                  dropdownContent={<p>{item.title} details</p>}
                />
              </div>
            );
          } catch (error) {
            console.error("Error rendering item:", item, error);
            return (
              <div key={item.id} style={{ color: 'red' }}>
                Error rendering company block.
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export default AvailableList;
