import { useState, useEffect } from 'react';
import RankingBlock from '../../shared/RankingBlock';

// Importing global styles
import '../../../styles/App.css';

// TypeScript interface defining the structure of a Company object
interface Company {
  id: number;
  residencyId: number;
  title: string;
  salary: number;
  firstName: string;
  lastName: string;
  email: string;
  qca: string;
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
  const [availableCompanies, setAvailableCompanies] = useState<Company[]>([]);
  const [shortlist, setShortlist] = useState<Company[]>([]);

  // State to keep track of the company currently being dragged
  const [dragged, setDragged] = useState<Company | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/get-offers', {
          credentials: 'include',
        })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        console.log('Raw fetched data:', data);
        // Set the availableCompanies to the offers array
        if (Array.isArray(data.offers)) {
          // Map or pick the properties you want from each offer
          const companies = data.offers.map((offer: any) => ({
            id: offer.residency?.id,
            residencyId: offer.residency?.id, // <-- new field for stricter check
            title: offer.residency?.description || `Residency #${offer.residency?.id}`,
            salary: offer.residency?.salary || 0,
            firstName: offer.student?.first_name || '',
            lastName: offer.student?.last_name || '',
            email: offer.student?.email || '',
            qca: offer.student?.qca || ''
          }));
          setAvailableCompanies(companies);
        } else {
          console.error('Expected offers to be an array:', data.offers);
          setAvailableCompanies([]);
        }
      })
      .catch(error => {
        console.error('Failed to fetch offers:', error);
        setAvailableCompanies([]);
      });
  }, []);

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

  const isDuplicateResidency = shortlist.some(
  (c) => c.residencyId === dragged.residencyId
);


  if (!isDuplicateResidency) {
    setShortlist((prev) => [...prev, dragged]);
    setAvailableCompanies((prev) => prev.filter((c) => c.id !== dragged.id));
  } else {
    alert("Only one student per residency can be shortlisted.");
  }

  setDragged(null);
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
    const payload = shortlist.map((company, index) => ({
      residency_id: company.residencyId,
      student_id: company.id,
      rank: index + 1,
    }));

    fetch('http://localhost:8000/accept-student-offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ assignments: payload }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Assignment response:', data);
        alert('Assignments submitted successfully!');
      })
      .catch(error => {
        console.error('Submission error:', error);
        alert('Failed to submit assignments.');
      });
  };

  return (
    <div className="dashboard-container">
      {/* LEFT COLUMN: List of available companies to drag */}
      <div className="company-list scrollable">
        <h2>Available Students</h2>
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
              title={`${company.firstName} ${company.lastName}`}
              info1={`Email: ${company.email}`}
              info2={`QCA: ${company.qca}`}
              info3={`Salary: €${company.salary}/month`}
              dropdownContent={<p>Student ID: ${company.id}</p>}
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
  title={`${company.firstName} ${company.lastName}`}
  info1={`Email: ${company.email}`}
  info2={`QCA: ${company.qca}`}
  info3={`Salary: €${company.salary}/month`}
  dropdownContent={
    <>
      <p>{company.title} in shortlist</p>
      <button onClick={() => handleRemove(company.id)} data-testid="remove-button">
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