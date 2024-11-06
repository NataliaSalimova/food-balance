import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getUserDataApi, setUserDataApi } from '../../../api';

import {
    GENDER_LIST,
    TARGET_LIST,
    ACTIVITY_LEVEL_LIST
} from '../../forms/calorie-calculation/calorie-calculation.constants';

import styles from './change-target.module.scss';

import Title from '../../title';
import Button from '../../buttons/base';
import Footer from '../../footer';

const ChangeTargetPage = ()=> {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        gender: '',
        height: '',
        weight: '',
        age: '',
        target: '',
        activityLevel: '',
        calories: '',
        carbohydrates: '',
        proteins: '',
        fats: ''
    });
    const [ success, setSuccess ] = useState(false);

    const getUser = async ()=> {
        const result = await getUserDataApi();

        if (result.status === 401) {
            navigate('/login');

            return;
        }

        const data = result.responseJSON;

        if (data) {
            setFormData(data);
        }
    };

    const handleSubmit = async ()=> {
        const response = await setUserDataApi(formData);

        if (response.status === 200) {
            setSuccess(true);

            setTimeout(()=> {
                setSuccess(false);
            }, 1000);
        }
    }

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        console.log(formData)
    }

    useEffect(()=> {
        getUser();
    }, [])

    return (
        <div className="page-container">
            <Title className={styles.title}>
                Изменить цель
            </Title>

            {success && <p className={`${styles.successText} bold ta-center`}>
                Данные успешно обновлены
            </p>}

            <form className={styles.form}>
                <div className={styles.form__field}>
                    <label>Текущий вес:</label>
                    <div>
                        <input
                            className={`${styles.form__input} bold`}
                            type="text"
                            value={formData.weight}
                            onChange={handleChange}
                            name="weight"/>
                        <span className="bold"> кг</span>
                    </div>

                </div>
                <div className={styles.form__field}>
                    <label>Рост:</label>
                    <div>
                        <input
                            className={`${styles.form__input} bold`}
                            type="text"
                            value={formData.height}
                            onChange={handleChange}
                            name="height"/>
                        <span className="bold"> см</span>
                    </div>
                </div>
                <div className={styles.form__field}>
                    <label>Возраст:</label>
                    <div>
                        <input
                            className={`${styles.form__input} bold`}
                            type="text"
                            value={formData.age}
                            onChange={handleChange}
                            name="age"/>
                        <span className="bold"> лет</span>
                    </div>

                </div>
                <div className={styles.form__field}>
                    <label>Пол:</label>
                    <select className={`${styles.form__input} bold`} name="gender" onChange={handleChange}>
                        {
                            GENDER_LIST.map((item,index)=> {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                        {...(Number(formData.target) === item.value && { selected: true })}>
                                        {item.text}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={styles.form__field}>
                    <label>Уровень активности:</label>
                    <select className={`${styles.form__input} bold`} name="activityLevel" onChange={handleChange}>
                        {
                            ACTIVITY_LEVEL_LIST.map((item,index)=> {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                        {...(Number(formData.activityLevel) === item.value && { selected: true })}>
                                        {item.degree}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className={styles.form__field}>
                    <label>Цель:</label>
                    <select className={`${styles.form__input} bold`} name="target" onChange={handleChange}>
                        {
                            TARGET_LIST.map((item,index)=> {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                        {...(Number(formData.target) === item.value && { selected: true })}>
                                        {item.text}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <Button handleSubmit={handleSubmit}>
                    Сохранить
                </Button>
            </form>

            <Footer/>
        </div>
    )
}

export default ChangeTargetPage;