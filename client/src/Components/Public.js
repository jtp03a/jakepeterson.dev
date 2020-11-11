import React from "react";
import Navbar from "./Navbar";
import Blog from "./Blog";
import dummyText from "../dummytext";
import Home from './Home';
import Contact from './Contact';
import Portfolio from './Portfolio';
import About from './About'

function Public() {
    return (
        <div>
            <Navbar />
          <Home
            title=""
            id="section1"
          />
          <About
            title="About"
            subtitle={dummyText}
            id="section2"
          />
          <Portfolio
            title="My Work"
            id="section3"
          />
          <Contact
            title="Contact Me"
            id="section4"
          />
          <Blog
            title="Blog"
            subtitle={dummyText}
            id="section5"
          />
        </div>
    )
}

export default Public;