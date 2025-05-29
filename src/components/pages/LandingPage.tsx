// src/pages/LandingPageTest.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/Button';
import '../../styles/App.css';

const LandingPageTest: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (type: '0'|'1'|'2', path: string) => {
    localStorage.setItem('userType', type);
    navigate(path);
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-form">
        <h2 className="admin-login-header">Who Are You?</h2>

        <Button
          label="Student"
          onClick={() => handleClick('0', '/login')}
          className="admin-login-button"
        />
        <Button
          label="Company"
          onClick={() => handleClick('1', '/company-login')}
          className="admin-login-button"
        />
        <Button
          label="Admin"
          onClick={() => handleClick('2', '/admin-login-page')}
          className="admin-login-button"
        />
      </div>
    </div>
  );
};

export default LandingPageTest;
