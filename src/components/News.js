import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spin from './Spin';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import './news.css';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 15,
    category: 'general',
    searchQuery: '',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func,
    searchQuery: PropTypes.string,
    apiKey: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResult: 0
    }
    document.title = `${this.props.category}-news jj`;
  }

  async update(pageNo = 1) {
    this.props.setProgress(10);
    this.setState({ loading: true });

    let url = '';
    if (this.props.searchQuery && this.props.searchQuery.trim() !== '') {
      url = `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&pageSize=${this.props.pageSize}&page=${pageNo}&apiKey=${this.props.apiKey}`;
    } else {
      url = `https://saurav.tech/NewsAPI/top-headlines/category/${this.props.category}/${this.props.country}.json`;
    }

    try {
      let data = await fetch(url);
      this.props.setProgress(50);
      let parsedData = await data.json();
      const articles = parsedData.articles || [];

      this.setState({
        articles: articles,
        loading: false,
        page: pageNo,
        totalResult: parsedData.totalResults || articles.length
      });

    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, articles: [], totalResult: 0 });
    }

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
    const { page, articles } = this.state;
    const nextPage = page + 1;
    const { pageSize, category, country, searchQuery, apiKey } = this.props;

    let url = '';
    if (searchQuery && searchQuery.trim() !== '') {
      url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&page=${nextPage}&apiKey=${apiKey}`;
    } else {
      url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/${country}.json`;
    }

    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      const newArticles = parsedData.articles || [];

      this.setState({
        articles: articles.concat(newArticles),
        page: nextPage,
        totalResult: parsedData.totalResults || articles.length + newArticles.length
      });
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  }

  render() {
    const { articles, loading, page, totalResult } = this.state;
    const { pageSize, searchQuery } = this.props;

    const displayedArticles = articles.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Top Headlines'}
        </h2>

        {/* ✅ Spinner disabled for search */}
        {loading && !searchQuery && <Spin />}

        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResult && !loading}
          loader={searchQuery ? null : <Spin />} 
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
