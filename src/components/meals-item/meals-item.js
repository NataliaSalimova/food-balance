import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './meals-item.css';

import STORE from '../../store';

const MealsItem = ({ meal, dishes }) => {
    const [ dishesConsumed, setDishesConsumed ] = useState([]);
    const getDishesConsumed = ()=> {
        const array = [];

        dishes.map((item)=> {
            if (item.types === meal.type) {
                array.push(STORE.DISHES.find((dish)=> dish.id === item.dishID));
            }
        })

        setDishesConsumed(array);
    }

    useEffect(()=> {
        if (!dishes) return;

        getDishesConsumed();
    }, [dishes])

    return (
        <div>
            <li className="meals-item">
                <div className="meals-description">
                    <p className="meals-title">{meal.title}</p>
                    {
                        dishesConsumed.map((item, index)=> {
                            return (
                                <p className="meals-text" key={index}>{ item.name }</p>
                            )
                        })
                    }
                </div>
                <Link to={meal.type} className="meals-button">+</Link>
            </li>

        </div>

    )
}

export default MealsItem;