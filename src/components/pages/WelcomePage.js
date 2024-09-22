import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-4 border-0 rounded-3 text-center" style={{ width: '400px' }}>
        <h2 className="mb-4 text-primary fw-bold">Welcome to Our Service</h2>
        <p className="mb-4 text-muted">Please log in or sign up to continue</p>

        <div className="d-grid gap-3">
          {/* Login Options */}
          <Link to="/login" className="btn btn-primary btn-lg">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-outline-secondary btn-lg">
            Sign Up
          </Link>

          {/* Role-Based Logins */}
          <div className="dropdown mt-3">
            <button className="btn btn-info dropdown-toggle" type="button" id="roleDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Login as
            </button>
            <ul className="dropdown-menu" aria-labelledby="roleDropdown">
              <li><Link to="/login/admin" className="dropdown-item">Admin</Link></li>
              <li><Link to="/login/moderator" className="dropdown-item">Moderator</Link></li>
              <li><Link to="/login/customer" className="dropdown-item">Customer</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
