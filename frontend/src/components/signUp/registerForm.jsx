import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux-toolkit/authSlice';
import './signUp.css';

const RegisterForm = ({ setBoxName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  
    try {
      const resultAction = await dispatch(registerUser({ email, password })).unwrap();
      console.log(resultAction);
      navigate('/');
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed: " + err);
    }
  };
  
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Register</h2>

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

      <input 
        type="password" 
        name="confirmPassword" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required 
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>

      <p>
        Already have an account? 
        <span onClick={() => setBoxName('login')} style={{ cursor: 'pointer', color: 'blue' }}> 
          <i>Login</i>
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
