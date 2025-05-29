import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../HomePages/UserHomePage';

const UserDashboard = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<UserHomePage />} />
    </Routes>
  </div>
);

export default UserDashboard;
