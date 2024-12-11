import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';
const Header = ()=> {
    return (
        <div className="header">
            <Link to='/' className="header__link">
                FoodBalance
            </Link>
            <Link to='/profile' className="header__link header__link_profile">
                <img src="/images/profile.png"
                     width="30"
                     height="30"
                     alt="Icon profile"/>
            </Link>
        </div>
    )
}

export default Header;