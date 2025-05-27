import React from "react";
import { Routes, Route } from "react-router-dom";
import CompanyHomePage from "./CompanyHomePage";

const CompanyDashboard3: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {/* Relative path: this matches exactly /company-dashboard */}
        <Route path="/" element={<CompanyHomePage />} />
      </Routes>
    </div>
  );
};

export default CompanyDashboard3;
