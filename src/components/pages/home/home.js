import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-page">
            <div className="home-page__main page-container">
                <h1 className="home-page__title">
                    Добро пожаловать в<br/> <i>FoodBalance</i>
                </h1>
                <ul className="home-page__links">
                    <li className="home-page__links-item">
                        <Link className="home-page__link" to="/login">Войти</Link>
                    </li>
                    <li className="home-page__links-item">
                        <Link className="home-page__link" to="/registration">Зарегистрироваться</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
