import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'company' | 'admin'>('user');
  const navigate = useNavigate();

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
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="company-list"
        style={{ width: '90%', maxWidth: '500px', padding: '2.5rem' }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Login Page
        </h1>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Select Role
          <select
            value={role}
            onChange={e => setRole(e.target.value as any)}
            className="input-field"
            required
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <option value="user">User</option>
            <option value="company">Company</option>
            <option value="admin">Admin</option>
          </select>
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
            style={{ width: '100%', marginTop: '0.5rem' }}
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
            style={{ width: '100%', marginTop: '0.5rem' }}
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

export default AccLoginPage;
