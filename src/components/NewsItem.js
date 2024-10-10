// import React, { Component } from 'react'
import {Link} from 'react-router-dom'
const NewsItem = (props)=> {

    
        let {title,description,url,moreurl,author,date,source}=props;
        return (
            <div>
                <div className="card" >
                    <img src={url} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}<span className="badge badge-light bg-dark mx-2">{source}</span></h5>
                        <p className="card-text">{description}</p>

                        <div className="my-2"><p className="card-text"><small className="text-muted">Published by {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p></div>
                        <Link target="_blank" to={moreurl} className="btn btn-sm btn-primary">Read more</Link>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
