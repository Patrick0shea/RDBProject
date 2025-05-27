// UserHomePage.tsx
import { useState } from 'react';
import RankingBlock from './RankingBlock';
import './App.css';

interface User {
  id: number;
  title: string;
}

const UserHomePage = () => {
  const initialStudents: User[] = [
    { id: 1, title: "Amazon" },
    { id: 2, title: "Hugh Feehan" },
    { id: 3, title: "Patrcik O'shea" },
    { id: 4, title: "Aaron McGuinness" },
    { id: 5, title: "Spunk" },
  ];

  const [availableStudents, setAvailableStudents] = useState<User[]>(initialStudents);
  const [shortlist, setShortlist] = useState<User[]>([]);
  const [dragged, setDragged] = useState<User | null>(null);

  const handleDragStart = (students: User) => {
    setDragged(students);
  };

  const handleDrop = () => {
    if (dragged && !shortlist.find(c => c.id === dragged.id)) {
      setShortlist(prev => [...prev, dragged]);
      setAvailableStudents(prev => prev.filter(c => c.id !== dragged.id));
    }
    setDragged(null);
  };

  const handleRemove = (id: number) => {
    const removed = shortlist.find(c => c.id === id);
    if (removed) {
      setShortlist(prev => prev.filter(c => c.id !== id));
      setAvailableStudents(prev => [...prev, removed]);
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
      <div className="students-list scrollable">
        <h2>Available Students</h2>
        {availableStudents.map(students => (
          <div
            key={students.id}
            draggable
            onDragStart={() => handleDragStart(students)}
            className="draggable-block"
          >
            <RankingBlock
              id={students.id}
              title={students.title}
              info1={`Location: ${students.title === 'Transact' ? 'Limerick' : 'Dublin'}`}
              info2={`Salary: €${2500 + students.id * 100}/month`}
              info3={`No. of Days in Office: ${students.id % 3}`}
              dropdownContent={<p>{students.title} details</p>}
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
        {shortlist.map((students, index) => (
          <div
            key={students.id}
            draggable
            onDragStart={() => setDragged(students)}
            onDragOver={(e) => {
              e.preventDefault();
              if (dragged && students.id !== dragged.id) {
                const dragIndex = shortlist.findIndex(c => c.id === dragged.id);
                const hoverIndex = shortlist.findIndex(c => c.id === students.id);
                handleSort(dragIndex, hoverIndex);
              }
            }}
            className="shortlist-item"
          >
            <RankingBlock
              id={index + 1} // Position-based ID
              title={students.title}
              info1={`Location: ${students.title === 'Transact' ? 'Limerick' : 'Dublin'}`}
              info2={`Salary: €${2500 + students.id * 100}/month`}
              info3={`No. of Days in Office: ${students.id % 3}`}
              dropdownContent={
                <>
                  <p>{students.title} in shortlist</p>
                  <button onClick={() => handleRemove(students.id)}>Remove</button>
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

export default UserHomePage;
