// src/pages/LandingPageTest.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/Button'; // updated relative path if needed

const LandingPageTest = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Who Are You?</h2>
        <div style={styles.buttonGroup}>
          <Button
            label="Student"
            onClick={() => {
              localStorage.setItem('userType', '0');
              navigate('/login');
            }}
            style={styles.button}
          />
          <Button
            label="Company"
            onClick={() => {
              localStorage.setItem('userType', '1');
              navigate('/company-login');
            }}
            style={styles.button}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageTest;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: '#0F172A',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    padding: '2rem',
    textAlign: 'center',
    width: '400px',
  },
  header: {
    marginBottom: '1.5rem',
    fontSize: '1.75rem',
    color: '#10B981',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    background: '#10B981',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};
