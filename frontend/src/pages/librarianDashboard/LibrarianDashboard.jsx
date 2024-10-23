import { useNavigate } from 'react-router-dom';
import LibraryForm from '../../components/LibraryBook/LibraryForm';

const LibrarianDashboard = () => {

    const navigate = useNavigate();
      const handleLogout = () => {
        navigate('/'); 
      };
    
    return (
        <div>
        <nav className="custom-navbar">
        <h1>Librarian Dashboard</h1>
        <div className="nav-buttons">
          <button onClick={() =>navigate('/students')}>Students Details</button>
          <button onClick={() =>navigate('/library')}>Library History</button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

<LibraryForm/>
 
    </div >
  );
};
export default LibrarianDashboard;