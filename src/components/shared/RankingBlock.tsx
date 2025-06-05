// Import React and useState hook for managing component state
import React, { useState } from 'react';
import "../../styles/App.css";

// Define prop types for the RankingBlock component
interface RankingBlockProps {
  id: number;                         // Unique identifier for the block (used for numbering & testing)
  title: string;                      // Main title of the block (typically the residency/job name)
  info1?: string;                     // Optional first line of additional info (e.g., company or location)
  info2?: string;                     // Optional second line of info (e.g., salary)
  info3?: string;                     // Optional third line of info (e.g., office type or other detail)
  dropdownContent?: React.ReactNode; // Optional React element(s) shown when the block is expanded
}

// Functional component definition using destructured props
const RankingBlock: React.FC<RankingBlockProps> = ({
  id,
  title,
  info1,
  info2,
  info3,
  dropdownContent,
}) => {
  // Local state to track whether the dropdown content is visible
  const [isOpen, setIsOpen] = useState(false);

  // Error state in case something goes wrong during toggle logic
  const [hasError, setHasError] = useState(false);

  // Toggle the dropdown section used when the header is clicked
  const toggleDropdown = () => {
    try {
      // Flip the current open/closed state
      setIsOpen(!isOpen);
    } catch (error) {
      // Catch any errors during state update and show fallback message
      console.error('Error toggling dropdown:', error);
      setHasError(true);
    }
  };

  return (
    <div className="ranking-block">
      {/* If an error occurred, show a user-friendly error message */}
      {hasError ? (
        <div style={{ color: 'red' }}>
          Something went wrong. Please try again later.
        </div>
      ) : (
        <div>
          {/* Block header: clickable area that toggles dropdown */}
          <div
            className="ranking-block-header"
            onClick={toggleDropdown}
            data-testid={`toggle-${id}-${title.replace(/\s+/g, '-')}`} // Test ID for automated tests
            style={{
              display: 'flex',               // Arrange title and toggle arrow horizontally
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',             // Indicates it's clickable
            }}
          >
            {/* Title and optional info lines */}
            <div>
              <strong>{id}. {title || 'Untitled'}</strong>      {/* Show index and title or fallback */}
              <div>{info1 || 'No location info'}</div>          {/* Optional line 1 or fallback */}
              <div>{info2 || 'No salary info'}</div>            {/* Optional line 2 or fallback */}
              <div>{info3}</div>            {/* Optional line 3 or fallback */}
            </div>

            {/* Dropdown arrow icon: ▲ if open, ▼ if closed */}
            <div style={{ fontSize: '1.2rem' }}>
              {isOpen ? '▲' : '▼'}
            </div>
          </div>

          {/* Conditionally render dropdown content if block is open and content is provided */}
          {isOpen && dropdownContent && (
            <div
              className="ranking-block-dropdown"
              style={{ marginTop: '0.5rem' }}
            >
              {dropdownContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Export the component so it can be reused elsewhere
export default RankingBlock;
// This component is a reusable block that displays ranking information with expandable details.
// It includes error handling for toggling the dropdown and rendering content.