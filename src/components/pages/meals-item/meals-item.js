import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './meals-item.module.scss';

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
            <Title className={`${styles.title} ta-center`}>
                { currentMeal.title }
            </Title>

            <ul className={styles.list}>
                {
                    dishesConsumed.map((item)=> {
                        return <DishesItemConsumed item={item} onClick={deleteDish} key={item.id}/>
                    })
                }
            </ul>

            <ul className={styles.list}>
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