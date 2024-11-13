import React from 'react';
import {useParams} from 'react-router-dom';

import AddRecipe from '../../forms/add-recipe';
import Footer from '../../footer';

const RecipeEdit = ()=> {
    const { recipeId } = useParams();

    return (
        <div className="recipe page-container">
            <AddRecipe id={recipeId} edit={true}/>
            <Footer/>
        </div>
    )
}

export default RecipeEdit;