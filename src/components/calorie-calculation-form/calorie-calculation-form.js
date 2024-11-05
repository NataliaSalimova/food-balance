import './calorie-calculation-form.scss';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserApi, setUserDataApi } from '../../api';

import Button from '../button';

const CalorieCalculationForm = ()=> {
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

    const [ error, setError ] = useState(false);

    const getUser = async ()=> {
        const response = await getUserApi();

        if (response.status === 401) {
            navigate('/login');
        }
    };

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = (event)=> {
        event.preventDefault();

        const { gender, height, weight, age, target, activityLevel} = formData;

        if (gender === '' ||
            height === '' ||
            weight === '' ||
            age === '' ||
            target === '' ||
            activityLevel === '') {
            setError(true);
        } else {
            setError(false);
            setUserData();
        }
    }

    const setUserData = ()=> {
        const { weight, height, age, gender, activityLevel, target} = formData;
        const calories = calcCalories(weight, height, age, gender, activityLevel, target);

        setFormData(prevFormData => ({
            ...prevFormData,
            calories: calcCalories(weight, height, age, gender, activityLevel, target),
            carbohydrates: calcCarbohydrates(calories),
            proteins: calcProteins(calories),
            fats: calcFats(calories)
        }));
    }

    const addUserData = async ()=> {
        const response = await setUserDataApi(formData);

        switch (response.status) {
            case 200:
                navigate('/diary')
                break;
            default:
                alert('Что-то пошло не так')
        }
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
            text: 'Нет физических нагрузок и сидячая работа'
        },
        {
            value: 1.375,
            text: 'Небольшие пробежки или делаете легкую гимнастику 1–3 раза в неделю'
        },
        {
            value: 1.55,
            text: 'Вы занимаетесь спортом со средними нагрузками 3–5 раз в неделю'
        },
        {
            value: 1.725,
            text: 'Вы полноценно тренируетесь 6–7 раз в неделю'
        },
        {
            value: 1.9,
            text: 'Ваша работа связана с физическим трудом, вы тренируетесь 2 раза в день и включаете в программу тренировок силовые упражнения'
        }
    ]

    useEffect(()=> {
        getUser();
    }, []);

    useEffect(()=> {
        if (!formData.calories) return;

        addUserData();
    }, [formData.calories])

    return (
        <form className="form">
            <div className="form__field">
                <input className="form__input"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    checked={formData.gender === 'female'}/>
                <label className="form__label">
                    Женщина
                </label>
            </div>
            <div className="form__field">
                <input className="form__input"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    checked={formData.gender === 'male'}/>
                <label className="form__label">
                    Мужчина
                </label>
                {error && !formData.gender && <span className="error">*Пожалуйста, выберите пол</span>}
            </div>
            <div className="form__field">
                <label className="form__label">
                    Рост(см)
                </label>
                <input
                    className="form__input"
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}/>
                {error && !formData.height && <span className="error">*Пожалуйста, укажите рост</span>}
            </div>
            <div className="form__field">
                <label className="form__label">
                    Вес(кг)
                </label>
                <input
                    className="form__input"
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}/>
                {error && !formData.weight && <span className="error">*Пожалуйста, укажите вес</span>}
            </div>
            <div className="form__field">
                <label className="form__label">
                    Возраст(лет)
                </label>
                <input
                    className="form__input"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}/>
                {error && !formData.age && <span className="error">*Пожалуйста, укажите возраст</span>}
            </div>
            <div className="form__field">
                <select className="form__input _select" name="target" onChange={handleChange}>
                    <option>Выберите цель</option>
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
                {error && !formData.target && <span className="error">*Пожалуйста, выберите цель</span>}
            </div>
            <div className="form__field">
                <select className="form__input _select" name="activityLevel" onChange={handleChange}>
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
                {error && !formData.activityLevel && <span className="error">*Пожалуйста, выберите уровень активности</span>}
            </div>
            <Button handleSubmit={handleSubmit} text={"Рассчитать"} />
        </form>
    );
}

export default CalorieCalculationForm;