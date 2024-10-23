import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import StaffDashboard from './pages/staffDashboard/StaffDashboard';
import LibrarianDashboard from './pages/librarianDashboard/LibrarianDashboard';
import StudentsDetails from './pages/adminDashboard/StudentsDetails';
import FeesHistory from './pages/staffDashboard/FeesHistory';
import LibraryHistory from './pages/librarianDashboard/LibraryHistory';
import ProtectedRoute from './components/signUp/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={['staff','admin']}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/librarian"
          element={
            <ProtectedRoute allowedRoles={['librarian','admin']}>
              <LibrarianDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Other Routes */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={['admin','librarian','staff']}>
              <StudentsDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees"
          element={
            <ProtectedRoute allowedRoles={['staff','admin']}>
              <FeesHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute allowedRoles={['librarian','admin','staff']}>
              <LibraryHistory />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
};

export default App;
