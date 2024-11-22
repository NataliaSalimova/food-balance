import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import Field from '../field';
import Button from '../../buttons/base';

import { editRecipeApi, getRecipeApi, saveRecipeApi } from '../../../api';

const AddRecipe = (id, edit)=> {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        fats: 0
    });

    const [ portion, setPortion ] = useState(1);

    const [ ingredients, setIngredients ] = useState(
        [
            {
                ingredientName0: '',
                ingredientValue0: '',
                ingredientUnits0: ''
            }
        ]
    );

    const [ error, setError ] = useState(false);
    const { recipeId } = useParams();

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(test => ({
            ...test,
            [name]: value
        }));
    }

    const changePortion = (event)=> {
        const { name, value } = event.target;

        if (value === '') {
            setFormData(test => ({
                ...test,
                calories: test.calories / portion,
                carbohydrates: test.carbohydrates / portion,
                proteins: test.proteins / portion,
                fats: test.fats / portion,
            }));

            ingredients.forEach((item, index) => {
                ingredients[index][`ingredientValue${index}`] = item[`ingredientValue${index}`] / portion;
                ingredients[index] = item;
            });

            setPortion(value);
            setIngredients([...ingredients]);

        } else {
            setFormData(test => ({
                ...test,
                calories: test.calories*value,
                carbohydrates: test.carbohydrates*value,
                proteins: test.proteins*value,
                fats: test.fats*value,
                portion: value
            }));

            ingredients.forEach((item, index) => {
                ingredients[index][`ingredientValue${index}`] = item[`ingredientValue${index}`] * value;
                ingredients[index] = item;
            });

            setPortion(value);
            setIngredients([...ingredients])
        }
    }

    const handleSubmit = (event)=> {
        event.preventDefault();

        if (formData.name === '' || formData.recipe === '' || formData.ingredients === '' || portion) {
            setError(true)
        } else {
            setError(false);
            saveRecipe();
        }
    }

    const saveRecipe = async ()=> {
        formData.ingredients = ingredients;

        const data = {
            name: formData.name,
            description: formData.description,
            data: formData
        }

        const response = !edit ? await saveRecipeApi(data) : await editRecipeApi(recipeId, data);

        if (!response.status === 200) {
            alert('Что-то пошло не так! Попробуйте позже')
        }
    }

    const getRecipe = async ()=> {
        const response = await getRecipeApi(recipeId);

        if (response.status === 200) {
            setFormData(response.responseJSON)
        }
    }

    const onAddInput = (index)=> {
        const number = ingredients.length;
        const ingredientName = `ingredientName${number}`;
        const ingredientValue = `ingredientValue${number}`;
        const ingredientUnits = `ingredientUnits${number}`;

        setIngredients([...ingredients, {[ingredientName]: '', [ingredientValue]: '', [ingredientUnits]: ''}]);
    }

    const onChangeIngredient = (event)=> {
        const { name, value } = event.target;
        const ingredientId = event.target.getAttribute('data-id');

        const changedIngredient = ingredients.find((item, index) => index === Number(ingredientId));

        changedIngredient[name] = value;
        ingredients[event.target.getAttribute('data-id')] = changedIngredient;

        setIngredients([...ingredients]);
    }

    const onRemoveInput = (event)=> {
        const id = event.target.dataset.id;

        ingredients.splice(id, 1);
        setIngredients([...ingredients])
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
            <label>Ингредиенты</label>
            {
                ingredients.map((item, index)=> {
                    return (
                        <div key={index}>
                            <div className="field">
                                <input id={`ingredient-name-${index}`}
                                       onChange={onChangeIngredient}
                                       data-id={index} value={ingredients[index][`ingredientName${index}`]}
                                       name={`ingredientName${index}`} placeholder="название"
                                       type="text"/>
                                <input id={`ingredient-value-${index}`}
                                       onChange={onChangeIngredient}
                                       data-id={index} value={ingredients[index][`ingredientValue${index}`]}
                                       name={`ingredientValue${index}`} placeholder="количество"
                                       type="number"/>
                                <input id={`ingredient-units-${index}`}
                                       onChange={onChangeIngredient}
                                       data-id={index} value={ingredients[index][`ingredientUnits${index}`]}
                                       name={`ingredientUnits${index}`} placeholder="единицы измерения"
                                       type="text"/>
                                { index ? <button onClick={onRemoveInput} data-id={`${index}`} type="button">-</button> : ''}
                            </div>
                        </div>
                    )
                })
            }
            <button onClick={onAddInput} type="button">+</button>
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
                value={portion}
                type={'number'}
                onChange={changePortion}
                error={error}
                errorText={'*Пожалуйста, введите количество порций'}
            />

            <Button handleSubmit={handleSubmit}>
                Сохранить рецепт
            </Button>
        </form>
    )
}

export default AddRecipe;