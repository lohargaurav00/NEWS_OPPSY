import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0
  }
  pageSize = 12
  ApiKey = process.env.REACT_APP_API_KEY

  setProgress=(progress)=>{
    this.setState({progress: progress})
  }


  render() {
    return (
      <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />
        <Navbar />
        <Routes>
          <Route exact path="/business" element={<News ApiKey={this.ApiKey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" />} />

          <Route exact path="/entertainment" element={<News ApiKey={this.ApiKey} setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />

          <Route exact path="/" element={<News ApiKey={this.ApiKey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />

          <Route exact path="/health" element={<News ApiKey={this.ApiKey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />

          <Route exact path="/science" element={<News ApiKey={this.ApiKey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />

          <Route exact path="/sports" element={<News ApiKey={this.ApiKey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />

          <Route exact path="/technology" element={<News ApiKey={this.ApiKey} setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
        </Routes>
      </Router>
    );
  }
}
