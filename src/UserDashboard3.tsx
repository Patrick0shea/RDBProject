import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHomePage from "./UserHomePage";

const UserDashboard3: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Relative path: this matches exactly /user-dashboard */}
        <Route path="/" element={<UserHomePage />} />
      </Routes>
    </div>
  );
};

export default UserDashboard3;
