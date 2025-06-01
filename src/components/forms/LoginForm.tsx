import React from 'react';

type LoginFormProps = {
  title: string;
  role: 'user' | 'company' | 'admin';
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string; // Optional error message
};

export const LoginForm: React.FC<LoginFormProps> = ({
  title,
  role,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
}) => {
  return (
    <div
      className="dashboard-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <form
        onSubmit={onSubmit}
        className="company-list"
        style={{ width: '90%', maxWidth: '500px', padding: '2.5rem' }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{title}</h1>

        {error && (
          <div
            style={{
              color: 'red',
              backgroundColor: '#ffe5e5',
              border: '1px solid red',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
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
            onChange={(e) => onPasswordChange(e.target.value)}
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
