import React, { useState } from 'react';
import "../../styles/App.css";

interface RankingBlockProps {
  id: number;
  title: string;
  info1?: string;
  info2?: string;
  info3?: string;
  dropdownContent?: React.ReactNode;
}

const RankingBlock: React.FC<RankingBlockProps> = ({
  id,
  title,
  info1,
  info2,
  info3,
  dropdownContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const toggleDropdown = () => {
    try {
      setIsOpen(!isOpen);
    } catch (error) {
      console.error('Error toggling dropdown:', error);
      setHasError(true);
    }
  };

  return (
    <div className="ranking-block">
      {hasError ? (
        <div style={{ color: 'red' }}>Something went wrong. Please try again later.</div>
      ) : (
        <div>
          <div
            className="ranking-block-header"
            onClick={toggleDropdown}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div>
              <strong>{id}. {title || 'Untitled'}</strong>
              <div>{info1 || 'No location info'}</div>
              <div>{info2 || 'No salary info'}</div>
              <div>{info3 || 'No office info'}</div>
            </div>
            <div style={{ fontSize: '1.2rem' }}>{isOpen ? '▲' : '▼'}</div>
          </div>

          {isOpen && dropdownContent && (
            <div className="ranking-block-dropdown" style={{ marginTop: '0.5rem' }}>
              {dropdownContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RankingBlock;
