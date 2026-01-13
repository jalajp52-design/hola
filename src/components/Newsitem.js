import React, { Component } from 'react'
import './newsitem.css'
export class Newsitem extends Component {

  render() {
    let { title, description, url, newsurl ,author,date,source} = this.props;

    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={url || "https://corporate.exxonmobil.com/-/media/global/icons/logos/em-default-img-2880-1620.png"}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
  {title}...
  <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {source} 
  
  </div>
</h5>
            <p className="card-text">{description}...</p>
                <p class="card-text"><small class="text-muted">By  By {author ? author : "Unknown"} | Last updated{" "}
                {date ? new Date(date).toGMTString() : "N/A"} </small></p>

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
