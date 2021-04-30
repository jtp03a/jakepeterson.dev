import React, { useContext, useEffect } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { AuthContext } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { HomeContext } from '../context/HomeContext'
import GHLogo from '../Images/GitHubLogo.png'
import CWLogo from '../Images/codewars.png'

function Navbar() {
    const authContext = useContext(AuthContext);
    const homeContext = useContext(HomeContext)

    const toTop = () => {
        scroll.scrollToTop();
    };

    return (
        <nav className="navbar navbar-expand-xl nav navbar-dark" id="navbar">
            <div id='brandCol'>
                <a className="navbar-brand ml-2" href="/" id="mainBrand">Jake Peterson</a>
            </div>
            <button id="collapseBtn" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topNavBar" aria-controls="topNavBar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="topNavBar">
                {homeContext.isHome() ? (
                    <div id="navLinks">
                    <ul className="navbar-nav" id="navBarUl">
                        <li className="nav-item" id="scrolllink">
                            <a className="nav-link" onClick={toTop}>Home</a>
                        </li>
                        <li className="nav-item" id="scrolllink">
                            <Link
                                activeClass="active"
                                to="section2"
                                spy={false}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="nav-link"
                            >About</Link>
                        </li>
                        <li className="nav-item" id="scrolllink">
                            <Link
                                activeClass="active"
                                to="section3"
                                spy={false}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="nav-link"
                            >Experience</Link>
                        </li>
                        <li className="nav-item" id="scrolllink">
                            <Link
                                activeClass="active"
                                to="section4"
                                spy={false}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="nav-link"
                            >Contact</Link>

                        </li>
                        <li className="nav-item" id="scrolllink">
                            <Link
                                activeClass="active"
                                to="section5"
                                spy={false}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="nav-link"
                            >Blog</Link>
                        </li>
                    </ul>
                    </div>
                ) : ("")}
                <div id="endContent pl-2">
                    <div className="endItems">
                    <a href="https://github.com/jtp03a"><img  src={GHLogo} /></a>
                    <a className="ml-1" href="https://www.codewars.com/users/jtp03a"><img  src={CWLogo} /></a>
                    </div>
                    {authContext.isAuthenticated() ? (
                        <div className="endItems">
                        <div>
                            <RouterLink to='/private' className="btn btn-sm btn-danger mt-2">Admin</RouterLink>
                        </div> 
                        <div>
                        <button className="btn btn-sm btn-danger mt-1" onClick={authContext.logout}>Logout</button>
                        </div>
                        </div>
                        ) : ("")}
            </div>
            </div>
            
        </nav>
    );
}

export default Navbar;
