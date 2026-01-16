import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Left from './components/Left';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import News from './components/News';
import NewsWrapper from './components/NewsWrapper'; // added for search

export default class App extends Component {
  apikey = "714321a7be654da99d3c8540a7f3357f"

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
          />
          <div className="d-flex">
            <Left />
            <div className="flex-grow-1 p-3">
              <Routes>
                {/* Existing category routes */}
                <Route path="/hola" element={<News setProgress={this.setProgress} key="general" pageSize={15} country="us" category="general" apiKey={this.apikey} />} />
                <Route path="/" element={<News setProgress={this.setProgress} key="general" pageSize={15} country="us" category="general" apiKey={this.apikey} />} />
                <Route path="/home" element={<News setProgress={this.setProgress} key="home" pageSize={15} country="us" category="general" apiKey={this.apikey} />} />
                <Route path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={15} country="us" category="business" apiKey={this.apikey} />} />
                <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={15} country="us" category="entertainment" apiKey={this.apikey} />} />
                <Route path="/general" element={<News setProgress={this.setProgress} key="general-nav" pageSize={15} country="us" category="general" apiKey={this.apikey} />} />
                <Route path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={15} country="us" category="health" apiKey={this.apikey} />} />
                <Route path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={15} country="us" category="science" apiKey={this.apikey} />} />
                <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={15} country="us" category="sports" apiKey={this.apikey} />} />
                <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={15} country="us" category="technology" apiKey={this.apikey} />} />

                {/* NEW: search route */}
                <Route path="/search/:query" element={<NewsWrapper setProgress={this.setProgress} pageSize={15} country="us" apiKey={this.apikey} />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </Router>
      </>
    );
  }
}
