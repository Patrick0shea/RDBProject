import React, { useEffect, useState } from 'react';

interface Student {
  id: string;
  name: string;
  qca: number;
  attendance: number;
  averageParticipationPercentage: number;
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

interface SearchBar {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

interface Feedback {
  name: string,
  message: string
}

const AdminDashboard: React.FC = () => {
  
  /*Students */
  const [students, setStudents] = useState<Student[]>([]);
  const [openStudentIds, setOpenStudentIds] = useState<Set<string>>(new Set());
/*Companies*/
  const [companies, setCompanies] = useState<Company[]>([]);
  const [openCompanyIds, setOpenCompanyIds] = useState<Set<string>>(new Set());
/*SearchBar*/
  const [studentSearch, setStudentSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
/*Feedback*/
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);


/*Content for tables*/

  /*Student Placeholder*/
  useEffect(() => {
    const mockStudents: Student[] = [
      {
        id: '24403822',
        name: 'Sam McLoughlin',
        qca: 3.88,
        attendance: 90,
        averageParticipationPercentage: 20,
        score: 70,
        behavioralTrait: 'Team Player',
        hasRanked: true,
      },
      {
        id: '24430668',
        name: 'Patrick O Shea',
        qca: 3.52,
        attendance: 90,
        averageParticipationPercentage: 25,
        score: 70,
        behavioralTrait: 'Problem Solver',
        hasRanked: false,
      },
      {
        id: '23355409',
        name: 'Aaron McGuinness',
        qca: 3.96,
        attendance: 90,
        averageParticipationPercentage: 15,
        score: 70,
        behavioralTrait: 'Creative Thinker',
        hasRanked: true,
      },
      {
        id: '24405523',
        name: 'Hugh Feehan',
        qca: 2.85,
        attendance: 90,
        averageParticipationPercentage: 10,
        score: 70,
        behavioralTrait: 'Independent Worker',
        hasRanked: false,
      },
    ];
    setStudents(mockStudents);
  }, []);

  /*Company Placeholder*/
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

  /*Some placeholders for feedback*/
  useEffect(() => {
      const mockFeedback: Feedback[] = [
        {
          name: 'Bence',
          message: 'I cannot access the user dashboard'
        },
        {
          name: 'Hugh',
          message: 'My student number doesnt work'
        },
        {
          name: 'Aaron',
          message: 'Results are not updating'
        }
      ];
        setFeedbackList(mockFeedback);
      }, [])

      /*Add Searching in feedback by name or message*/
const filteredFeedback = feedbackList.filter(
  (entry) =>
    entry.name.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
    entry.message.toLowerCase().includes(feedbackSearch.toLowerCase())
);


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

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.id.includes(studentSearch)
  );

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(companySearch.toLowerCase()) ||
      company.id.includes(companySearch)
  );

  const renderSearchBar = ({ placeholder, value, onChange }: SearchBar) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{  
        display: 'block',
        width: '100%',
        padding: '0.75rem',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #A3E635',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        color: '#1F2937',
      }}
    />
  );

  return (
   <div style={{ padding: '2rem' }}>
    {/* Admin Dashboard Heading */}
    <h1 style={{
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#0F5132',
      marginBottom: '2rem',
      textAlign: 'center',
    }}>
      Admin Dashboard
    </h1>
  
    <div className="dashboard-container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Student Section */}
      <div className="ranking-block scrollable" style={{ flex: 1, minWidth: '320px' }}>
        <h2 className="ranking-title">Student Ranking Overview</h2>
        {renderSearchBar({
          placeholder: 'Search Students by name or ID',
          value: studentSearch,
          onChange: setStudentSearch,
        })}
        {filteredStudents.map((student) => {
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
                    <strong>Average Project Participation:</strong> {student.averageParticipationPercentage}%
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

      {/* Company Section */}
      <div className="ranking-block" style={{ flex: 1, minWidth: '320px' }}>
        <h2 className="ranking-title">Company Ranking Overview</h2>
        {renderSearchBar({
          placeholder: 'Search Companies by name or ID',
          value: companySearch,
          onChange: setCompanySearch,
        })}
        {filteredCompanies.map((company) => {
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
                  <p><strong>Capacity:</strong> {company.capacity}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>

    {/* Feedback Section */}
    <div className="ranking-block" style={{ marginTop: '2rem' }}>
      <div
        onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: '#F3F4F6',
          border: '1px solid #ccc',
          borderLeft: '4px solid #A3E635',
          padding: '1rem',
          borderRadius: '6px',
        }}
      >
        <h2 className="ranking-title" style={{ margin: 0 }}>Feedback</h2>
        <div style={{ fontSize: '1.2rem' }}>{isFeedbackOpen ? '▲' : '▼'}</div>
      </div>

      {isFeedbackOpen && (
        <div style={{ marginTop: '1rem' }}>
          {renderSearchBar({
            placeholder: 'Search Feedback by name or message',
            value: feedbackSearch,
            onChange: setFeedbackSearch,
          })}
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((entry, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ccc',
                  borderLeft: '4px solid #A3E635',
                  padding: '1rem',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                }}
              >
                <p><strong>{entry.name}</strong></p>
                <p style={{ marginTop: '0.5rem', color: '#4B5563' }}>{entry.message}</p>
              </div>
            ))
          ) : (
            <p style={{ marginTop: '1rem' }}>No feedback entries match your search.</p>
          )}
        </div>
      )}
    </div>
  </div>
);
    
};

export default AdminDashboard;
