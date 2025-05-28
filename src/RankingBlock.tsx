import React, { useState } from 'react';
import './App.css';

interface RankingBlockProps {
  id: number;
  title: string;
  company_name: string;
  salary: string;
  dropdownContent?: React.ReactNode;
  // Removed: rank and onRankChange
}

const RankingBlock: React.FC<RankingBlockProps> = ({
  id,
  title,
  company_name,
  salary,
  dropdownContent,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="ranking-block">
      <div className="ranking-header">
        <h2 className="ranking-title">{id}. {title}</h2>
      </div>
      <div className="ranking-row">
        <span>{company_name}</span>
        <span>{salary}</span>
      </div>
      <button className="dropdown-button" onClick={() => setShowDropdown(!showDropdown)}>
        {showDropdown ? "Hide Details" : "Show Details"}
      </button>
      {showDropdown && <div className="dropdown-content">{dropdownContent}</div>}
    </div>
  );
};

export default RankingBlock;
