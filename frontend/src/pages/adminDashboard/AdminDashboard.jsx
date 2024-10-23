import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StudentsForm from '../../components/Students/StudentsForm';

const AdminDashboardNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); 

  const handleLogout = () => {
    navigate('/'); 
  };

   const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
    
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div>
      <nav className="custom-navbar">
        <h1>Admin Dashboard</h1>
        <div className="nav-buttons">
          <button onClick={() =>navigate('/staff')}>Office Staff Accounts</button>
          <button onClick={() =>navigate('/librarian')}>Librarian Accounts</button>

          {/* Dropdown for History */}
          <div className="dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropdown-btn">
              History
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                <button onClick={() => navigate('/students')}>Students Details</button>
                <button onClick={() =>navigate('/library')}>Library History</button>
                <button onClick={() => navigate('/fees')}>Fees History</button>
              </div>
            )}
          </div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
       
       <StudentsForm/>

    </div>
  );
};

export default AdminDashboardNavbar;
