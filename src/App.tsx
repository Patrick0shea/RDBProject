// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar3';
import LoginPage from './LoginPage';
import UserDashboard from './UserDashboard3';
import CompanyDashboard from './CompanyDashboard3';
import AdminDashboard3 from './AdminDashboard3';
import LandingPage from './LandingPage';
import { CompanyLogin } from './CompanyLogin';
import AccLoginPage from './components/AccLoginPage';
import AdminLoginPage from './AdminLoginPage';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;