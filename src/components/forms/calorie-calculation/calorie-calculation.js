import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate } from 'react-router-dom';

import { setUserDataApi } from '../../../api';

import {
    TARGET_LIST,
    ACTIVITY_LEVEL_LIST,
    COEFFICIENTS_CALORIES,
    ENERGY_VALUE_COEFFICIENTS
} from './calorie-calculation.constants';

import Loader from '../../loader';
import Field from '../field';
import FieldSelect from '../field-select';
import Button from '../../buttons/base';

const CalorieCalculation = ()=> {
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
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
    const [ isSubmitForm, setIsSubmitForm ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const validateForm = (event)=> {
        event.preventDefault();

        const { gender, height, weight, age, target, activityLevel} = formData;

        if (gender === '' ||
            height === '' ||
            weight === '' ||
            age === '' ||
            target === '' ||
            activityLevel === '') {
            setError(true);
            setIsLoading(false);
            setIsSubmitForm(false);
        } else {
            setError(false);
            setIsLoading(true);
            setIsSubmitForm(true);
        }
    }

    const handleSubmit= (event)=> {
        validateForm(event);
    }

    const updateUserData = ()=> {
        const { weight, height, age, gender, activityLevel, target} = formData;
        const calories = calcCalories(weight, height, age, gender, activityLevel, target);

        setFormData(prevState => ({
            ...prevState,
            calories: calcCalories(weight, height, age, gender, activityLevel, target),
            carbohydrates: calcNutrientValue(calories, 'CARBOHYDRATES'),
            proteins: calcNutrientValue(calories, 'PROTEINS'),
            fats: calcNutrientValue(calories, 'FATS')
        }));
    }

    const setUserDataRequest = async ()=> {
        const response = await setUserDataApi(formData);

        if(response.status === 200) {
            onSetUserDataSuccess()
        }
        setIsLoading(false);
    }

    const onSetUserDataSuccess = ()=> {
        navigate('/diary');
    }

    const setUserData = ()=> {
        setUserDataRequest();
    }

    const calcCalories = (weight, height, age, genderValue, activityLevel,target)=> {
        const { WEIGHT, HEIGHT, AGE, WOMEN, MEN } = COEFFICIENTS_CALORIES;
        const caloriesValue = (WEIGHT * weight) + (HEIGHT * height) - (AGE * age);

        return Math.round(activityLevel * target * (genderValue === 'female' ?
            (caloriesValue - WOMEN) :
            (caloriesValue + MEN)));
    }

    const calcNutrientValue = (calories, nutrient)=> {
        const { PERCENT, CALORIES_PER_GRAM } = ENERGY_VALUE_COEFFICIENTS[nutrient];

        return Math.round(calories * PERCENT / CALORIES_PER_GRAM);
    }

    useEffect(()=> {
        if (isSubmitForm) {
           updateUserData();
        }
    }, [isSubmitForm])

    useEffect(()=> {
        if (!formData.calories) return;

        setUserData();
    }, [formData.calories])

    return (
        <Fragment>
            { isLoading ? <Loader/> : '' }
            {/*{ isErrorIndicator ? <ErrorIndicator/> : '' }*/}
            <form className="form">
                <Field
                    label={'Женщина'}
                    id={'gender'}
                    value={'female'}
                    type={'radio'}
                    className={'_reverse'}
                    onChange={handleChange}
                    checked={formData.gender === 'female'}
                />
                <Field
                    label={'Мужчина'}
                    id={'gender'}
                    value={'male'}
                    type={'radio'}
                    className={'_reverse'}
                    onChange={handleChange}
                    error={error}
                    errorText={'*Пожалуйста, выберите пол'}
                    checked={formData.gender === 'male'}
                />
                <Field
                    label={'Рост(см)'}
                    id={'height'}
                    value={formData.height}
                    type={'number'}
                    onChange={handleChange}
                    error={error}
                    errorText={'*Пожалуйста, укажите рост'}
                />
                <Field
                    label={'Вес(кг)'}
                    id={'weight'}
                    value={formData.weight}
                    type={'number'}
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
                <FieldSelect
                    name={'target'}
                    onChange={handleChange}
                    mainOption={'Выберите цель'}
                    items={TARGET_LIST}
                    value={formData.target}
                    error={error}
                    errorText={'*Пожалуйста, выберите цель'}
                />
                <FieldSelect
                    name={'activityLevel'}
                    onChange={handleChange}
                    mainOption={'Выберите уровень физической нагрузки'}
                    items={ACTIVITY_LEVEL_LIST}
                    value={formData.activityLevel}
                    error={error}
                    errorText={'*Пожалуйста, выберите уровень активности'}
                />
                <Button handleSubmit={handleSubmit}>
                    Рассчитать
                </Button>
            </form>
        </Fragment>
    );
}

export default CalorieCalculation;