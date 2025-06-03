import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CompanyHomePage from "../HomePages/CompanyHomePage";

// Class component is needed to catch rendering errors via error boundaries
class RouteErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error rendering routes:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p style={{ color: "red" }}>Something went wrong while loading the dashboard.</p>;
    }

    return this.props.children;
  }
}

const CompanyDashboard: React.FC = () => {
  return (
    <div className="App">
      <RouteErrorBoundary>
        <Routes>
          <Route path="/" element={<CompanyHomePage />} />
        </Routes>
      </RouteErrorBoundary>
    </div>
  );
};

export default CompanyDashboard;
