import './profile.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="profile-page">
            <div className="profile-page-container page-container">
                <h1 className="profile-page-title">
                    Профиль
                </h1>
                <p className="profile-page-user-name">
                    { user.name }
                </p>
                <p className="profile-page-user-age">
                    Возраст: { user.age }
                </p>
                <div className="profile-user-data">
                    <ul className="profile-user-data-list">
                        <li className="profile-user-data-item">
                            Текущий вес <strong className="profile-user-data-item-value">{ user.weight }</strong>
                        </li>
                        <li className="profile-user-data-item">
                            Цель <strong className="profile-user-data-item-value">{ targetText[user.target] }</strong>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;