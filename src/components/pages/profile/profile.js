import './profile.scss';

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getUserDataApi } from '../../../api';

import { TARGET_LIST } from '../../forms/calorie-calculation/calorie-calculation.constants';

import Title from '../../title';
import Button from '../../buttons/base';
import Footer from '../../footer';

const ProfilePage = ()=> {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        age: '',
        target: '',
        weight: ''
    });

    const targetMap = new Map();

    targetMap.set(TARGET_LIST[0].value, TARGET_LIST[0].text)
        .set(TARGET_LIST[1].value, TARGET_LIST[1].text)
        .set(TARGET_LIST[2].value, TARGET_LIST[2].text);

    const getUser = async ()=> {
        const response = await getUserDataApi();
        const result = response.responseJSON;

        setUser(prevFormData => ({
            ...prevFormData,
            name: result.name,
            weight: result.weight,
            age: result.age,
            target: result.target,
        }));
    };

    const logOut = ()=> {
        localStorage.removeItem('authKey');
        navigate('/');
    }

    useEffect(()=> {
        getUser();
    }, []);

    return (
        <div className="profile-page page-container">
            <Title title={"Профиль"} className={"profile-page__title"}/>
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
                        Цель <strong className="profile-page-data__item-value">{ targetMap.get(user.target) }</strong>
                    </li>
                </ul>
            </div>
            <Link to="/change-target" className="profile-page__button button ta-center">Скорректировать цель</Link>
            <Button handleSubmit={logOut} text={"Выйти"} />

            <Footer hiddenLink={'profile'}/>
        </div>
    );
}

export default ProfilePage;