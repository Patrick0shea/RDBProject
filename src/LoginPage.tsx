import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [aboutMe, setAboutMe] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [address, setAddress] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [role, setRole] = useState('user');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('aboutMe', aboutMe);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('linkedin', linkedin);
    formData.append('github', github);
    formData.append('address', address);
    formData.append('role', role);
    if (cv) formData.append('cv', cv);

    fetch('/api/register', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log('Server response:', data);

        // Navigate to appropriate dashboard
        if (role === 'user') {
          navigate('/user-dashboard');
        } else if (role === 'company') {
          navigate('/company-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Something went wrong!');
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

        {/* Role Dropdown */}
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

        {/* About Me */}
        <label style={styles.label}>
          About Me
          <input
            type="text"
            value={aboutMe}
            onChange={e => setAboutMe(e.target.value)}
            required
            style={styles.input}
            placeholder="Tell us about yourself in 100 words"
          />
        </label>

        {/* Email */}
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

        {/* Password */}
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

        {/* LinkedIn */}
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

        {/* GitHub */}
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

        {/* Address */}
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

        {/* CV Upload */}
        <label style={styles.label}>
          Upload CV
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button}>
          Submit
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
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#002D40',
    padding: '2rem',
    boxSizing: 'border-box',
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
