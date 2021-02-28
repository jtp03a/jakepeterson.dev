import React, { useContext, useEffect }  from "react";
import { Link, animateScroll as scroll} from "react-scroll";
import { AuthContext } from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { HomeContext } from '../context/HomeContext'
import GHLogo from '../Images/GitHubLogo.png'
import CWLogo from '../Images/codewars.png'

function Navbar () {
        const authContext = useContext(AuthContext);
        const homeContext = useContext(HomeContext)

        const toTop = () => {
            scroll.scrollToTop();
        };

        return (
            <nav className="nav" id="navbar p-0">
                <div className="col pb-1">
                <a class="navbar-brand ml-2" href="/" id="mainBrand">Jake Peterson</a>
                </div>
                <div className="col m-auto p-0 d-flex justify-content-center">
                    {homeContext.isHome() ? (
                    <ul className="nav-items">
                        <li className="nav-item mr-5" id="scrolllink">
                            <a onClick={toTop}>Home</a>
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
                            >Experience</Link>
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
                    ) : ("")}
                </div>
                <div className="col d-flex justify-content-end">
                    <div className='mt-4 mr-2'>
                    <a href="https://github.com/jtp03a"><img  src={GHLogo} /></a>
                    <a className="ml-1" href="https://www.codewars.com/users/jtp03a"><img  src={CWLogo} /></a>
                    </div>
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