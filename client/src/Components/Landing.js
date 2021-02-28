import React from "react";

function Landing(props) {

    return (
        <div className="section d-flex h-100" id="homesection">
            <div className="container">
                <div className="row">
                    <div className="section-content" id={props.id}>
                        <div className="container p-2 rounded quotecontainer">
                            <h2 className="p-2" id="quote">I am a Developer.</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div id="siteBox">
                        <p className="pl-1 pr-2" id="siteInfo">This site is built with the MERN stack, uses Gitlab for CI/CD, and is deployed in a GKE cluster</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Landing;