import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://chat-8qgf.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      navigate('/');
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create FitBot Account</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="auth-input" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="auth-input" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="auth-input" />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="auth-input" />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-link-text">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;