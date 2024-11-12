import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './recipe.module.scss';

import Title from '../../title';
import Footer from '../../footer';
import AddRecipe from '../../forms/add-recipe';

import { getRecipeApi } from '../../../api';
import STORE from '../../../store';

const Recipe = ()=> {
    const { recipeId } = useParams();
    const [ isShowRecipe, setIsShowRecipe ] = useState(false);
    const [ nameOfRecipe, setNameOfRecipe ] = useState(STORE.DISHES.find((item)=> item.id = recipeId));

    const getRecipe = async ()=> {
        const response = await getRecipeApi(recipeId);

        setIsShowRecipe(response.status !== 404);
        setNameOfRecipe(response.responseJSON.name);
    }

    useEffect(()=> {
        getRecipe();
    }, []);

    return (
        <div className="recipe page-container">
            <Title className={`${styles.title} ta-center`}>
                { isShowRecipe ? `${nameOfRecipe}` : 'Добавить рецепт' }
            </Title>
            {isShowRecipe ?
                <h2>Текст рецепта</h2> :
                <AddRecipe/>
            }
            <Footer/>
        </div>
    )
}

export default Recipe;