import React, {useEffect, useState} from 'react';

import Field from '../field';
import Button from '../../buttons/base';

import { editRecipeApi, getRecipeApi, saveRecipeApi } from '../../../api';
import {useParams} from "react-router-dom";

const AddRecipe = (id, edit)=> {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: '',
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        fats: 0
    });

    const [ error, setError ] = useState(false);
    const { recipeId } = useParams();

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(test => ({
            ...test,
            [name]: value
        }));
    };

    const handleSubmit = (event)=> {
        event.preventDefault();

        if (formData.name === '' || formData.recipe === '' || formData.ingredients === '') {
            setError(true)
        } else {
            setError(false);
            saveRecipe();
        }
    }

    const saveRecipe = async ()=> {
        const data = {
            name: formData.name,
            description: formData.description,
            data: formData
        }

        const response = !edit ? await saveRecipeApi(data) : await editRecipeApi(recipeId, data);

        if (response.status === 200) {
        //     Обновить страницу
        }
    }

    const getRecipe = async ()=> {
        const response = await getRecipeApi(recipeId);

        if (response.status === 200) {
            setFormData({
                name: response.responseJSON.name,
                description: response.responseJSON.description,
                ingredients: response.responseJSON.data.ingredients,
                calories: response.responseJSON.data.calories,
                carbohydrates: response.responseJSON.data.carbohydrates,
                proteins: response.responseJSON.data.proteins,
                fats: response.responseJSON.data.fats
            })
        }
    }

    useEffect(()=> {
        getRecipe()
    }, [])

    return (
        <form className="form">
            <Field
                label={'Название'}
                id={'name'}
                value={formData.name}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, введите название блюда'}
            />
            <Field
                label={'Рецепт'}
                id={'description'}
                value={formData.description}
                onChange={handleChange}
                inputType={'textarea'}
                error={error}
                errorText={'*Пожалуйста, добавьте рецепт'}
            />
            <Field
                label={'Игредиенты'}
                id={'ingredients'}
                value={formData.ingredients}
                onChange={handleChange}
                inputType={'textarea'}
                error={error}
                errorText={'*Пожалуйста, добавьте список ингредиентов'}
            />
            <Field
                label={'Количество калорий (на 100гр)'}
                id={'calories'}
                value={formData.calories}
                type={'number'}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, добавьте количество калорий'}
            />
            <Field
                label={'Количество белков (на 100гр)'}
                id={'proteins'}
                value={formData.proteins}
                type={'number'}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, добавьте количество белков'}
            />
            <Field
                label={'Количество жиров (на 100гр)'}
                id={'fats'}
                value={formData.fats}
                type={'number'}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, добавьте количество жиров'}
            />
            <Field
                label={'Количество углеводов (на 100гр)'}
                id={'carbohydrates'}
                value={formData.carbohydrates}
                type={'number'}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, добавьте количество углеводов'}
            />

            <Button handleSubmit={handleSubmit}>
                Сохранить рецепт
            </Button>
        </form>
    )
}

export default AddRecipe;