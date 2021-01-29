import React from "react";



function Landing(props) {

    return (
        <div className="section d-flex" id="homesection">
            <div className="section-content m-auto" id={props.id}>
                <div className="container p-2 rounded" id="quotecontainer">
                    <h2 className="p-2" id="quote">"Your favorite quote or some other message here" - Some Person</h2>
                </div>
            </div>
        </div>
    );

}

export default Landing;