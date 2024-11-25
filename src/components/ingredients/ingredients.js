import React, { useState } from 'react';

import styles from './ingredients.scss';

import Button from '../buttons/base';

const Ingredients = ({ onChange })=> {
    const [ ingredients, setIngredients ] = useState(
        [
            {
                ingredientName0: '',
                ingredientValue0: '',
                ingredientUnits0: ''
            }
        ]
    );

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

        onChange(ingredients);
    }

    const onRemoveInput = (event)=> {
        const id = event.target.dataset.id;

        ingredients.splice(id, 1);
        setIngredients([...ingredients])
    }

    return (
        <div className="ingredients">
            <label className="label">Ингредиенты</label>
            {
                ingredients.map((item, index)=> {
                    return (
                        <div key={index}>
                            <div className="field _three-columns">
                                <input id={`ingredient-name-${index}`}
                                       onChange={onChangeIngredient}
                                       data-id={index} value={ingredients[index][`ingredientName${index}`]}
                                       name={`ingredientName${index}`} placeholder="название"
                                       type="text"
                                       className="input"/>
                                <input id={`ingredient-value-${index}`}
                                       onChange={onChangeIngredient}
                                       data-id={index} value={ingredients[index][`ingredientValue${index}`]}
                                       name={`ingredientValue${index}`} placeholder="количество"
                                       type="number"
                                       className="input"/>
                                <input id={`ingredient-units-${index}`}
                                       onChange={onChangeIngredient}
                                       data-id={index} value={ingredients[index][`ingredientUnits${index}`]}
                                       name={`ingredientUnits${index}`} placeholder="единицы измерения"
                                       type="text"
                                       className="input"/>
                                { index ? <Button handleSubmit={onRemoveInput} className="remove-button" id={`${index}`}>-</Button> : ''}
                            </div>
                        </div>
                    )
                })
            }
            <Button handleSubmit={onAddInput} className="add-button">+</Button>
        </div>
    )
}

export default Ingredients;