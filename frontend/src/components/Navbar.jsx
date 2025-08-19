import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="container" style={styles.container}>
        <Link to={isAuthenticated ? "/" : "/login"} style={styles.brand}>
          Student Manager
        </Link>
        <div style={styles.navLinks}>
          {isAuthenticated ? (
            <>
              <Link to="/" style={styles.navLink}>All Students</Link>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/register" style={styles.navLink}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// ... your styles object remains the same
const styles = {
  navbar: {
    backgroundColor: '#4361ee',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: '600',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  navLink: {
    color: 'rgba(255,255,255,0.85)',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
};


export default Navbar;