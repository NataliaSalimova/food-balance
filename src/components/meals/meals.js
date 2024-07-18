import React from 'react';

import './meals.scss';

import MealsItem from '../meals-item';

import STORE from '../../store';

const Meals = ({ dishesConsumed })=> {
    return (
        <div className="meals">
            <ul className="meals__list">
                {
                    STORE.MEALS.map((item, index)=> {
                        return (
                            <MealsItem key={index} meal={item} dishes={dishesConsumed}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Meals;