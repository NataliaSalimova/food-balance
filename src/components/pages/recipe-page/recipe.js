import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './recipe.module.scss';

import Footer from '../../footer';
import Title from '../../title';
import AddRecipe from '../../forms/add-recipe';
import Recipe from '../../recipe';

import { getRecipeApi } from '../../../api';

const RecipePage = ()=> {
    const { recipeId } = useParams();
    const [ isShowRecipe, setIsShowRecipe ] = useState(false);
    const [ recipe, setRecipe ] = useState({
        name: '',
        description: '',
        data: {
            ingredients: '',
            calories: '',
            carbohydrates: '',
            fats: '',
            proteins: ''
        }
    })

    const getRecipe = async ()=> {
        const response = await getRecipeApi(recipeId);

        setIsShowRecipe(response.status !== 404);
        setRecipe(response.responseJSON)
    }

    useEffect(()=> {
        getRecipe();
    }, []);

    return (
        <div className="recipe page-container">
            <Title className={`${styles.title} ta-center`}>
                { isShowRecipe ? `${recipe.name}` : 'Добавить рецепт' }
            </Title>
            {isShowRecipe ?
                <Recipe recipe={recipe} recipeId={recipeId}/> :
                <AddRecipe recipe={recipe}/>
            }
            <Footer/>
        </div>
    )
}

export default RecipePage;