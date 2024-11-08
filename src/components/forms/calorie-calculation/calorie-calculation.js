import './calorie-calculation.scss';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserApi, setUserDataApi } from '../../../api';

import { TARGET_LIST, ACTIVITY_LEVEL_LIST } from './calorie-calculation.constants';

import Button from '../../buttons/base';
import Field from '../field';

const CalorieCalculation = ()=> {
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

    useEffect(()=> {
        getUser();
    }, []);

    useEffect(()=> {
        if (!formData.calories) return;

        addUserData();
    }, [formData.calories])

    return (
        <form className="form">
            <Field
                label={'Женщина'}
                id={'gender'}
                value={'female'}
                type={'radio'}
                onChange={handleChange}
                checked={formData.gender === 'female'}
            />
            <Field
                label={'Мужчина'}
                id={'gender'}
                value={'male'}
                type={'radio'}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, выберите пол'}
                checked={formData.gender === 'male'}
            />
            <Field
                label={'Рост(см)'}
                id={'height'}
                value={formData.height}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, укажите рост'}
            />
            <Field
                label={'Вес(кг)'}
                id={'weight'}
                value={formData.weight}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, укажите вес'}
            />
            <Field
                label={'Возраст(лет)'}
                id={'age'}
                value={formData.age}
                type={'number'}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, укажите возраст'}
            />
            <div className="form__field">
                <select className="form__input _select" name="target" onChange={handleChange}>
                    <option>Выберите цель</option>
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
                {error && !formData.target && <span className="error">*Пожалуйста, выберите цель</span>}
            </div>
            <div className="form__field">
                <select className="form__input _select" name="activityLevel" onChange={handleChange}>
                    {
                        ACTIVITY_LEVEL_LIST.map((item,index)=> {
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
            <Button handleSubmit={handleSubmit}>
                Рассчитать
            </Button>
        </form>
    );
}

export default CalorieCalculation;