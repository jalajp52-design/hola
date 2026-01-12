// Left.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './download.jpg'
const Left = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark" style={{width: '250px', height: '300vh'}}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none">
        <span className="fs-4">NewsApp</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/home" className="nav-link active" aria-current="page">
            Home
          </Link>
        </li>
        <li>
          <Link to="/business" className="nav-link text-light">
            Business
          </Link>
        </li>
        <li>
          <Link to="/sports" className="nav-link text-light">
            Sports
          </Link>
        </li>
        <li>
          <Link to="/technology" className="nav-link text-light">
            Technology
          </Link>
        </li>
        <li>
          <Link to="/entertainment" className="nav-link text-light">
            Entertainment
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-light text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={logo}
            
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Admin</strong>
        </a>
        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Left;
