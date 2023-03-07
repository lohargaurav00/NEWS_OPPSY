import React, { Component } from "react";

export default class NewsItems extends Component {
  render() {

    let {title, description, ImageUrl, NewsUrl, author, date} = this.props

    return (
        <div className="card">
          <img src={ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> {title} </h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By <strong>{author}</strong>, on <strong>{date}</strong> </small></p>
            <a href={NewsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
    );
  }
}
