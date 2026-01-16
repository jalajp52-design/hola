import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { query } = this.state;
    if (query.trim() !== '') {
      this.props.navigate(`/search/${query}`);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">news jj</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/general">General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>

            <form className="d-flex" role="search" onSubmit={this.handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.query}
                onChange={this.handleInputChange}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

          </div>
        </div>
      </nav>
    );
  }
}

// Wrap to use navigate
export default function NavbarWithNavigate(props) {
  const navigate = useNavigate();
  return <Navbar {...props} navigate={navigate} />;
}
