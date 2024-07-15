import React from 'react';
import { Link } from 'react-router-dom';

import './back-link.scss';

const BackLink = ({ href })=> {
    return (
        <div className="back-link-container">
            <Link to={href} className="back-link">
                <img src="/images/arrow.png"
                     className="back-link__image"
                     width="25"
                     height="25"
                     alt="Back link"/>
            </Link>

            <span>Вернуться назад</span>
        </div>


    )
}

export default BackLink;