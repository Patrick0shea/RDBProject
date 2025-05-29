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

  return (
    <div className="ranking-block">
      <div
        className="ranking-block-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <div>
          <strong>{id}. {title}</strong>
          <div>{info1}</div>
          <div>{info2}</div>
          <div>{info3}</div>
        </div>
        <div style={{ fontSize: '1.2rem' }}>{isOpen ? '▲' : '▼'}</div>
      </div>

      {isOpen && dropdownContent && (
        <div className="ranking-block-dropdown" style={{ marginTop: '0.5rem' }}>
          {dropdownContent}
        </div>
      )}
    </div>
  );
};

export default RankingBlock;
