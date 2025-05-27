import { Link } from 'react-router-dom';

const Navbar3 = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/landing-page">Landing Page</Link></li>
        <li><Link to="/user-dashboard">User Dashboard</Link></li>
        <li><Link to="/company-dashboard">Company Dashboard</Link></li>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar3;
