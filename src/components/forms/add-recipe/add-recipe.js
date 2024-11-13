import React, {useEffect, useState} from 'react';

import Field from '../field';
import Button from '../../buttons/base';

import { editRecipeApi, getRecipeApi, saveRecipeApi } from '../../../api';
import {useParams} from "react-router-dom";

const AddRecipe = (id, edit)=> {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        ingredients: [
            {
                name: '',
                value: ''
            }
        ],
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        fats: 0,
        portion: 1
    });

    const [ error, setError ] = useState(false);
    const { recipeId } = useParams();

    const handleChange = (event)=> {
        const { name, value } = event.target;

        if (name === 'portion' && value > 0 && formData.portion !== value) {
            setFormData(test => ({
                ...test,
                calories: test.calories*value,
                carbohydrates: test.carbohydrates*value,
                proteins: test.proteins*value,
                fats: test.fats*value,
                portion: value
            }));
        } else {
            setFormData(test => ({
                ...test,
                [name]: value
            }));
        }
    }

    const handleSubmit = (event)=> {
        event.preventDefault();

        if (formData.name === '' || formData.recipe === '' || formData.ingredients === '' || formData.portion) {
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
                fats: response.responseJSON.data.fats,
                portion: response.responseJSON.data.portion
            })
        }
    }

    const onAddInput = ()=> {
        setFormData(prev => ({
            ...prev,
            ingredients: prev.ingredients[prev.ingredients.length] = ({name: '', value: ''})
        }))

        console.log(formData.ingredients)
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
            {/*<Field*/}
            {/*    label={'Рецепт'}*/}
            {/*    id={'description'}*/}
            {/*    value={formData.description}*/}
            {/*    onChange={handleChange}*/}
            {/*    inputType={'textarea'}*/}
            {/*    error={error}*/}
            {/*    errorText={'*Пожалуйста, добавьте рецепт'}*/}
            {/*/>*/}
            {
                formData.ingredients.map((item, index)=> {
                    return (
                        <div key={index}>
                            <label>Ингредиенты</label>
                            <div className="field">
                                <input value={item.name} placeholder="название" type="text"/>
                                <input value={item.value} placeholder="значение" type="number"/>
                            </div>
                        </div>
                    )
                })
            }
            <button onClick={onAddInput} type="button">Добавить игредиент</button>
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
            <Field
                label={'Количество порций'}
                id={'portion'}
                value={formData.portion}
                type={'number'}
                onChange={handleChange}
            />

            <Button handleSubmit={handleSubmit}>
                Сохранить рецепт
            </Button>
        </form>
    )
}

export default AddRecipe;