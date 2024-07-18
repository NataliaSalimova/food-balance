import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import './change-target.scss';

import Title from '../../title';
import Button from '../../button';
import PageFooter from '../../page-footer';

const ChangeTargetPage = ()=> {
    const getUserURL = 'http://pet.foodtracker.ru/getUserData';
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
    const genderList = [
        {
            value: 'male',
            text: 'Женский'
        },
        {
            value: 'female',
            text: 'Мужской'
        },
    ]
    const targetList = [
        {
            value: 0.8,
            text: 'Снизить вес'
        },
        {
            value: 1,
            text: 'Поддержать текущий вес'
        },
        {
            value: 1.1,
            text: 'Набрать вес'
        }
    ]
    const activityLevelList = [
        {
            value: 1.2,
            text: 'Низкий'
        },
        {
            value: 1.375,
            text: 'Средний'
        },
        {
            value: 1.55,
            text: 'Умеренный'
        },
        {
            value: 1.725,
            text: 'Высокий'
        },
        {
            value: 1.9,
            text: 'Очень высокий'
        }
    ]

    const getUser = async ()=> {
        try {
            const response = await fetch(getUserURL, {
                method: 'GET',
                headers: {
                    'authKey': localStorage.getItem('authKey')
                }
            });

            if (response.status === 401) {
                navigate('/login');

                return;
            }

            const data = await response.json();

            if (data) {
                setFormData(data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleSubmit = async ()=> {

        await fetch('http://pet.foodtracker.ru/setUserData', {
            method: 'PUT',
            headers: {
                'authKey': localStorage.getItem('authKey')
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (response.status === 200) {
                setSuccess(true);

                setTimeout(()=> {
                    setSuccess(false);
                }, 1000);
            }
        }).catch((error) => {
            console.log(error)
        });
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
                            genderList.map((item,index)=> {
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
                            activityLevelList.map((item,index)=> {
                                return (
                                    <option
                                        key={index}
                                        value={item.value}
                                        {...(Number(formData.activityLevel) === item.value && { selected: true })}>
                                        {item.text}
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
                            targetList.map((item,index)=> {
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

            <PageFooter/>
        </div>
    )
}

export default ChangeTargetPage;