import React from "react";

export default function NewsBox(props){
    return (
        <>
            <div className="newsbox-image">
                <img src={props.newsimage?props.newsimage:"noimage.png"} alt="Image Unavailable" className='newsimg'/>
            </div>
            <div className="newsbox-content">
                <h3>{props.newstitle}</h3>
                <p>{props.newsdescription?.substring(0,100)+" ..."}
                    <a href={props.newslink} target="_blank" className="readmore-link">Read more</a></p>
                <p className="author-name">Author: {props.newsauthor?props.newsauthor:"unknown"}</p>
                <p className="date-published">{props.newspublisheddate}</p>
            </div>
        </>
    )
};
