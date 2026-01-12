import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 mt-5">
      <div className="container">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5>NewsApp</h5>
            <p className="text-muted">
              Latest headlines from around the world. Stay informed, stay updated.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none">Business</a></li>
              <li><a href="#" className="text-light text-decoration-none">Sports</a></li>
              <li><a href="#" className="text-light text-decoration-none">Technology</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p className="mb-1">Email: jalajsaras@gmail.com</p>
            <p>Phone: +91 8849493211</p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center pb-3">
          <small>© 2026 NewsApp. All Rights Reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
