import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getUserDataApi, setUserDataApi } from '../../../api';

import {
    TARGET_LIST,
    ACTIVITY_LEVEL_LIST
} from '../../forms/calorie-calculation/calorie-calculation.constants';

import styles from './change-target.module.scss';

import Title from '../../title';
import Button from '../../buttons/base';
import Field from '../../forms/field';
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
                <Field
                    label={'Текущий вес:'}
                    id={'weight'}
                    value={formData.weight}
                    onChange={handleChange}
                    additionalText={'кг'}
                />
                <Field
                    label={'Возраст:'}
                    id={'age'}
                    value={formData.age}
                    onChange={handleChange}
                    additionalText={'лет'}
                />
                <div className={styles.field}>
                    <label className={styles.label}>Уровень активности:</label>
                    <select className={`${styles.input}`} name="activityLevel" onChange={handleChange}>
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
                <div className={styles.field}>
                    <label className={styles.label}>Цель:</label>
                    <select className={`${styles.input}`} name="target" onChange={handleChange}>
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