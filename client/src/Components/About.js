import React from "react";
import portrait from "../Images/portrait.jpg";

function About(props) {
    return (
        <div className="section section-light" >
            <div className="section-content" id={props.id}>
                <div className='card'>
                    <div id="cardHeader" className='card-header'>
                        <h1>{props.title}</h1>
                    </div>
                    <div className='card-body' id="cardBody">
                    <img className="img-fluid float-left mr-3" src={portrait} alt="portrait" height="400" width="400" rounded />
                    {props.subtitle}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;