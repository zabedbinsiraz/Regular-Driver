import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    

    return (
        <div className="header-container">
            <div className="header-title">
                <h1>Regular driveR</h1>
            </div>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login"> {
                  loggedInUser.email ?  loggedInUser.name : "Log in" } </Link>
                    
            </nav>
        </div>
    );
};

export default Header;