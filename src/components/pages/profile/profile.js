import './profile.scss';

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Title from '../../title';
import BackLink from '../../back-link';

const ProfilePage = ()=> {
    const fetchURLUser = 'http://pet.foodtracker.ru/getUser';
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        age: '',
        target: '',
        weight: ''
    });

    const targetText = {
        0.8: 'Снизить вес',
        1: 'Поддержать текущий вес',
        1.1: 'Набрать вес'
    }

    const getUser = async ()=> {
        const response = await fetch(fetchURLUser, {
            method: 'GET',
            headers: {
                'authKey': localStorage.getItem('authKey')
            }
        });

        if (response.status === 401) {
            navigate('/login');
        }

        const res = await response.json();

        setUser(prevFormData => ({
            ...prevFormData,
            name: res.name,
            weight: JSON.parse(res.data).weight,
            age: JSON.parse(res.data).age,
            target: JSON.parse(res.data).target,
        }));
    };

    useEffect(()=> {
        getUser();
    }, []);

    return (
        <div className="profile-page page-container">
            <BackLink href={'diary'}/>
            <Title title={"Профиль"} className={"profile-page__title ta-center"}/>
            <p className="profile-page__name">
                { user.name }
            </p>
            <p className="profile-page__age">
                Возраст: { user.age }
            </p>
            <div className="profile-page-data">
                <ul className="profile-page-data__list">
                    <li className="profile-page-data__item">
                        Текущий вес <strong className="profile-page-data__item-value">{ user.weight }</strong>
                    </li>
                    <li className="profile-page-data__item">
                        Цель <strong className="profile-page-data__item-value">{ targetText[user.target] }</strong>
                    </li>
                </ul>
            </div>
            <Link to="/calorie-calculation" className="profile-page__button">Скорректировать цель</Link>
        </div>
    );
}

export default ProfilePage;