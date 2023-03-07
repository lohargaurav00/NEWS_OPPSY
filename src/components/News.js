import React, { Component } from 'react'
import NewsItems from './NewsItems'
import NewsIMG from "./../NewsIMG.jpg"
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

  Capitalize = (word) =>{
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }

  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page : 1,
      totalResults: 0
  }
  document.title = `News-OPPSY-${this.Capitalize(this.props.category)}`;
}

  async newsUpdate(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ApiKey}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(50);
    this.setState({loading: true})
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.newsUpdate();
  }

  fetchMoreData= async() =>{
    this.setState({page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ApiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })

  }


  render() {
    return (
      <>
        <h1 className='text-center my-2' >NewsOPPSY - Top Headlines - {this.Capitalize(this.props.category)}</h1>
        {this.state.loading && <Loading/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading/>}
        >
          <div className="container">
            <div className="row">
            {this.state.articles.map((e)=>{
              return <div className="col-md-4 my-2 " key={e.url}>
                <NewsItems title={e.title?e.title:""} description={e.description?e.description:''} ImageUrl={e.urlToImage?e.urlToImage:NewsIMG} NewsUrl={e.url} author={e.author?e.author:"Unknown"} date={new Date(e.publishedAt).toUTCString()}/>
              </div>
            })}
            </div>
          </div> 
        </InfiniteScroll>
      </>
    )
  }
}
