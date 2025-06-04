import { useState, useEffect } from 'react';
import RankingBlock from '../../shared/RankingBlock';
import '../../../styles/App.css';

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

const CompanyHomePage = () => {
  const [availableCompanies, setAvailableCompanies] = useState<Company[]>([]);
  const [shortlist, setShortlist] = useState<Company[]>([]);
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
      {/* Left Column */}
      <div className="company-list scrollable">
        <h2>Available Students</h2>
        {availableCompanies.map(company => (
          <div
            key={company.id}
            data-testid="company-item"
            draggable
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

      {/* Right Column */}
      <div
        className="shortlist scrollable"
        data-testid="shortlist-drop-zone"
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

export default CompanyHomePage;
