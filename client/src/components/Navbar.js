import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          📝 Interview Hub
        </Link>
        
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          
          {user ? (
            <>
              <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
              <li><Link to="/create-interview" onClick={closeMenu}>Share Interview</Link></li>
              <li className="navbar-user">
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <span>{user.name}</span>
              </li>
              <li>
                <button onClick={() => { logout(); closeMenu(); }} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login" className="btn-login" onClick={closeMenu}>Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;