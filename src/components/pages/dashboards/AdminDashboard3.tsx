import React, { useEffect, useState } from 'react';

interface Student {
  id: string;
  name: string;
  qca: number;
  attendance: number;
  score: number;
  behavioralTrait: string;
  hasRanked: boolean;
}

interface Company {
  id: string;
  name: string;
  capacity: number;
  hasRanked: boolean;
}

const AdminDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [openStudentIds, setOpenStudentIds] = useState<Set<string>>(new Set());

  const [companies, setCompanies] = useState<Company[]>([]);
  const [openCompanyIds, setOpenCompanyIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: '24403822',
        name: 'Sam McLoughlin',
        qca: 3.88,
        attendance: 90,
        score: 70,
        behavioralTrait: 'Team Player',
        hasRanked: true,
      },
      {
        id: '24430668',
        name: 'Patrick O Shea',
        qca: 3.52,
        attendance: 90,
        score: 70,
        behavioralTrait: 'Problem Solver',
        hasRanked: false,
      },
      {
        id: '23355409',
        name: 'Aaron McGuinness',
        qca: 3.96,
        attendance: 90,
        score: 70,
        behavioralTrait: 'Creative Thinker',
        hasRanked: true,
      },
      {
        id: '24405523',
        name: 'Hugh Feehan',
        qca: 2.85,
        attendance: 90,
        score: 70,
        behavioralTrait: 'Independent Worker',
        hasRanked: false,
      },
    ];
    setStudents(mockStudents);
  }, []);

  useEffect(() => {
    const mockCompanies: Company[] = [
      {
        id: '001',
        name: 'Amazon',
        capacity: 6,
        hasRanked: false,
      },
      {
        id: '002',
        name: 'Shanonside Capital',
        capacity: 2,
        hasRanked: true,
      },
      {
        id: '003',
        name: 'INFANT',
        capacity: 2,
        hasRanked: false,
      },
      {
        id: '004',
        name: 'Zerve',
        capacity: 1,
        hasRanked: true,
      },
    ];
    setCompanies(mockCompanies);
  }, []);

  const toggleDetails = (id: string) => {
    setOpenStudentIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleCompanyDetails = (id: string) => {
    setOpenCompanyIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="admin-login--container" style={{ display: 'flex', gap: '2rem' }}>
      <div className="ranking-block scrollable" style={{ flex: 1, minWidth: '320px' }}>
        <h2 className="ranking-title">Student QCA Overview</h2>
        {students.map((student) => {
          const isMissingRanking = !student.hasRanked;
          const isOpen = openStudentIds.has(student.id);

          return (
            <div
              key={student.id}
              style={{
                backgroundColor: isMissingRanking ? '#ffe6e6' : 'var(--white)',
                border: '1px solid #ccc',
                borderLeft: isMissingRanking ? '4px solid red' : '4px solid var(--green)',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
              }}
            >
              <div
                onClick={() => toggleDetails(student.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <strong>
                    {student.name} ({student.id})
                  </strong>{' '}
                  {!student.hasRanked && <span title="Ranking Not Submitted">🚫</span>}
                </div>
                <div style={{ fontSize: '1.2rem' }}>{isOpen ? '▲' : '▼'}</div>
              </div>

              {isOpen && (
                <div style={{ marginTop: '1rem' }}>
                  <p>
                    <strong>QCA:</strong> {student.qca.toFixed(2)}
                  </p>
                  <p>
                    <strong>Behavioral Trait:</strong> {student.behavioralTrait}
                  </p>
                  <p>
                    <strong>Attendance:</strong> {student.attendance}%
                  </p>
                  <p>
                    <strong>Overall Score:</strong> {student.score}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Company Table */}
      <div className="ranking-block" style={{ flex: 1, minWidth: '320px' }}>
        <h2 className="ranking-title">Company Overview</h2>
        {companies.map((company) => {
          const isMissingRanking = !company.hasRanked;
          const isOpen = openCompanyIds.has(company.id);

          return (
            <div
              key={company.id}
              style={{
                backgroundColor: isMissingRanking ? '#ffe6e6' : 'white',
                border: '1px solid #ccc',
                borderLeft: isMissingRanking ? '4px solid red' : '4px solid green',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
              }}
            >
              <div
                onClick={() => toggleCompanyDetails(company.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div>
                  <strong>
                    {company.name} ({company.id})
                  </strong>{' '}
                  {!company.hasRanked && <span title="Ranking Not Submitted">🚫</span>}
                </div>
                <div style={{ fontSize: '1.2rem' }}>{isOpen ? '▲' : '▼'}</div>
              </div>

              {isOpen && (
                <div style={{ marginTop: '1rem' }}>
                  <p>
                    <strong>Capacity:</strong> {company.capacity}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;