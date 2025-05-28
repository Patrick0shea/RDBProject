import { Link } from 'react-router-dom';

const Navbar3 = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/landing-page">Landing Page</Link></li>
        <li><Link to="/user-dashboard">User Dashboard</Link></li>
        <li><Link to="/company-dashboard">Company Dashboard</Link></li>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        <li><Link to="/acc-login-page">Acc Login Page</Link></li>
        <li><Link to="/admin-dashboard">Admin dashboard</Link></li>
        <li><Link to="/admin-login-page">Admin Login Page</Link></li>

        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar3;
