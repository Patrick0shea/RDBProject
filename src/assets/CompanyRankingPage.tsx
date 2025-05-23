import React, { useState } from 'react';

interface Student {
  id: number;
  name: string;
  qca: number;
  currentRank?: number; // Company-assigned rank
}

const initialStudents: Student[] = [
  { id: 1, name: "Patrick O'Shea", qca: 1.0 },
  { id: 2, name: "Hugh Feehan", qca: 3.0 },
  { id: 3, name: "Sam Mcloughlin", qca: 4.0 },
  { id: 4, name: "Aaronn McGuinness", qca: 3.2}
];


const CompanyRankingPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const handleRankChange = (id: number, rank: number) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, currentRank: rank } : student
      )
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Company Student Ranking</h1>
      {students.map(student => (
        <div key={student.id} className="mb-4 border rounded-lg p-4 shadow-sm">
          <div className="text-lg font-semibold">{student.name}</div>
            <div className="text-sm text-gray-600 mb-2">QCA: {student.qca.toFixed(2)}</div>
          <label className="block mb-1 text-sm font-medium">Assign Rank (1-5):</label>
          <select
            value={student.currentRank || ''}
            onChange={e => handleRankChange(student.id, parseInt(e.target.value))}
            className="border px-2 py-1 rounded"
          >
            <option value="">Select rank</option>
            {[1, 2, 3, 4, 5].map(rank => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default CompanyRankingPage;
