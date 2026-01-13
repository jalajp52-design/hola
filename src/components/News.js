import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spin from './Spin';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import './news.css';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 15, // Updated to your requested 15
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      scrollLoading: false,
      page: 1,
      totalResult: 0
    }
    document.title = `${this.props.category}-news jj`;
  }

  async update(pageNo) {
    this.props.setProgress(10);
    this.setState({ loading: true });

    let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/${this.props.country}.json`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles || [],
      loading: false,
      page: pageNo,
      totalResult: parsedData.totalResults || (parsedData.articles ? parsedData.articles.length : 0)
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.update(1);
  }

  handelprevclick = () => {
    if (this.state.page <= 1) return;
    this.update(this.state.page - 1);
  }

  handelnextclick = () => {
    const { page, totalResult } = this.state;
    const { pageSize } = this.props;
    if (page >= Math.ceil(totalResult / pageSize)) return;
    this.update(this.state.page + 1);
  }

  fetchMoreData = async () => {
    // Note: Saurav.tech is static, so we append the same data to simulate growth
    let url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/${this.props.country}.json`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles || []),
      totalResult: parsedData.totalResults || (parsedData.articles ? parsedData.articles.length : 0)
    });
  }

  render() {
    const { articles, loading, page, totalResult } = this.state;
    const { pageSize } = this.props;

    // Filter to show 15 per page
    const displayedArticles = articles.slice((page - 1) * pageSize, page * pageSize);

    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>Top Headlines</h2>
        
        {loading && <Spin />}

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResult}
          loader={<Spin />}
          // FIX: This prevents the cards from being cut off by the container
          style={{ overflow: 'visible' }} 
        >
          <div className="container">
            <div className="row g-5">
              {displayedArticles.map((element, index) => (
                <div className="col-md-4" key={`${element.url}-${index}`}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    url={element.urlToImage || "https://picsum.photos/300/200"}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>

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
            disabled={page >= Math.ceil(totalResult / pageSize)}
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

export default News;