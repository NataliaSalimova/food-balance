import React, {useState} from 'react';

import styles from './add-recipe.module.scss';
import Field from "../field";
import Button from "../../buttons/base";

const AddRecipe = ()=> {
    const [formData, setFormData] = useState({
        name: '',
        recipe: '',
        ingredients: '',
        notes: '',
    });

    const [ error, setError ] = useState(false);

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(test => ({
            ...test,
            [name]: value
        }));
    };

    const handleSubmit = (event)=> {
        event.preventDefault();

        if (formData.name === '' || formData.recipe || formData.ingredients) {
            setError(true)
        } else {
            setError(false);
        }
    }

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
                id={'recipe'}
                value={formData.recipe}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, добавьте рецепт'}
            />
            <Field
                label={'Ингредиенты'}
                id={'ingredients'}
                value={formData.ingredients}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, добавьте список ингредиентов'}
            />
            <Field
                label={'Примечание'}
                id={'notes'}
                value={formData.notes}
                onChange={handleChange}
            />

            <Button handleSubmit={handleSubmit}>
                Сохранить рецепт
            </Button>
        </form>
    )
}

export default AddRecipe;