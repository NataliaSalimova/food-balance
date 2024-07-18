import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './meals-item.scss';

import Title from '../../title';
import DishesItem from '../../dishes-item';
import DishesItemConsumed from '../../dishes-item-consumed';
import PageFooter from '../../page-footer';

import STORE from '../../../store';

const MealsItem = () => {
    const deleteDishURL = 'http://pet.foodtracker.ru/diary/';

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
        try {
            const response = await fetch('http://pet.foodtracker.ru/diary', {
                method: 'GET',
                headers: {
                    'authKey': localStorage.getItem('authKey')
                }
            });

            if (response.status === 401) {
                navigate('/login');

                return;
            }

            const res =  await response.json();
            const dishesConsumedList = [];

            res.map((item)=> {
                STORE.DISHES.find((dish)=> {
                    if ((item.dishID === dish.id) && (item.types === mealsId)) {
                        dish.dishId = item.ID;
                        dishesConsumedList.push(dish);
                    }
                });
            })

            setDishesConsumed(dishesConsumedList);

            console.log(dishesConsumed)

        } catch (error) {
            console.log(error);
        }
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
            <PageFooter/>
        </div>
    );
};

export default MealsItem;