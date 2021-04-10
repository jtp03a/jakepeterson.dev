import React from "react";

function Landing(props) {

    return (
        <div className="section d-flex h-100 justify-content-center" id="homesection">

            <div className="section-content" id={props.id}>
                <div className="container p-2 rounded quotecontainer">
                    <h2 className="p-2" id="quote">I Love Natasia.</h2>
                </div>
            </div>
            <div className="siteInfo">
            <p className="pl-1 pr-2 mb-0">This site is built with the MERN stack, uses Gitlab for CI/CD, and is deployed in a GKE cluster</p>
            <p className="pl-1 pr-2 pb-0 mb-0">Background image photo by Eberhard Grossgasteiger from <a href="https://www.pexels.com/photo/mountain-under-starry-sky-1624504/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Pexels</a></p>
            </div>
        </div>

    );

}

export default Landing;
