import React from 'react';

import './home.scss';

import HomeLinks from '../../home-links';

const HomePage = ()=> {
    return (
        <div className="home">
            <div className="page-container ta-center">
                <h1 className="home__title">
                    Добро пожаловать в<br/> <i>FoodBalance</i>
                </h1>

                <HomeLinks/>
            </div>
        </div>
    );
}

export default HomePage;
