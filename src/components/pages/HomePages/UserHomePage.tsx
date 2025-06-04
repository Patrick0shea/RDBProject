import { useState, useEffect } from 'react';
import RankingBlock from '../../shared/RankingBlock';
import type { User } from '../../../types/user';
import '../../../styles/App.css';

const UserHomePage = () => {
  const [availableStudents, setAvailableStudents] = useState<User[]>([]);
  const [shortlist, setShortlist] = useState<User[]>([]);
  const [dragged, setDragged] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResidencies = async () => {
      try {
        const response = await fetch('http://localhost:8000/get-residencies', {
          credentials: 'include',
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        const users = data.map((item: any) => ({
          id: item.id,
          title: item.description,
          salary: item.salary,
          company_name: item.company_name,
        }));

        setAvailableStudents(users);
      } catch (error) {
        console.error('Failed to fetch residencies:', error);
        alert('Error loading residencies.');
      } finally {
        setLoading(false);
      }
    };

    fetchResidencies();
  }, []);

  const handleDragStart = (user: User) => {
    try {
      setDragged(user);
    } catch (error) {
      console.error('Drag start error:', error);
    }
  };

  const handleDrop = () => {
    try {
      if (!dragged) return;
      if (!shortlist.some(s => s.id === dragged.id)) {
        setShortlist(prev => [...prev, dragged]);
        setAvailableStudents(prev => prev.filter(s => s.id !== dragged.id));
      }
    } catch (error) {
      console.error('Drop error:', error);
    } finally {
      setDragged(null);
    }
  };

  const handleRemove = (id: number) => {
    try {
      const removed = shortlist.find(s => s.id === id);
      if (removed) {
        setShortlist(prev => prev.filter(s => s.id !== id));
        setAvailableStudents(prev => [...prev, removed]);
      }
    } catch (error) {
      console.error(`Remove error for id ${id}:`, error);
    }
  };

  const handleSort = (dragIndex: number, hoverIndex: number) => {
    try {
      if (dragIndex < 0 || hoverIndex < 0) return;
      const updated = [...shortlist];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, moved);
      setShortlist(updated);
    } catch (error) {
      console.error('Sort error:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const rankingPayload = shortlist.map((user, index) => ({
        residency_id: user.id,
        position: index + 1,
      }));

      const response = await fetch('http://localhost:8000/submit-rankings', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rankingPayload),
      });

      if (!response.ok) throw new Error(`Failed to submit. Status: ${response.status}`);

      await response.json();
      alert('Rankings submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit rankings.');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Left Column */}
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

      {/* Right Column */}
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
            onDragStart={() => {
              try {
                setDragged(student);
              } catch (error) {
                console.error('DragStart error on shortlist:', error);
              }
            }}
            onDragOver={e => {
              try {
                e.preventDefault();
                if (dragged && student.id !== dragged.id) {
                  const dragIndex = shortlist.findIndex(s => s.id === dragged.id);
                  handleSort(dragIndex, index);
                }
              } catch (error) {
                console.error('DragOver error:', error);
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
    </div>
  );
};

export default UserHomePage;
