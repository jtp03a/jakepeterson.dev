import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Dreadlands from '../Images/dreadlands.jpg'

function Portfolio(props) {
        return (
            <div className="section section-light">
                <div className="section-content" id={props.id}>
                    <div className="card m-auto" id="portfolioCard">
                        <div className="card-header" id="cardHeader">
                        <h1>{props.title}</h1>
                        </div>
                        <div className="card-body">
                        <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={Dreadlands}
                                alt="First slide"
                                height="700px"
                            />
                        </Carousel.Item>
                    </Carousel>
                        </div>
                    </div>
                    
                  
                    
                </div>
            </div>
        );
}

export default Portfolio;