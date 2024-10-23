import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux-toolkit/authSlice';
import './signUp.css';

const LoginForm = ({ setBoxName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract loading and error states from Redux store
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const role = user?.role; // Get the user role from the user object

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch the loginUser action
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // Navigate based on the user's role after login
        if (role === "admin") {
          navigate('/admin');
        } else if (role === "staff") {
          navigate('/staff');
        } else if (role === "librarian") {
          navigate('/librarian');
        } else {
          alert('Invalid role detected');
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p className="error-message">{error}</p>} 

      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />

      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />

      <button type="submit" disabled={isLoading}> 
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <p>
        Don't have an account? 
        <span onClick={() => setBoxName('signup')}>
          <i> Sign Up</i>
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
