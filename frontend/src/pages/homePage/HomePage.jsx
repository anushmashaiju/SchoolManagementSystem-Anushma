import { useState } from 'react';
import LoginForm from '../../components/signUp/loginForm';
import RegisterForm from '../../components/signUp/registerForm'; 

const HomePage = () => {
  const [boxName, setBoxName] = useState('login');

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Welcome to the School Management System</h1>
      {boxName === 'login' && <LoginForm setBoxName={setBoxName} />}
      {boxName === 'signup' && <RegisterForm setBoxName={setBoxName} />}
    </div>
  );
};

export default HomePage;
