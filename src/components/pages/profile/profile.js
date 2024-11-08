import styles from './profile.module.scss';

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getUserDataApi } from '../../../api';

import { TARGET_LIST } from '../../forms/calorie-calculation/calorie-calculation.constants';
import { AUTH_KEY } from '../../../api/api.constants';

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
        const { name, age, target, weight } = response.responseJSON;

        setUser(prevFormData => ({
            ...prevFormData,
            name, age, target, weight
        }));
    };

    const logOut = ()=> {
        localStorage.removeItem(AUTH_KEY);
        navigate('/');
    }

    useEffect(()=> {
        getUser();
    }, []);

    return (
        <div className="profile-page page-container">
            <Title className={styles.title}>
                Профиль
            </Title>
            <p className={styles.name}>
                { user.name }
            </p>
            <p className={styles.age}>
                Возраст: { user.age }
            </p>
            <div className={styles.data}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        Текущий вес <strong className={styles.itemValue}>{ user.weight }</strong>
                    </li>
                    <li className={styles.item}>
                        Цель <strong className={styles.itemValue}>{ targetMap.get(Number(user.target)) }</strong>
                    </li>
                </ul>
            </div>
            <Link to="/change-target" className={`${styles.link} ta-center`}>Скорректировать цель</Link>
            <Button handleSubmit={logOut}>
                Выйти
            </Button>

            <Footer hiddenLink={'profile'}/>
        </div>
    );
}

export default ProfilePage;