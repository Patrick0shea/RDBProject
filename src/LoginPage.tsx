import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [address, setAddress] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [role, setRole] = useState('user');
  const [studentId, setStudentId] = useState('');
  const [companyName, setCompanyName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userType = role === 'user' ? 0 : role === 'company' ? 1 : 2;

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    formData.append('linkedin', linkedin);
    formData.append('github', github);
    formData.append('address', address);
    formData.append('user_type', String(userType));
    if (cv) formData.append('cv', cv);

    if (role === 'user') {
      formData.append('student_id', studentId);
    } else if (role === 'company') {
      formData.append('company_name', companyName);
    }

    fetch('http://localhost:8000/register', {
      method: 'POST',
      body: formData,
    })
      .then(async (res) => {
        const text = await res.text();
        let data = {};
        try {
          data = JSON.parse(text);
        } catch {
          console.warn('Response is not JSON:', text);
        }

        if (!res.ok) {
          throw new Error((data as any).message || 'Server error occurred');
        }

        localStorage.setItem('user_type', String(userType));

        if (role === 'user') {
          navigate('/user-dashboard');
        } else if (role === 'company') {
          navigate('/company-dashboard');
        } else {
          navigate('/admin-dashboard');
        }
      })
      .catch((err) => {
        console.error('Error during fetch:', err);
        alert(`Something went wrong!\n${err?.message || 'Unknown error'}`);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}>ISE Residency Ranking System</h1>

        <label style={styles.label}>
          Select Role
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
            required
          >
            <option value="user">User</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label style={styles.label}>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            style={styles.input}
            placeholder="First Name"
          />
        </label>

        <label style={styles.label}>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
            style={styles.input}
            placeholder="Last Name"
          />
        </label>

        <label style={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="you@example.com"
          />
        </label>

        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your password"
          />
        </label>

        <label style={styles.label}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Re-enter your password"
          />
        </label>

        <label style={styles.label}>
          LinkedIn
          <input
            type="url"
            value={linkedin}
            onChange={e => setLinkedin(e.target.value)}
            style={styles.input}
            placeholder="https://www.linkedin.com/in/yourprofile"
          />
        </label>

        <label style={styles.label}>
          GitHub
          <input
            type="url"
            value={github}
            onChange={e => setGithub(e.target.value)}
            style={styles.input}
            placeholder="https://github.com/yourusername"
          />
        </label>

        <label style={styles.label}>
          Home Address
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            style={styles.input}
            placeholder="Eircode"
          />
        </label>

        {role === 'user' && (
          <label style={styles.label}>
            Student ID
            <input
              type="text"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              style={styles.input}
              placeholder="Enter your student ID"
              required
            />
          </label>
        )}

        {role === 'company' && (
          <label style={styles.label}>
            Company Name
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              style={styles.input}
              placeholder="Enter your company name"
            />
          </label>
        )}

        <label style={styles.label}>
          Upload CV
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={styles.input}
          />
        </label>

        <button
          type="button"
          onClick={() => {
            navigate('/user-dashboard');
          }}
          style={styles.button}
        >
          Student
        </button>
      </form>
    </div>
  );
};  

export default LoginPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    width: '100vw',
    minHeight: '100vh', // ✅ change from height to minHeight
    alignItems: 'center',
    justifyContent: 'center',
    background: '#002D40',
    padding: '2rem',
    boxSizing: 'border-box',
    overflowY: 'auto', // ✅ allow scroll if content is too tall
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    padding: '2.5rem',
    borderRadius: '12px',
    background: '#F0FDF4',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '2rem',
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
