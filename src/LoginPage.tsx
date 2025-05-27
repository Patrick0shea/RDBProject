import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [firstName, setFirstName]     = useState('');
  const [lastName, setLastName]       = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [linkedin, setLinkedin]       = useState('');
  const [github, setGithub]           = useState('');
  const [address, setAddress]         = useState('');
  const [cv, setCv]                   = useState<File | null>(null);
  const [role, setRole]               = useState<'user'|'company'|'admin'>('user');
  const [studentId, setStudentId]     = useState('');
  const [companyName, setCompanyName] = useState('');
  const navigate                       = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setCv(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(
      role === 'user'
        ? '/user-dashboard'
        : role === 'company'
          ? '/company-dashboard'
          : '/admin-dashboard'
    );
  };
  return (
    <div
      className="dashboard-container"
      style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="company-list"
        style={{ maxWidth: '500px', padding: '2.5rem' }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>ISE Residency Ranking System</h1>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Select Role
          <select
            value={role}
            onChange={e => setRole(e.target.value as any)}
            className="input-field"
            required
          >
            <option value="user">User</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            className="input-field"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            className="input-field"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input-field"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input-field"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="input-field"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          LinkedIn
          <input
            type="url"
            value={linkedin}
            onChange={e => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/you"
            className="input-field"
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          GitHub
          <input
            type="url"
            value={github}
            onChange={e => setGithub(e.target.value)}
            placeholder="https://github.com/you"
            className="input-field"
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Home Address
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Eircode"
            className="input-field"
          />
        </label>

        {role === 'user' && (
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Student ID
            <input
              type="text"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder="Enter your student ID"
              className="input-field"
              required
            />
          </label>
        )}

        {role === 'company' && (
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Company Name
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="input-field"
              required
            />
          </label>
        )}

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Upload CV
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="input-field"
          />
        </label>

        <button
          type="submit"
          className="submit-button"
          style={{ width: '100%', marginTop: '1.5rem' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;