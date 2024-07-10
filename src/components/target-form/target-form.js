import './target-form.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CalorieCalculationForm = ()=> {
    const fetchURL = 'http://pet.foodtracker.ru/getUser';
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

    const getUser = async ()=> {
        const response = await fetch(fetchURL, {
            method: 'GET',
            headers: {
                'authKey': localStorage.getItem('authKey')
            }
        });

        switch (response.status) {
            case 200:
                break;
            case 401:
                navigate('/login');
                break;
            default:
                alert('Извините, что-то пошло не так');
                break;
        }
    };

    useEffect(()=> {
        getUser();
    }, []);

    const handleSubmit = (event)=> {
        event.preventDefault();

        const { weight, height, age, gender, activityLevel, target} = formData;
        const calories = calcCalories(weight, height, age, gender, activityLevel, target);

        formData.calories = calories;
        formData.carbohydrates = calcCarbohydrates(calories);
        formData.proteins = calcProteins(calories);
        formData.fats = calcFats(calories);

        addUserData();
    }

    const addUserData = async ()=> {
        await fetch('http://pet.foodtracker.ru/setUserData', {
            method: 'PUT',
            headers: {
                'authKey': localStorage.getItem('authKey')
            },
            body: JSON.stringify(formData)
        }).then((response) => {
            if (response.status === 200) {
                navigate('/catalog')
            }
        }).catch((error) => {
            alert('Что-то пошло не так')
        });
    }

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const calcCalories = (weight, height, age, genderValue, activityLevel,target)=> {
        const caloriesValue = (10 * weight) + (6.25 * height) - (5 * age);

        return Math.round(activityLevel*target*(genderValue === 'female' ? (caloriesValue - 161) : (caloriesValue + 5)));
    }

    const calcCarbohydrates = (calories)=> {
        return Math.round(calories * 0.3 / 4);
    }

    const calcProteins = (calories)=> {
        return Math.round(calories * 0.3 / 4);
    }

    const calcFats = (calories)=> {
        return Math.round(calories * 0.4 / 9);
    }

    return (
        <form className="calorie-calculation-form">
            <div className="calorie-calculation-field">
                <label className="calorie-calculation-label">
                    <input className="calorie-calculation-input"
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={handleChange}/>
                    Женщина
                </label>
            </div>
            <div className="calorie-calculation-field">
                <label className="calorie-calculation-label">
                    <input className="calorie-calculation-input"
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={handleChange}/>
                    Мужчина
                </label>
            </div>
            <div className="calorie-calculation-field">
                <label className="calorie-calculation-label">
                    Рост(см)
                    <input
                        className="calorie-calculation-input"
                        type="text"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}/>
                </label>
            </div>
            <div className="calorie-calculation-field">
                <label className="calorie-calculation-label">
                    Вес(кг)
                    <input
                        className="calorie-calculation-input"
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}/>
                </label>
            </div>
            <div className="calorie-calculation-field">
                <label className="calorie-calculation-label">
                    Возраст(лет)
                    <input
                        className="calorie-calculation-input"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}/>
                </label>
            </div>
            <div className="calorie-calculation-field">
                <select className="calorie-calculation-input _select" name="target" onChange={handleChange}>
                    <option>Выберите цель</option>
                    <option value="0.8">
                        Сбросить вес
                    </option>
                    <option value="1">
                        Поддержать текущий вес
                    </option>
                    <option value="1.1">
                        Набрать вес
                    </option>
                </select>
            </div>
            <div className="calorie-calculation-field">
                <select className="calorie-calculation-input _select" name="activityLevel" onChange={handleChange}>
                    <option value="1.2">
                        Нет физических нагрузок и сидячая работа
                    </option>
                    <option value="1.375">
                        Небольшие пробежки или делаете легкую гимнастику 1–3 раза в неделю
                    </option>
                    <option value="1.55">
                        Вы занимаетесь спортом со средними нагрузками 3–5 раз в неделю
                    </option>
                    <option value="1.725">
                        Вы полноценно тренируетесь 6–7 раз в неделю
                    </option>
                    <option value="1.9">
                        Ваша работа связана с физическим трудом, вы тренируетесь 2 раза в день и включаете в
                        программу тренировок силовые упражнения
                    </option>
                </select>
            </div>
            <button className="calorie-calculation-button" onClick={handleSubmit}>Рассчитать</button>
        </form>
    );
}

export default CalorieCalculationForm;