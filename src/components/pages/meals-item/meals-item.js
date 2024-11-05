import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './meals-item.scss';

import { getDishesApi } from '../../../api';

import Title from '../../title';
import DishesItem from '../../dishes-item';
import DishesItemConsumed from '../../dishes-item-consumed';
import Footer from '../../footer';

import STORE from '../../../store';

const MealsItem = () => {
    const { mealsId } = useParams();
    const [ dishesConsumed, setDishesConsumed ] = useState([]);
    const navigate = useNavigate();

    const currentMeal = STORE.MEALS.find((item)=> item.type === mealsId);

    const addProduct = (productStoreId, currentDishId)=> {
        const currentDish = STORE.DISHES.find((item)=> item.id === Number(productStoreId));
        currentDish.dishId = currentDishId;

        setDishesConsumed([...dishesConsumed, currentDish]);
    }

    const getDishes = async ()=> {
        const result = await getDishesApi();

        if (result.status === 401) {
            navigate('/login');

            return;
        }

        const dishesConsumedList = [];

        result.responseJSON.map((item)=> {
            STORE.DISHES.find((dish)=> {
                if ((item.dishID === dish.id) && (item.types === mealsId)) {
                    dish.dishId = item.ID;
                    dishesConsumedList.push(dish);
                }
            });
        })

        setDishesConsumed(dishesConsumedList);
    }

    const deleteDish = async (dishId)=> {
        const currentProduct = dishesConsumed.find((item)=> item.ID = dishId);
        const dishesConsumedList = dishesConsumed.filter(elem => Number(elem.ID) !== currentProduct.dishId);

        setDishesConsumed(dishesConsumedList);
    }

    useEffect(()=> {
        getDishes();
    }, []);

    return (
        <div className="meals-item-page page-container">
            <Title title={ currentMeal.title } className={"meals-item-page__title ta-center"} />

            <ul className="dishes-list-consumed">
                {
                    dishesConsumed.map((item)=> {
                        return <DishesItemConsumed item={item} onClick={deleteDish} key={item.id}/>
                    })
                }
            </ul>

            <ul className="dishes-list">
                {
                    STORE.DISHES.map((item)=> {
                        if (item.type === mealsId) {
                            return <DishesItem item={item} onClick={addProduct} key={item.id}/>
                        }
                    })
                }
            </ul>
            <Footer/>
        </div>
    );
};

export default MealsItem;