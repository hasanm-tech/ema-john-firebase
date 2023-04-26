import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {

    const {user,userSignOut} = useContext(AuthContext)

    const handleSignOut = () => {
        userSignOut()
        .then(result => {})
        .catch(error => console.error(error) )
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signUp">Sign Up</Link>
               
            </div>

            <div>
                {user &&  <Link> <span className='span'>Welcome</span> {user.email} <button className='btn-span' onClick={handleSignOut}> Log Out </button>  </Link>}
            </div>
        </nav>
    );
};

export default Header;