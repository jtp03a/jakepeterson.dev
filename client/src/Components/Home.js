import React from "react";



function Home(props) {

    return (
        <div className="section" id="homesection">
            <div className="section-content" id={props.id}>
                <div className="container p-2 rounded" id="quotecontainer">
                    <h2 className="p-2" id="quote">"Language is to the mind more than light is to the eye." - William Gibson</h2>
                </div>
            </div>
        </div>
    );

}

export default Home;