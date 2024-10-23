import { useNavigate } from 'react-router-dom';
import FeesForm from '../../components/Fees/FeesForm';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div>
        <nav className="custom-navbar">
        <h1>Office Staff Dashboard</h1>
        <div className="nav-buttons">
          <button onClick={() =>navigate('/students')}>Students Details</button>
          <button onClick={() =>navigate('/fees')}>Fees History</button>
          <button onClick={() =>navigate('/library')}>Library History</button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
<FeesForm/>
    
    </div >
  );
};

export default StaffDashboard;
