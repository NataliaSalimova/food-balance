import './home-page.css';

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="start-page">
            <div className="start-page-main">
                <h1 className="start-page-title">
                    Добро пожаловать в<br/> <i>FoodBalance</i>
                </h1>
                <div className="start-page-links">
                    <Link className="start-page-link" to="/login">Войти</Link>
                    <Link className="start-page-link" to="/registration">Зарегистрироваться</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
