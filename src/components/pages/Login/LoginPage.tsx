import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../forms/LoginForm';

const UserLoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <LoginForm
      title="User Login"
      endpoint="login"
      userType="0"
      onSuccess={() => navigate('/user-dashboard')}
    />
  );
};

export default UserLoginPage;
