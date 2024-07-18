import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './meals-item.scss';

import STORE from '../../store';

const MealsItem = ({ meal, dishes }) => {
    const [ dishesConsumed, setDishesConsumed ] = useState([]);
    const [ caloriesConsumed, setCaloriesConsumed ] = useState({
        breakfast: 0,
        dinner: 0,
        eveningMeal: 0,
        snack: 0
    });
    const getDishesConsumed = ()=> {
        const array = [];
        const cal = new Map();

        dishes.map((item)=> {
            if (item.types === meal.type) {
                const dish = STORE.DISHES.find((dish)=> dish.id === item.dishID);
                const type = item.types;

                cal[type] ? cal[type] = cal[type] + dish.calories : cal[type] = dish.calories;

                array.push(dish);
            }
        })

        setCaloriesConsumed(cal)
        setDishesConsumed(array);
    }

    useEffect(()=> {
        getDishesConsumed();
    }, [dishes])

    return (
        <li className="meals-item">
            <div className="meals-item__description">
                <p className="meals-item__title">{meal.title}</p>
                {
                    dishesConsumed.map((item, index)=> {
                        return (
                            <p className="meals-item__text" key={index}>{ item.name }</p>
                        )
                    })
                }
            </div>
            <Link to={meal.type} className="meals-item__button ta-center">+</Link>
            <p className={`meals-item__calories ta-center ${!caloriesConsumed[meal.type] ? 'hidden' : ''}`}>{caloriesConsumed[meal.type]} ккал</p>
        </li>
    )
}

export default MealsItem;