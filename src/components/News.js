import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Proptypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country:'in',
    category:'general',

  }
  static propTypes={
    country: Proptypes.string,
    category: Proptypes.string
  }
  /*setting state in constructor*/
  constructor() {
    super();
    console.log("Hello im a constructor");
    this.state={
      articles:[],
      loading:false,
      page:1,
      
      };
  }
  async componentDidMount() {
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0355ffd9f33a4f0e8d23cb7ac257a85b`; 
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles});
  }
  handlePreviousClick = async () => {
    if (this.state.page > 1) {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0355ffd9f33a4f0e8d23cb7ac257a85b&page=${this.state.page - 1}`;
      const data = await fetch(url);
      const parsedData = await data.json();
  
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
      });
    }
  };
  
  
  handleNextClick = async ()=>{
    console.log("Next");
  
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0355ffd9f33a4f0e8d23cb7ac257a85b&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    
          
    this.setState({
      page:this.state.page + 1,
      articles: parsedData.articles
    })
  }
  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center">News Monkey-Top Headlines</h1>
      

        <div className="row">
  {this.state.articles && this.state.articles.map((element) => {
    return (
      <div className="col-md-3" key={element.url}>
        <NewsItem
          title={element.title ? element.title : ""}
          description={element.description ? element.description : ""}
          imageUrl={element.urlToImage}
          newsUrl={element.url}
          author={element.author}
          Date={element.publishedAt}
        />
      </div>
    );
  })}
</div>

        <div className="container  d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark"onClick={this.handleNextClick}> Next&rarr;</button> 
        </div>
      </div>
    );
  }
}



export default News;
