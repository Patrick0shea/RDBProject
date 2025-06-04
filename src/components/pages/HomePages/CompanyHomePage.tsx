// React hook for managing component state
import { useState } from 'react';

// Shared UI component used to display a company's information in a styled block
import RankingBlock from '../../shared/RankingBlock';

// Importing global styles
import '../../../styles/App.css';

// TypeScript interface defining the structure of a Company object
interface Company {
  id: number;
  title: string;
}

/**
 * The CompanyHomePage component serves as the main dashboard UI
 * for managing company preferences. Users can:
 * - Drag companies from a list of "available companies"
 * - Drop them into a "shortlist"
 * - Reorder shortlisted items via drag-and-drop
 * - Remove items back to the available list
 * - Submit final rankings
 */
const CompanyHomePage = () => {
  // Initial list of companies shown to the user
  const initialCompanies: Company[] = [
    { id: 1, title: "Amazon Web Services" },
    { id: 2, title: "Shannonside Capital" },
    { id: 3, title: "Intercome" },
    { id: 4, title: "Transact" },
    { id: 5, title: "Stripe" },
  ];

  // State for companies that haven't been shortlisted yet
  const [availableCompanies, setAvailableCompanies] = useState<Company[]>(initialCompanies);

  // State for companies that have been shortlisted by the user
  const [shortlist, setShortlist] = useState<Company[]>([]);

  // State to keep track of the company currently being dragged
  const [dragged, setDragged] = useState<Company | null>(null);

  /**
   * Called when dragging begins on a company block.
   * Stores the company being dragged into state.
   */
  const handleDragStart = (company: Company) => {
    setDragged(company);
  };

  /**
   * Called when an item is dropped onto the shortlist drop zone.
   * Adds the dragged company to the shortlist (if not already present),
   * and removes it from the available companies list.
   */
  const handleDrop = () => {
    if (!dragged) return;

    // Avoid duplicates in the shortlist
    if (!shortlist.find(c => c.id === dragged.id)) {
      setShortlist(prev => [...prev, dragged]); // Add to shortlist
      setAvailableCompanies(prev => prev.filter(c => c.id !== dragged.id)); // Remove from available
    }

    setDragged(null); // Reset dragged state
  };

  /**
   * Removes a company from the shortlist and puts it back into the available companies list.
   */
  const handleRemove = (id: number) => {
    const removed = shortlist.find(c => c.id === id);
    if (removed) {
      setShortlist(prev => prev.filter(c => c.id !== id)); // Remove from shortlist
      setAvailableCompanies(prev => [...prev, removed]); // Add back to available list
    }
  };

  /**
   * Handles the reordering of items in the shortlist.
   * This is triggered during drag-over events within the shortlist.
   */
  const handleSort = (dragIndex: number, hoverIndex: number) => {
    const updated = [...shortlist];
    const [moved] = updated.splice(dragIndex, 1); // Remove dragged item
    updated.splice(hoverIndex, 0, moved); // Insert it at the new position
    setShortlist(updated); // Update state
  };

  /**
   * Submits the current shortlist rankings.
   * Converts the shortlist into an array of tuples with [title, rank],
   * logs it to the console, and shows a confirmation alert.
   */
  const handleSubmit = () => {
    const rankingArray = shortlist.map((company, index) => [company.title, index + 1]);
    console.log("Ranking array:", rankingArray);
    alert("Submitted! Check console for result.");
  };

  return (
    <div className="dashboard-container">
      {/* LEFT COLUMN: List of available companies to drag */}
      <div className="company-list scrollable">
        <h2>Available Companies</h2>
        {availableCompanies.map(company => (
          <div
            key={company.id}
            data-testid="company-item"
            draggable // Native HTML5 drag-and-drop attribute
            onDragStart={() => handleDragStart(company)}
            className="draggable-block"
          >
            <RankingBlock
              id={company.id}
              title={company.title}
              info1={`Location: ${company.title === 'Transact' ? 'Limerick' : 'Dublin'}`} // Example of dynamic location assignment
              info2={`Salary: €${2500 + company.id * 100}/month`} // Simulated salary calculation
              info3={`No. of Days in Office: ${company.id % 3}`} // Simulated working day calculation
              dropdownContent={<p>{company.title} details</p>} // Content shown in expandable dropdown
            />
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN: Shortlist area and drop zone */}
      <div
        className="shortlist scrollable"
        data-testid="shortlist-drop-zone"
        onDragOver={(e) => e.preventDefault()} // Required to allow dropping
        onDrop={handleDrop}
      >
        <h2 style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
          Shortlist
        </h2>

        {/* Mapping through shortlisted companies */}
        {shortlist.map((company, index) => (
          <div
            key={company.id}
            draggable
            onDragStart={() => setDragged(company)}
            onDragOver={(e) => {
              e.preventDefault();

              // Reordering logic if another company is dragged over this one
              if (dragged && company.id !== dragged.id) {
                const dragIndex = shortlist.findIndex(c => c.id === dragged.id);
                const hoverIndex = shortlist.findIndex(c => c.id === company.id);

                if (dragIndex !== -1 && hoverIndex !== -1) {
                  handleSort(dragIndex, hoverIndex);
                }
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
                  <button
                    onClick={() => handleRemove(company.id)}
                    data-testid="remove-button"
                  >
                    Remove
                  </button>
                </>
              }
            />
          </div>
        ))}

        {/* Submit button appears only when all companies have been moved to shortlist */}
        {availableCompanies.length === 0 && (
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleSubmit}
              style={{ padding: '10px 20px', fontSize: '16px' }}
              aria-label="Submit Rankings"
            >
              Submit Rankings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporting the component so it can be used in routing or other parent components
export default CompanyHomePage;
// This file defines the CompanyHomePage component, which is the main dashboard for managing company preferences.
// It allows users to drag and drop companies between available and shortlisted lists, reorder shortlisted items, and submit their rankings.