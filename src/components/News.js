import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spin from './Spin';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });

    let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/${this.props.country}.json`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles || [],
      loading: false
    })
  }

  handelprevclick = () => {
    if (this.state.page <= 1) return;
    this.setState({ page: this.state.page - 1 });
  }

  handelnextclick = () => {
    const { page, articles } = this.state;
    const { pageSize } = this.props;
    const maxPages = Math.min(15, Math.ceil(articles.length / pageSize)); // Limit to 15 pages

    if (page >= maxPages) return;
    this.setState({ page: page + 1 });
  }

  render() {
    const { articles, loading, page } = this.state;
    const { pageSize } = this.props;

    // Slice articles manually for current page
    const displayedArticles = articles.slice((page - 1) * pageSize, page * pageSize);

    return (
      <div className="container my-3">
        <h2 className="text-center mb-4">Top Headlines</h2>

        {loading && <Spin />}

        <div className="row g-5">
          {!loading && displayedArticles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsitem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                url={element.urlToImage || "https://via.placeholder.com/300x200?text=No+Image"}
                newsurl={element.url}
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between my-4">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handelprevclick}
          >
            &larr; Previous
          </button>

          <button
            disabled={page >= Math.min(15, Math.ceil(articles.length / pageSize))}
            type="button"
            className="btn btn-dark"
            onClick={this.handelnextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}

export default News
