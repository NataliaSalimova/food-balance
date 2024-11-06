import styles from './home.module.scss';

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-page">
            <div className="home-page__main page-container">
                <h1 className={styles.title}>
                    Добро пожаловать в<br/> <i>FoodBalance</i>
                </h1>
                <ul className={styles.links}>
                    <li>
                        <Link className={styles.link} to="/login">
                            Войти
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.link} to="/registration">
                            Зарегистрироваться
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
