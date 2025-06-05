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
  score: number;
  attendance: number;
  averageParticipationPercentage: number;
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

  const [offersAvailable, setOffersAvailable] = useState<boolean | null>(null); // null = loading state
  const [assignmentsMade, setAssignmentsMade] = useState<boolean | null>(null); // null = loading state


  // Feedback state
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  /** Add this useEffect for fetching offers */
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:8000/get-offers', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const hasOffers = data.offers && data.offers.length > 0;
          setOffersAvailable(hasOffers);
        } else {
          console.error('Failed to fetch offers');
          setOffersAvailable(false);
        }

      } catch (error) {
        console.error('Error fetching offers:', error);
        setOffersAvailable(false);
      }
    };

    fetchOffers();
  }, []);

    /** Add this useEffect for fetching offers */
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://localhost:8000/get-offers', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const hasAssignments = data.offers && data.offers.length > 0;
          setAssignmentsMade(hasAssignments);
        } else {
          console.error('Failed to fetch assignments');
          setAssignmentsMade(false);
        }

      } catch (error) {
        console.error('Error fetching offers:', error);
        setAssignmentsMade(false);
      }
    };

    fetchAssignments();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/students', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const transformed = data.students.map((s) => ({
            id: s.student_id,
            name: `${s.user.first_name} ${s.user.last_name}`,
            email: s.user.email,
            score: s.score,
            hasRanked: s.hasRanked,
          }));
          setStudents(transformed);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/companies', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const transformed = data.companies.map((c) => ({
            id: c.company_id,
            name: c.company_name,
            capacity:c.capacity,
            hasRanked: c.hasRanked,
          }));
          setCompanies(transformed);
        } else {
          console.error('Failed to fetch companies');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
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
      {offersAvailable === false && (
        <p style={{ color: 'red', fontStyle: 'italic', marginBottom: '1rem' }}>
          * Offers have not been assigned to students yet
        </p>
      )}

      {assignmentsMade === false && (
        <p style={{ color: 'red', fontStyle: 'italic', marginBottom: '1rem' }}>
          * Assignments have not been made yet
        </p>
      )}

      {/* BUTTON ROW */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
        <button
          onClick={() => {
            fetch('http://localhost:8000/assign-offers', { method: 'POST', credentials: 'include' })
              .then(response => {
                if (!response.ok) throw new Error('Request failed');
                return response.json();
              })
              .then(data => {
                alert('Offers processed successfully!');
                setOffersAvailable(true);
              })
              .catch(error => alert('Error processing offers: ' + error.message));
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2563EB',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Process Offers
        </button>

        <button
          onClick={() => {
            fetch('http://localhost:8000/generate-student-scores', { method: 'POST' })
              .then(response => {
                if (!response.ok) throw new Error('Request failed');
                return response.json();
              })
              .then(data => alert('Student scores generated successfully!'))
              .catch(error => alert('Error generating student scores: ' + error.message));
          }}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#10B981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Generate Student Scores
        </button>
      </div>

      {/* STUDENTS & COMPANIES SECTION */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* STUDENT CARD SECTION */}
        <div className="card" style={{ flex: 1, minWidth: '300px' }}>
          <h2>Students</h2>
          
          <div>
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
                    <p>Score: {student.score}</p>
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
          
          <div>
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

      {/* FEEDBACK SECTION 
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
      </div> */}
    </div>
  );
};

export default AdminDashboard;
