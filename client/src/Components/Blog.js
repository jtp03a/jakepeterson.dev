import React, { Component } from "react";

function Blog (props) {
   
        return (
            <div className="section + section-light">
                <div className="section-content" id={props.id}>
                <div className='card'>
                    <div id="cardHeader" className='card-header'>
                        <h1>{props.title}</h1>
                    </div>
                    <div className='card-body' id="cardBody">
                    Coming Soon!
                   
                    </div>
                </div>
                </div>
            </div>
        );
    
}

export default Blog;