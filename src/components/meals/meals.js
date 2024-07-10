import React, { useState } from 'react';

import './meals.css';

import MealsItem from '../meals-item';

import STORE from '../../store';

const Meals = ()=> {
    return (
        <div className="meals">
            <ul className="meals-list">
                {
                    STORE.MEALS.map((item, index)=> {
                        return <MealsItem key={index} meal={item}/>
                    })
                }
            </ul>
        </div>
    )
}

export default Meals;