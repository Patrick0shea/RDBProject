import React from "react";
import { Routes, Route } from "react-router-dom";
import CompanyHomePage from "../HomePages/CompanyHomePage";

const CompanyDashboard: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CompanyHomePage />} />
      </Routes>
    </div>
  );
};

export default CompanyDashboard;
