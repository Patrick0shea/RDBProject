// React hooks and shared component import
import { useState, useEffect } from 'react';
import RankingBlock from '../../shared/RankingBlock';
import type { User } from '../../../types/user';
import '../../../styles/App.css';

// Main component for the user homepage
const UserHomePage = () => {
  // State to store residencies that can be ranked
  const [availableStudents, setAvailableStudents] = useState<User[]>([]);

  // State to store the user's current shortlist of ranked residencies
  const [shortlist, setShortlist] = useState<User[]>([]);

  // State to track the currently dragged residency for drag-and-drop
  const [dragged, setDragged] = useState<User | null>(null);

  // Indicates whether the data is still loading
  const [loading, setLoading] = useState(true);
  const [assignmentData, setAssignmentData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/check-my-offers', {
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        setAssignmentData(data);
      })
      .catch(error => {
      });
  }, []);

  // Fetches residencies from the backend once the component mounts
  useEffect(() => {
    const fetchResidencies = async () => {
      try {
        // Request to backend to get residencies with credentials
        const response = await fetch('http://localhost:8000/get-residencies', {
          credentials: 'include',
        });

        // Check for HTTP errors
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // Parse JSON response as response data is in a raw string format
        const data = await response.json();

        // Format the response data into User objects
        const users = data.map((item: any) => ({
          id: item.id,
          title: item.description,
          salary: item.salary,
          company_name: item.company_name,
        }));

        // Update state with fetched residencies
        setAvailableStudents(users);
      } catch (error) {
        // Log and alert on fetch error
        console.error('Failed to fetch residencies:', error);
        alert('Error loading residencies.');
      } finally {
        // Set loading to false regardless of success/failure
        // Waits until data is fetched or error occurs
        setLoading(false);
      }
    };

    fetchResidencies(); // Call the async function
  }, []); // Ensures that it runs only once on mount

  // Triggered when a residency is picked up in drag-and-drop
  const handleDragStart = (user: User) => {
    try {
      setDragged(user); // Track the dragged item
    } catch (error) {
      console.error('Drag start error:', error);
    }
  };

  // Handles dropping a residency into the shortlist
  const handleDrop = () => {
    try {
      if (!dragged) return;

      // Only add to shortlist if not already included
      if (!shortlist.some(s => s.id === dragged.id)) {
        // Add dragged user to shortlist
        setShortlist(prev => [...prev, dragged]);

        // Remove the dragged user from the available list
        setAvailableStudents(prev => prev.filter(s => s.id !== dragged.id));
      }
    } catch (error) {
      console.error('Drop error:', error);
    } finally {
      // Clear the dragged state
      setDragged(null);
    }
  };

  // Removes a user from the shortlist and returns them to available residencies
  const handleRemove = (id: number) => {
    try {
      // Find the user to remove
      const removed = shortlist.find(s => s.id === id);
      if (removed) {
        // Remove from shortlist
        setShortlist(prev => prev.filter(s => s.id !== id));

        // Add back to available list
        setAvailableStudents(prev => [...prev, removed]);
      }
    } catch (error) {
      console.error(`Remove error for id ${id}:`, error);
    }
  };

  // Reorders the shortlist based on drag position
  const handleSort = (dragIndex: number, hoverIndex: number) => {
    try {
      if (dragIndex < 0 || hoverIndex < 0) return;

      const updated = [...shortlist]; // Shallow copy of the shortlist. "..." = Spread operator

      // Remove item from its current position
      const [moved] = updated.splice(dragIndex, 1);

      // Insert item in new position
      updated.splice(hoverIndex, 0, moved);

      // Update shortlist
      setShortlist(updated);
    } catch (error) {
      console.error('Sort error:', error);
    }
  };

  // Submits the current shortlist to the backend as a ranking
  const handleSubmit = async () => {
    try {
      // Construct the ranking payload with position info
      const rankingPayload = shortlist.map((user, index) => ({
        residency_id: user.id,
        position: index + 1, // Rankings are 1-indexed
      }));

      // POST the rankings to the backend
      const response = await fetch('http://localhost:8000/submit-rankings', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rankingPayload),
      });

      // Throw error if response failed
      if (!response.ok) throw new Error(`Failed to submit. Status: ${response.status}`);

      await response.json(); // Await response parsing
      alert('Rankings submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit rankings.');
    }
  };

  return (
    <div className="dashboard-container">
      {assignmentData?.hasAcceptedOffers ? (
        // Render the "Accepted Offer" Info Box
        <div
          style={{
            backgroundColor: '#d1ecf1',
            border: '1px solid #bee5eb',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '20px',
            color: '#0c5460',
            fontWeight: 'bold',
          }}
        >
          <p>A company has accepted your offer!</p>
          <p>Company: {assignmentData.company.company_name}</p>
          <p>Company Email: {assignmentData.company.email}</p>
          <p>Residency Description: {assignmentData.residency.description}</p>
          <p>Salary: €{assignmentData.residency.salary}</p>
          <p>Expect the company to email you shortly.</p>
        </div>
      ) : (
        // Only show this if no offer has been accepted
        <>
          {/* LEFT COLUMN: Available Residencies */}
          <div className="students-list scrollable">
            <h2>Available Residencies</h2>

            {loading ? (
              <p>Loading...</p>
            ) : (
              availableStudents.map(student => (
                <div
                  key={student.id}
                  draggable
                  onDragStart={() => handleDragStart(student)}
                  className="draggable-block"
                >
                  <RankingBlock
                    id={student.id}
                    title={student.title}
                    info1={`Company: ${student.company_name}`}
                    info2={`Salary: €${student.salary} /month`}
                    dropdownContent={<p>{student.title} details</p>}
                  />
                </div>
              ))
            )}
          </div>

          {/* RIGHT COLUMN: Shortlisted Residencies */}
          <div
            className="shortlist scrollable"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
          >
            <h2 className="shortlist-title">Shortlist</h2>

            {shortlist.map((student, index) => (
              <div
                key={student.id}
                draggable
                onDragStart={() => setDragged(student)}
                onDragOver={e => {
                  e.preventDefault();
                  if (dragged && student.id !== dragged.id) {
                    const dragIndex = shortlist.findIndex(s => s.id === dragged.id);
                    handleSort(dragIndex, index);
                  }
                }}
                className="shortlist-item"
              >
                <RankingBlock
                  id={index + 1}
                  title={student.title}
                  info1={`Company: ${student.company_name}`}
                  info2={`Salary: €${student.salary} /month`}
                  dropdownContent={
                    <button onClick={() => handleRemove(student.id)}>Remove</button>
                  }
                />
              </div>
            ))}

            {availableStudents.length === 0 && (
              <div style={{ marginTop: '20px' }}>
                <button onClick={handleSubmit} className="submit-button">
                  Submit Rankings
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// Export the component for use elsewhere
export default UserHomePage;
// This file defines the UserHomePage component for the user dashboard.	
// It allows users to rank residencies by dragging and dropping them into a shortlist.
// The component fetches residencies from the backend, allows drag-and-drop ranking, and submits the final rankings.
