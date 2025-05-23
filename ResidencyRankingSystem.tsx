import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const defaultOptions = ['Amazon', 'Intercom', 'Google', 'Microsoft', 'Facebook'];

interface SortableItemProps {
  id: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '0.75rem',
    margin: '0.5rem 0',
    background: '#FFFFFF',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};

const ResidencyRankingPage: React.FC = () => {
  const [studentId, setStudentId] = useState('');
  const [items, setItems] = useState(defaultOptions);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { studentId, ranking: items };
    console.log('Submitted:', payload);
    // TODO: send payload to server
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}>Residency Ranking</h1>

        <label style={styles.label}>
          Student ID
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your student ID"
          />
        </label>

        <div style={styles.dragArea}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((id) => (
                <SortableItem key={id} id={id} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <button type="submit" style={styles.button}>Submit Ranking</button>
      </form>
    </div>
  );
};

export default ResidencyRankingPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: '#f0f4f8',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    padding: '2rem',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
  },
  label: {
    display: 'block',
    marginBottom: '1.25rem',
    fontSize: '1rem',
    color: '#333',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  dragArea: {
    margin: '1.5rem 0',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    background: '#0070f3',
    color: '#fff',
    cursor: 'pointer',
  },
};
