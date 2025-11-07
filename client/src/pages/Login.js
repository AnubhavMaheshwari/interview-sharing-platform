import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Interview Hub</h1>
        <p>Share your interview experiences and help others succeed!</p>
        
        <button onClick={login} className="google-login-btn">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Sign in with Google
        </button>
        
        <div className="features">
          <div className="feature">
            <span className="icon">📝</span>
            <p>Share your interview experiences</p>
          </div>
          <div className="feature">
            <span className="icon">👥</span>
            <p>Learn from others' experiences</p>
          </div>
          <div className="feature">
            <span className="icon">🎯</span>
            <p>Prepare better for interviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;