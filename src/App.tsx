import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';// Page Navigartion using React Router
import Navbar from './components/shared/Navbar3';

// Pages and dashboards for different types of users:
import LoginPage from './components/pages/Login/LoginPage';
import UserDashboard from './components/pages/dashboards/UserDashboard3';
import CompanyDashboard from './components/pages/dashboards/CompanyDashboard3';
import AdminDashboard3 from './components/pages/dashboards/AdminDashboard3';
import LandingPage from './components/pages/LandingPage';
import { CompanyLogin } from './components/pages/Login/CompanyLogin';
import AccLoginPage from './components/pages/Login/AccLoginPage';
import { AdminLogin } from './components/pages/Login/AdminLogin';

// ErrorBoundary is a custom wrapper that catches runtime errors in children components
import ErrorBoundary from './components/shared/ErrorBoundary'; // Provides graceful error fallback UI

/**
 * App Component
 *
 * This is the root component of your React app
 * It sets up the navigation using React Router and handles page-level routing between components
 * 
 * It also wraps the entire app inside an ErrorBoundary to catch any rendering errors
 * and prevent the app from crashing
 */
function App() {
  return (
    // BrowserRouter: Enables routing using the browser's address bar
    <Router>
      {/* ErrorBoundary: Catches JavaScript errors in any child components and shows fallback UI */}
      <ErrorBoundary>
        {<Navbar />}

        {/* Routes: This is where all the routes in the application are defined */}
        <Routes>
          {/* Route: When user navigates to /landing-page, render LandingPage component */}
          <Route path="/landing-page" element={<LandingPage />} />

          {/* Route for individual user login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for company login */}
          <Route path="/company-login" element={<CompanyLogin />} />

          {/* Route for user dashboard (can include nested routes via wildcard `*`) */}
          <Route path="/user-dashboard/*" element={<UserDashboard />} />

          {/* Route for company dashboard */}
          <Route path="/company-dashboard/*" element={<CompanyDashboard />} />

          {/* Route for account login */}
          <Route path="/acc-login-page" element={<AccLoginPage />} />

          {/* Admin login */}
          <Route path="/admin-login-page" element={<AdminLogin />} />

          {/* Admin dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard3 />} />

          {/* Fallback route — catches any unrecognized paths and routes to LandingPage */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
