import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    /* FOR BACKEND IMPLEMENTATION
     const loginData = { name, password };

    try {
      const response = await fetch('http://localhost:8000/admin-login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('user_type', '2');
      navigate('/admin-dashboard3');
    } catch (error: any) {
      alert(error.message);
    } */


      // Mocked login success
  if (name === 'admin' && password === 'admin') {
    localStorage.setItem('user_type', '2');
    navigate('/admin-dashboard3');
  } else {
    alert('Invalid credentials');
  }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h1 style={styles.header}>Admin Login</h1>

        <label style={styles.label}>
          Name
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your name"
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

<button 
type='submit'
style={styles.button} 
>
  Login
</button>

      </form>
    </div>
  );
};

export default AdminLoginPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    width: '100vw',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#002D40',
    padding: '2rem',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
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