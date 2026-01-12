import React, { Component } from 'react'

export class Newsitem extends Component {

  render() {
    let { title, description, url, newsurl } = this.props;

    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={url || "https://corporate.exxonmobil.com/-/media/global/icons/logos/em-default-img-2880-1620.png"}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsurl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
