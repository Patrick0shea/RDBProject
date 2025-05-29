import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../forms/LoginForm';

const CompanyLogin: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LoginForm
      title="Company Login"
      endpoint="company-login"
      userType="1"
      onSuccess={() => navigate('/company-dashboard')}
    />
  );
};

export { CompanyLogin }; // 👈 named export
export default CompanyLogin; // 👈 optional: keep if you're importing it as default
