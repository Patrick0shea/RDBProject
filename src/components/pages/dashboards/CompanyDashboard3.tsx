import React from "react";
import { Routes, Route } from "react-router-dom";
import CompanyHomePage from "../HomePages/CompanyHomePage";

const CompanyDashboard: React.FC = () => {
  const renderRoutes = () => {
    try {
      return (
        <Routes>
          <Route path="/" element={<CompanyHomePage />} />
        </Routes>
      );
    } catch (error) {
      console.error("Error rendering company dashboard routes:", error);
      return <p style={{ color: "red" }}>Something went wrong while loading the dashboard.</p>;
    }
  };

  return (
    <div className="App">
      {renderRoutes()}
    </div>
  );
};

export default CompanyDashboard;
