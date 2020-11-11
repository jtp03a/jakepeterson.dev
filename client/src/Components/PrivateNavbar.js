import React, { useContext }  from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

function PrivateNavbar () {

    const authContext = useContext(AuthContext);

        return (
            <nav className="nav" id="navbar p-0">
               <Link to="/" className="nav-item nav-link">Home</Link>
               <a className="nav-item nav-link" href="" onClick={authContext.logout}>Log Out</a>
            </nav>
        );
}

export default PrivateNavbar;