import { useState, useEffect } from 'react';
import RankingBlock from '../../shared/RankingBlock';
import type { User } from '../../../types/user';
import '../../styles/App.css';

const UserHomePage = () => {
  const [availableStudents, setAvailableStudents] = useState<User[]>([]);
  const [shortlist, setShortlist] = useState<User[]>([]);
  const [dragged, setDragged] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/get-residencies', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const users = data.map((item: any) => ({
          id: item.id,
          title: item.description,
          salary: item.salary,
          company_name: item.company_name
        }));
        setAvailableStudents(users);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDragStart = (user: User) => setDragged(user);

  const handleDrop = () => {
    if (dragged && !shortlist.find(s => s.id === dragged.id)) {
      setShortlist(prev => [...prev, dragged]);
      setAvailableStudents(prev => prev.filter(s => s.id !== dragged.id));
    }
    setDragged(null);
  };

  const handleRemove = (id: number) => {
    const removed = shortlist.find(s => s.id === id);
    if (removed) {
      setShortlist(prev => prev.filter(s => s.id !== id));
      setAvailableStudents(prev => [...prev, removed]);
    }
  };

  const handleSort = (dragIndex: number, hoverIndex: number) => {
    const updated = [...shortlist];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, moved);
    setShortlist(updated);
  };

  const handleSubmit = () => {
    const rankingPayload = shortlist.map((user, index) => ({
      residency_id: user.id,
      position: index + 1,
    }));

    fetch('http://localhost:8000/submit-rankings', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rankingPayload),
    })
      .then(res => res.json())
      .then(() => alert('Rankings submitted successfully!'))
      .catch(() => alert('Failed to submit rankings.'));
  };

  return (
    <div className="dashboard-container">
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

      <div className="shortlist scrollable" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
        <h2 className="shortlist-title">Shortlist</h2>
        {shortlist.map((student, index) => (
          <div
            key={student.id}
            draggable
            onDragStart={() => setDragged(student)}
            onDragOver={e => {
              e.preventDefault();
              if (dragged && student.id !== dragged.id) {
                handleSort(shortlist.findIndex(s => s.id === dragged.id), index);
              }
            }}
            className="shortlist-item"
          >
            <RankingBlock
              id={index + 1}
              title={student.title}
              info1={`Location: ${student.title === 'Transact' ? 'Limerick' : 'Dublin'}`}
              info2={`Salary: €${2500 + student.id * 100}/month`}
              info3={`No. of Days in Office: ${student.id % 3}`}
              dropdownContent={<button onClick={() => handleRemove(student.id)}>Remove</button>}
            />
          </div>
        ))}

        {availableStudents.length === 0 && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleSubmit} className="submit-button">Submit Rankings</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;
