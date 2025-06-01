import { useState } from 'react';
import RankingBlock from '../../shared/RankingBlock';
import '../../../styles/App.css';

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
    try {
      setDragged(company);
    } catch (error) {
      console.error("Failed to start drag:", error);
    }
  };

  const handleDrop = () => {
    try {
      if (!dragged) return;
      if (!shortlist.find(c => c.id === dragged.id)) {
        setShortlist(prev => [...prev, dragged]);
        setAvailableCompanies(prev => prev.filter(c => c.id !== dragged.id));
      }
    } catch (error) {
      console.error("Error during drop:", error);
    } finally {
      setDragged(null);
    }
  };

  const handleRemove = (id: number) => {
    try {
      const removed = shortlist.find(c => c.id === id);
      if (removed) {
        setShortlist(prev => prev.filter(c => c.id !== id));
        setAvailableCompanies(prev => [...prev, removed]);
      }
    } catch (error) {
      console.error(`Error removing company with id ${id}:`, error);
    }
  };

  const handleSort = (dragIndex: number, hoverIndex: number) => {
    try {
      const updated = [...shortlist];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, moved);
      setShortlist(updated);
    } catch (error) {
      console.error("Error during sorting:", error);
    }
  };

  const handleSubmit = () => {
    try {
      const rankingArray = shortlist.map((company, index) => [company.title, index + 1]);
      console.log("Ranking array:", rankingArray);
      alert("Submitted! Check console for result.");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed. Please try again.");
    }
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
            onDragStart={() => {
              try {
                setDragged(company);
              } catch (error) {
                console.error("Error during shortlist dragStart:", error);
              }
            }}
            onDragOver={(e) => {
              try {
                e.preventDefault();
                if (dragged && company.id !== dragged.id) {
                  const dragIndex = shortlist.findIndex(c => c.id === dragged.id);
                  const hoverIndex = shortlist.findIndex(c => c.id === company.id);
                  if (dragIndex !== -1 && hoverIndex !== -1) {
                    handleSort(dragIndex, hoverIndex);
                  }
                }
              } catch (error) {
                console.error("Error during dragOver in shortlist:", error);
              }
            }}
            className="shortlist-item"
          >
            <RankingBlock
              id={index + 1}
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
            />
          </div>
        ))}
        {availableCompanies.length === 0 && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px' }}>
              Submit Rankings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyHomePage;
