import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar3";
import UserDashboard from "./UserDashboard3";
import AdminDashboard from "./AdminDashboard3";
import LoginPage from "./LoginPage";
import CompanyHomePage from "./CompanyHomePage"; // 🆕

const CompanyDashboard3: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/company-dashboard" element={<CompanyHomePage />} /> {/* ✅ fixed */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default CompanyDashboard3;
