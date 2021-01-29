import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Book1 from '../Images/Book1.png'
import Book2 from '../Images/Book2.png'
import Book3 from '../Images/Book3.png'

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
                        {/* Add or remove carousel.item blocks depending on how many work items you want to show in this section  */}
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={Book1}
                                alt="First slide"
                                height="700px"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={Book2}
                                alt="Second slide"
                                height="700px"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={Book3}
                                alt="Third slide"
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