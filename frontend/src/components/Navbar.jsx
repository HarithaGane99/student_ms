import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar" style={styles.navbar}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.brand}>
          Student Manager
        </Link>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>
            All Students
          </Link>
          <Link to="/add" style={styles.navLink}>
            Add Student
          </Link>
        </div>
      </div>
    </nav>
  );
};

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