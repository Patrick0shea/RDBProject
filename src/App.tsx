// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar3';
import LoginPage from './LoginPage';
import UserDashboard from './UserDashboard3';
import CompanyDashboard from './CompanyDashboard3';
import AdminDashboard from './AdminDashboard3';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-dashboard/*" element={<UserDashboard />} />
        <Route path="/company-dashboard/*" element={<CompanyDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;