import React, { useState } from 'react';
import './App.css';

interface RankingBlockProps {
  id: number;
  title: string;
  info1: string;
  info2: string;
  info3: string;
  dropdownContent?: React.ReactNode;
  rank?: number;
  onRankChange: (id: number, newRank: number | '') => void;
}

const RankingBlock: React.FC<RankingBlockProps> = ({
  id,
  title,
  info1,
  info2,
  info3,
  dropdownContent,
  rank,
  onRankChange,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="ranking-block">
      <div className="ranking-header">
        <label>
          Rank:
          <input
            type="number"
            min="1"
            className="rank-input"
            value={rank || ''}
            onChange={(e) => onRankChange(id, parseInt(e.target.value) || '')}
          />
        </label>
        <h2 className="ranking-title">{id}. {title}</h2>
      </div>
      <div className="ranking-row">
        <span>{info1}</span>
        <span>{info2}</span>
        <span>{info3}</span>
      </div>
      <button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
        {showDropdown ? "Hide Details" : "Show Details"}
      </button>
      {showDropdown && <div className="dropdown-content">{dropdownContent}</div>}
    </div>
  );
};

export default RankingBlock;
