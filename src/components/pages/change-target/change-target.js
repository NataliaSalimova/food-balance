import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getUserDataApi, setUserDataApi } from '../../../api';

import {
    GENDER_LIST,
    TARGET_LIST,
    ACTIVITY_LEVEL_LIST
} from '../../forms/calorie-calculation/calorie-calculation.constants';

import './change-target.scss';

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
        <div className="change-target-page page-container">
            <Title title={"Изменить цель"} className={"change-target-page__title"}/>

            {success && <p className="change-target-page__success-text bold ta-center">Данные успешно обновлены</p>}

            <form className="change-target-page__form">
                <div className="change-target-page__field">
                    <label className="change-target-page__label">Текущий вес:</label>
                    <div>
                        <input
                            className="change-target-page__input bold"
                            type="text"
                            value={formData.weight}
                            onChange={handleChange}
                            name="weight"/>
                        <span className="bold"> кг</span>
                    </div>

                </div>
                <div className="change-target-page__field">
                    <label className="change-target-page__label">Рост:</label>
                    <div>
                        <input
                            className="change-target-page__input bold"
                            type="text"
                            value={formData.height}
                            onChange={handleChange}
                            name="height"/>
                        <span className="bold"> см</span>
                    </div>
                </div>
                <div className="change-target-page__field">
                    <label className="change-target-page__label">Возраст:</label>
                    <div>
                        <input
                            className="change-target-page__input bold"
                            type="text"
                            value={formData.age}
                            onChange={handleChange}
                            name="age"/>
                        <span className="bold"> лет</span>
                    </div>

                </div>
                <div className="change-target-page__field">
                    <label className="change-target-page__label">Пол:</label>
                    <select className="change-target-page__input bold" name="gender" onChange={handleChange}>
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
                <div className="change-target-page__field">
                    <label className="change-target-page__label">Уровень активности:</label>
                    <select className="change-target-page__input bold" name="activityLevel" onChange={handleChange}>
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
                <div className="change-target-page__field">
                    <label className="change-target-page__label">Цель:</label>
                    <select className="change-target-page__input bold" name="target" onChange={handleChange}>
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

                <Button handleSubmit={handleSubmit} text={"Сохранить"} />
            </form>

            <Footer/>
        </div>
    )
}

export default ChangeTargetPage;