import React, { useEffect, useContext } from 'react';
import Blog from "./Blog";
import dummyText from "../dummytext";
import Landing from './Landing';
import Contact from './Contact';
import Portfolio from './Portfolio';
import About from './About'
import { Link as RouterLink } from 'react-router-dom';
import { HomeContext } from '../context/HomeContext'
import Navbar from './Navbar'

function Home() {
  const homeContext = useContext(HomeContext)

  useEffect(() => {
    homeContext.setHome();
  }, []);

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
        title="Experience"
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
        <RouterLink to='/Login' className="pl-1 pr-1 mb-1 adminLink">Admin</RouterLink>
      </div>
      <div className="siteInfo d-flex flex-column">
        <div className="d-flex justify-content-center pl-1 pr-2 mb-0">
          <p className="footerText">This site is built with the MERN stack, uses Gitlab for CI/CD, and
          is deployed in a self-hosted Microk8s cluster</p>
          </div>
        <div className="d-flex justify-content-center pl-1 pr-2 pb-0 mb-0">
          <p className="footerText">Background image photo by Eberhard Grossgasteiger from <a href="https://www.pexels.com/photo/mountain-under-starry-sky-1624504/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels">Pexels</a></p>
        </div>
      </div>
    </div>
  )
}

export default Home;
