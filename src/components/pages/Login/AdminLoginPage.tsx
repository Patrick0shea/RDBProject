import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminLoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ID, setID] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

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
      navigate('/admin-dashboard');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div
      className="admin-login-container"
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <form
        onSubmit={handleLogin}
        className="company-list"
        style={{ maxWidth: '500px', padding: '4rem', maxHeight: '550px'}}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Admin Login
        </h1>

        {errorMsg && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {errorMsg}
          </div>
        )}

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Name
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="admin-login-input"
            placeholder="Enter your name"
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Password
        <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="admin-login-input"
            placeholder="Enter your password"
          />
        </label>

<button 
type='button'
style={styles.button} 
onClick={() => {
            navigate('/admin-dashboard3');
          }}>
  Login
</button>

      </form>
    </div>
  );
};

export default AdminLoginPage;
