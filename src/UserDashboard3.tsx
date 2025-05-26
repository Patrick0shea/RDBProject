import { useState } from 'react';
import Navbar from './components/Navbar3';
import RankingBlock from './RankingBlock';
import CompanyDashboard from './CompanyDashboard3';
import AdminDashboard from './AdminDashboard3';
import LoginPage from './LoginPage';
import { Route, Routes } from 'react-router-dom';

interface Company {
  id: number;
  title: string;
}

interface RankMap {
  [key: number]: number | '';
}

function UserDashboard3() {
  const companies: Company[] = [
    { id: 1, title: "Amazon Web Services" },
    { id: 2, title: "Shannonside Capital" },
    { id: 3, title: "Intercome" },
    { id: 4, title: "Transact" },
    { id: 5, title: "Stripe" },
  ];

  const [ranks, setRanks] = useState<RankMap>({});

  const handleRankChange = (id: number, newRank: number | '') => {
    setRanks((prev) => ({ ...prev, [id]: newRank }));
  };

  const handleSubmit = () => {
    const rankedCompanies = companies.map((company) => ({
      company: company.title,
      rank: ranks[company.id] || null,
    }));
    console.log("User Rankings:", rankedCompanies);
    alert(JSON.stringify(rankedCompanies, null, 2));
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      {companies.map((company) => (
        <RankingBlock
          key={company.id}
          id={company.id}
          title={company.title}
          info1={`Location: ${company.title === 'Transact' ? 'Limerick' : 'Dublin'}`}
          info2={`Salary: €${2500 + company.id * 100}/month`}
          info3={`No. of Days in Office: ${company.id % 3}`}
          dropdownContent={<p>{company.title} mate</p>}
          rank={ranks[company.id]}
          onRankChange={handleRankChange}
        />
      ))}

      <button className="submit-button" onClick={handleSubmit}>
        Submit Rankings
      </button>
    </div>
  );
}

export default UserDashboard3;
