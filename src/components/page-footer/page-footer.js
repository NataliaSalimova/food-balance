import React from 'react';

import './page-footer.scss';
import {Link} from "react-router-dom";

const PageFooter = ({ hiddenLink })=> {
    return (
        <div className="page-footer">
            <Link to="/diary" className={`page-footer__link medium-bold ${hiddenLink === 'diary' ? 'hidden' : ''}`}>
                <img
                    className="page-footer__img"
                    src="/images/diary.png"
                    width="30"
                    height="30"
                    alt="Diary"/>
                Дневник
            </Link>
            <Link to="/profile" className={`page-footer__link medium-bold ${hiddenLink === 'profile' ? 'hidden' : ''}`}>
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

export default PageFooter;