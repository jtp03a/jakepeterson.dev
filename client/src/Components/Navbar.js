import React, { useContext }  from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { AuthContext } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

function Navbar () {
        const authContext = useContext(AuthContext);

        return (
            <nav className="nav" id="navbar p-0">
                <div className="col">
                <a class="navbar-brand ml-2" href="/" id="natasiabrand">Your Name Here</a>
                </div>
                <div className="col m-auto p-0 d-flex justify-content-center">
                    <ul className="nav-items">
                        <li className="nav-item mr-5" id="scrolllink">
                            <Link
                                activeClass="active"
                                to="section1"
                                spy={false}
                                smooth={true}
                                offset={-70}
                                duration={500}
                            >Home</Link>
                        </li>
                        <li className="nav-item mr-5" id="scrolllink">
                            <Link
                                activeClass="active"
                                to="section2"
                                spy={false}
                                smooth={true}
                                offset={-70}
                                duration={500}
                            >About</Link>
                        </li>
                        <li className="nav-item mr-5" id="scrolllink">
                            <Link
                                activeClass="active"
                                to="section3"
                                spy={false}
                                smooth={true}
                                offset={-70}
                                duration={500}
                            >My Work</Link>
                        </li>
                        <li className="nav-item mr-5" id="scrolllink">
                            <Link
                                activeClass="active"
                                to="section4"
                                spy={false}
                                smooth={true}
                                offset={-70}
                                duration={500}
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
                            >Blog</Link>
                        </li>
                    </ul>
                </div>
                <div className="col d-flex justify-content-end">
                    {authContext.isAuthenticated() ? (
                        <div>
                        <div>
                            <RouterLink to='/private' className="btn btn-sm btn-danger mt-2">Admin</RouterLink>
                        </div> 
                        <div>
                        <button className="btn btn-sm btn-danger mt-1" onClick={authContext.logout}>Logout</button>
                        </div>
                        </div>
                        ) : ("")}
                </div>
            </nav>
        );
}

export default Navbar;