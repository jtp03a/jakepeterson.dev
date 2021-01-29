import React from "react";
import Blog from "./Blog";
import dummyText from "../dummytext";
import Landing from './Landing';
import Contact from './Contact';
import Portfolio from './Portfolio';
import About from './About'
import { Link as RouterLink } from 'react-router-dom';

function Home() {
    return (
        <div>
          <Landing
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
          <div className="d-flex justify-content-center">
            <RouterLink to='/Login'>Admin</RouterLink>
          </div>
        </div>
    )
}

export default Home;