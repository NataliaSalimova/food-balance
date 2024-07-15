import React from 'react';

import './meals.css';

import MealsItem from '../meals-item';

import STORE from '../../store';

const Meals = ({ dishesConsumed })=> {
    return (
        <div className="meals">
            <ul className="meals-list">
                {
                    STORE.MEALS.map((item, index)=> {
                        return (
                            <div key={index}>
                                <MealsItem meal={item} dishes={dishesConsumed}/>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Meals;