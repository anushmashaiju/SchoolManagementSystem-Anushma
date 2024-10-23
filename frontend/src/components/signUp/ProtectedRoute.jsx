import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // If the user's role is not allowed, redirect to unauthorized page or home
    return <Navigate to="/" />; 
  }

  return children; // If authenticated and authorized, render the children
};

export default ProtectedRoute;
