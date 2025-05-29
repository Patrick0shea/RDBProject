import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../HomePages/UserHomePage';

const UserDashboard: React.FC = () => {
  const renderRoutes = () => {
    try {
      return (
        <Routes>
          <Route path="/" element={<UserHomePage />} />
        </Routes>
      );
    } catch (error) {
      console.error('Error rendering user dashboard routes:', error);
      return <p style={{ color: 'red' }}>Something went wrong while loading the user dashboard.</p>;
    }
  };

  return <div className="App">{renderRoutes()}</div>;
};

export default UserDashboard;
