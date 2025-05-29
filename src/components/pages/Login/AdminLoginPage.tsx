import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../forms/LoginForm';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LoginForm
      title="Admin Login"
      endpoint="admin-login"
      userType="2"
      onSuccess={() => navigate('/admin-dashboard')}
    />
  );
};

export default AdminLoginPage;
