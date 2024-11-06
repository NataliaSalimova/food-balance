import React from 'react';

import './footer.scss';
import {Link} from "react-router-dom";

const Footer = ({ hiddenLink })=> {
    return (
        <div className="footer">
            <Link to="/diary" className={`footer__link medium-bold ${hiddenLink === 'diary' ? 'hidden' : ''}`}>
                <img
                    className="footer__img"
                    src="/images/diary.png"
                    width="30"
                    height="30"
                    alt="Diary"/>
                Дневник
            </Link>
            <Link to="/profile" className={`footer__link medium-bold ${hiddenLink === 'profile' ? 'hidden' : ''}`}>
                <img
                    className="page-footer__img"
                    src="/images/profile.png"
                    width="30"
                    height="30"
                    alt="Profile"/>
                Профиль
            </Link>
        </div>
    )
}

export default Footer;