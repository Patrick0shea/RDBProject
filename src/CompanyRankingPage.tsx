import React, { useState } from 'react';

interface Student {
  id: number;
  name: string;
  qca: number;
  currentRank?: number;
}

const initialStudents: Student[] = [
  { id: 1, name: "Patrick O'Shea", qca: 1.0 },
  { id: 2, name: "Hugh Feehan", qca: 3.0 },
  { id: 3, name: "Sam Mcloughlin", qca: 4.0 },
];

const CompanyRankingPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [companyId, setCompanyId] = useState('');

  const handleRankChange = (id: number, rank: number) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, currentRank: rank } : student
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { companyId, rankings: students };
    console.log('Submitted:', payload);
    // TODO: Send to backend
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}>Company Student Ranking</h1>

        <label style={styles.label}>
          Company ID
          <input
            type="text"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your company ID"
          />
        </label>

        {students.map((student) => (
          <div key={student.id} style={styles.studentCard}>
            <div style={styles.studentName}>
              {student.name} <span style={styles.qca}>QCA: {student.qca.toFixed(2)}</span>
            </div>
            <label style={styles.rankLabel}>Assign Rank (1–3)</label>
            <select
              value={student.currentRank || ''}
              onChange={e => handleRankChange(student.id, parseInt(e.target.value))}
              style={styles.select}
            >
              <option value="">Select rank</option>
              {[1, 2, 3].map(rank => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="submit" style={styles.button}>Submit Rankings</button>
      </form>
    </div>
  );
};

export default CompanyRankingPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100vw',
    minHeight: '100vh',
    background: '#002D40',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    padding: '2.5rem',
    background: '#F0FDF4',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    color: '#0F5132',
  },
  label: {
    display: 'block',
    marginBottom: '1.25rem',
    fontSize: '1rem',
    color: '#1F2937',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #A3E635',
    boxSizing: 'border-box',
    background: '#FFFFFF',
    color: '#1F2937',
  },
  studentCard: {
    padding: '1rem',
    marginBottom: '1rem',
    background: '#FFFFFF',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  studentName: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    color: '#0F5132',
  },
  qca: {
    fontWeight: 'normal',
    marginLeft: '0.5rem',
    fontSize: '0.95rem',
    color: '#6B7280',
  },
  rankLabel: {
    display: 'block',
    margin: '0.5rem 0 0.25rem',
    fontSize: '0.95rem',
    color: '#1F2937',
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #D1D5DB',
    background: '#F9FAFB',
    fontSize: '1rem',
    color: '#111827',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    background: '#22C55E',
    color: '#FFFFFF',
    cursor: 'pointer',
    marginTop: '1.5rem',
  },
};
