// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

/** =======================
 * Types and Interfaces
 * =======================
 */

/** Describes a Student object with academic and behavioral info */
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

/** Describes a Company object with matching capacity */
interface Company {
  id: string;
  name: string;
  capacity: number;
  hasRanked: boolean;
}

/** Represents a user-submitted feedback item */
interface Feedback {
  name: string;
  message: string;
}

/** Props used by the reusable SearchBar component */
interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

/** =======================
 * Utility: Render a search bar input
 * @param props - SearchBarProps (placeholder, value, onChange handler)
 * @returns a styled text input field
 */
const renderSearchBar = ({ placeholder, value, onChange }: SearchBarProps) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1rem',
      border: '1px solid #D1D5DB',
      borderRadius: '4px',
    }}
  />
);

/** =======================
 * Main Admin Dashboard Component
 * =======================
 */
const AdminDashboard: React.FC = () => {
  // Student data state
  const [students, setStudents] = useState<Student[]>([]);
  const [openStudentIds, setOpenStudentIds] = useState<Set<string>>(new Set()); // Tracks which student cards are expanded

  // Company data state
  const [companies, setCompanies] = useState<Company[]>([]);
  const [openCompanyIds, setOpenCompanyIds] = useState<Set<string>>(new Set()); // Tracks which company cards are expanded

  // Search bar values
  const [studentSearch, setStudentSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [feedbackSearch, setFeedbackSearch] = useState('');

  // Feedback state
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  /** Populate student list with mock data once on mount */
  useEffect(() => {
    const mockStudents: Student[] = [
      { id: '24403822', name: 'Sam McLoughlin', qca: 3.88, attendance: 90, averageParticipationPercentage: 20, score: 70, behavioralTrait: 'Team Player', hasRanked: true },
      { id: '24430668', name: 'Patrick O Shea', qca: 3.52, attendance: 90, averageParticipationPercentage: 25, score: 70, behavioralTrait: 'Problem Solver', hasRanked: false },
      { id: '23355409', name: 'Aaron McGuinness', qca: 3.96, attendance: 90, averageParticipationPercentage: 15, score: 70, behavioralTrait: 'Creative Thinker', hasRanked: true },
      { id: '24405523', name: 'Hugh Feehan', qca: 2.85, attendance: 90, averageParticipationPercentage: 10, score: 70, behavioralTrait: 'Independent Worker', hasRanked: false },
    ];
    setStudents(mockStudents);
  }, []);

  /** Populate company list with mock data once on mount */
  useEffect(() => {
    const mockCompanies: Company[] = [
      { id: '001', name: 'Amazon', capacity: 6, hasRanked: false },
      { id: '002', name: 'Shanonside Capital', capacity: 2, hasRanked: true },
      { id: '003', name: 'INFANT', capacity: 2, hasRanked: false },
      { id: '004', name: 'Zerve', capacity: 1, hasRanked: true },
    ];
    setCompanies(mockCompanies);
  }, []);

  /** Populate feedback list with mock data once on mount */
  useEffect(() => {
    const mockFeedback: Feedback[] = [
      { name: 'Bence', message: 'I cannot access the user dashboard' },
      { name: 'Hugh', message: 'My student number doesnt work' },
      { name: 'Aaron', message: 'Results are not updating' },
    ];
    setFeedbackList(mockFeedback);
  }, []);

  /** Filter students based on search query (name or ID) */
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.id.includes(studentSearch)
  );

  /** Filter companies based on search query (name or ID) */
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(companySearch.toLowerCase()) ||
      company.id.includes(companySearch)
  );

  /** Filter feedback based on search query (name or message) */
  const filteredFeedback = feedbackList.filter(
    (entry) =>
      entry.name.toLowerCase().includes(feedbackSearch.toLowerCase()) ||
      entry.message.toLowerCase().includes(feedbackSearch.toLowerCase())
  );

  /** Toggle visibility of expanded student details */
  const toggleDetails = (id: string) => {
    setOpenStudentIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  /** Toggle visibility of expanded company details */
  const toggleCompanyDetails = (id: string) => {
    setOpenCompanyIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  /** =======================
   * JSX UI Layout
   * =======================
   */
  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* STUDENTS & COMPANIES SECTION */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* STUDENT CARD SECTION */}
        <div className="card" style={{ flex: 1, minWidth: '300px' }}>
          <h2>Students</h2>
          {renderSearchBar({
            placeholder: 'Search students by name or ID',
            value: studentSearch,
            onChange: setStudentSearch,
          })}
          <div>
            {filteredStudents.length === 0 && <p>No students found</p>}
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                style={{
                  border: '1px solid #A3E635',
                  borderRadius: '6px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                }}
                onClick={() => toggleDetails(student.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {/* Red dot if student hasn't ranked */}
                  {!student.hasRanked && (
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        display: 'inline-block',
                      }}
                      title="Has not ranked"
                    />
                  )}
                  <strong>{student.name}</strong> (ID: {student.id})
                </div>
                {/* Expanded student details */}
                {openStudentIds.has(student.id) && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#4B5563' }}>
                    <p>QCA: {student.qca}</p>
                    <p>Attendance: {student.attendance}%</p>
                    <p>Participation: {student.averageParticipationPercentage}%</p>
                    <p>Score: {student.score}</p>
                    <p>Behavioral Trait: {student.behavioralTrait}</p>
                    <p>Has Ranked: {student.hasRanked ? 'Yes' : 'No'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COMPANY CARD SECTION */}
        <div className="card" style={{ flex: 1, minWidth: '300px' }}>
          <h2>Companies</h2>
          {renderSearchBar({
            placeholder: 'Search companies by name or ID',
            value: companySearch,
            onChange: setCompanySearch,
          })}
          <div>
            {filteredCompanies.length === 0 && <p>No companies found</p>}
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                style={{
                  border: '1px solid #A3E635',
                  borderRadius: '6px',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                }}
                onClick={() => toggleCompanyDetails(company.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {/* Red dot if company hasn't ranked */}
                  {!company.hasRanked && (
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'red',
                        borderRadius: '50%',
                        display: 'inline-block',
                      }}
                      title="Has not ranked"
                    />
                  )}
                  <strong>{company.name}</strong> (ID: {company.id})
                </div>
                {/* Expanded company details */}
                {openCompanyIds.has(company.id) && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#4B5563' }}>
                    <p>Capacity: {company.capacity}</p>
                    <p>Has Ranked: {company.hasRanked ? 'Yes' : 'No'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEEDBACK SECTION */}
      <div className="card">
        <h2>Feedback</h2>
        {renderSearchBar({
          placeholder: 'Search feedback by name or message',
          value: feedbackSearch,
          onChange: setFeedbackSearch,
        })}
        <div>
          {filteredFeedback.length === 0 && <p>No feedback found</p>}
          {filteredFeedback.map((fb, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #A3E635',
                borderRadius: '6px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: '#FFFFFF',
              }}
            >
              <strong>{fb.name}</strong>
              <p>{fb.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
