// CompanyHomePage.tsx
import { useState } from 'react';
import RankingBlock from './RankingBlock';
import './App.css';

interface Company {
  id: number;
  title: string;
}

const CompanyHomePage = () => {
  const initialCompanies: Company[] = [
    { id: 1, title: "Amazon Web Services" },
    { id: 2, title: "Shannonside Capital" },
    { id: 3, title: "Intercome" },
    { id: 4, title: "Transact" },
    { id: 5, title: "Stripe" },
  ];

  const [availableCompanies, setAvailableCompanies] = useState<Company[]>(initialCompanies);
  const [shortlist, setShortlist] = useState<Company[]>([]);
  const [dragged, setDragged] = useState<Company | null>(null);

  const handleDragStart = (company: Company) => {
    setDragged(company);
  };

  const handleDrop = () => {
    if (dragged && !shortlist.find(c => c.id === dragged.id)) {
      setShortlist(prev => [...prev, dragged]);
      setAvailableCompanies(prev => prev.filter(c => c.id !== dragged.id));
    }
    setDragged(null);
  };

  const handleRemove = (id: number) => {
    const removed = shortlist.find(c => c.id === id);
    if (removed) {
      setShortlist(prev => prev.filter(c => c.id !== id));
      setAvailableCompanies(prev => [...prev, removed]);
    }
  };

  const handleSort = (dragIndex: number, hoverIndex: number) => {
    const updated = [...shortlist];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, moved);
    setShortlist(updated);
  };

  return (
    <div className="dashboard-container">
      {/* Left Column */}
      <div className="company-list scrollable">
        <h2>Available Companies</h2>
        {availableCompanies.map(company => (
          <div
            key={company.id}
            draggable
            onDragStart={() => handleDragStart(company)}
            className="draggable-block"
          >
            <RankingBlock
              id={company.id}
              title={company.title}
              info1={`Location: ${company.title === 'Transact' ? 'Limerick' : 'Dublin'}`}
              info2={`Salary: €${2500 + company.id * 100}/month`}
              info3={`No. of Days in Office: ${company.id % 3}`}
              dropdownContent={<p>{company.title} details</p>}
              rank={undefined}
              onRankChange={() => {}}
            />
          </div>
        ))}
      </div>

      {/* Right Column */}
      <div
        className="shortlist scrollable"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <h2 style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
          Shortlist
        </h2>
        {shortlist.map((company, index) => (
          <div
            key={company.id}
            draggable
            onDragStart={() => setDragged(company)}
            onDragOver={(e) => {
              e.preventDefault();
              if (dragged && company.id !== dragged.id) {
                const dragIndex = shortlist.findIndex(c => c.id === dragged.id);
                const hoverIndex = shortlist.findIndex(c => c.id === company.id);
                handleSort(dragIndex, hoverIndex);
              }
            }}
            className="shortlist-item"
          >
            <RankingBlock
              id={index + 1} // Position-based ID
              title={company.title}
              info1={`Location: ${company.title === 'Transact' ? 'Limerick' : 'Dublin'}`}
              info2={`Salary: €${2500 + company.id * 100}/month`}
              info3={`No. of Days in Office: ${company.id % 3}`}
              dropdownContent={
                <>
                  <p>{company.title} in shortlist</p>
                  <button onClick={() => handleRemove(company.id)}>Remove</button>
                </>
              }
              rank={undefined}
              onRankChange={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyHomePage;
