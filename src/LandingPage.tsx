// src/pages/LandingPageTest.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/Button';

const LandingPageTest: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="dashboard-container"
      style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }} // had to change a bit for height and centering 
    >
      <div className="company-list">
        <h2 className="ranking-title">Who Are You?</h2>
        <div className="ranking-row">
          <Button
            label="Student"
            onClick={() => {
              localStorage.setItem('userType', '0');
              navigate('/login');
            }}
            className="submit-button"
          />
          <Button
            label="Company"
            onClick={() => {
              localStorage.setItem('userType', '1');
              navigate('/company-login');
            }}
            className="submit-button"
          />
            <Button
            label="Admin"
            onClick={() => {
              localStorage.setItem('userType', '2');
              navigate('/admin-login-page');
            }}
            className="submit-button"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageTest;
