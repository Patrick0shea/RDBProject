import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar3';
import LoginPage from './components/pages/Login/LoginPage';
import UserDashboard from './components/pages/dashboards/UserDashboard3';
import CompanyDashboard from './components/pages/dashboards/CompanyDashboard3';
import AdminDashboard3 from './components/pages/dashboards/AdminDashboard3';
import LandingPage from './components/pages/LandingPage';
import { CompanyLogin } from './components/pages/Login/CompanyLogin';
import AccLoginPage from './components/pages/Login/AccLoginPage';
import AdminLoginPage from './components/pages/Login/AdminLoginPage';
import ErrorBoundary from './components/shared/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/user-dashboard/*" element={<UserDashboard />} />
          <Route path="/company-dashboard/*" element={<CompanyDashboard />} />
          <Route path="/acc-login-page" element={<AccLoginPage />} />
          <Route path="/admin-login-page" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard3" element={<AdminDashboard3 />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
