import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './meals-item-page.css';

import DishesItem from '../../dishes-item';

import STORE from '../../../store';

// Страница с отдельным приемом пищи

const MealsItemPage = () => {
    const getUserUrl = 'http://pet.foodtracker.ru/getUserData';
    const [ dishesConsumed, setDishesConsumed ] = useState([]);
    const [ userData,  setUserData] = useState();

    const navigate = useNavigate();
    const { mealsId } = useParams();

    const getUser = async ()=> {
        const response = await fetch(getUserUrl, {
            method: 'GET',
            headers: {
                'authKey': localStorage.getItem('authKey')
            }
        });

        const res =  await response.json();

        switch (response.status) {
            case 200:
                setUserData({userData, res});
                break;
            case 401:
                navigate('/login');
                break;
            default:
                alert('Извините, что-то пошло не так');
                break;
        }
    }

    const currentMeal = STORE.MEALS.find((item)=> item.type === mealsId);

    const addProduct = (productStoreId, currentDishId)=> {
        const currentDish = STORE.DISHES.find((item)=> item.id === Number(productStoreId));
        currentDish.dishId = currentDishId;

        setDishesConsumed([...dishesConsumed, currentDish]);
    }

    const getDishes = async ()=> {
        const response = await fetch('http://pet.foodtracker.ru/diary', {
            method: 'GET',
            headers: {
                'authKey': localStorage.getItem('authKey')
            }
        });

        const res =  await response.json();

        const array = [];

        res.map((item, index)=> {
            STORE.DISHES.find((dish)=> {
                if ((item.dishID === dish.id) && (item.types === mealsId)) {
                    dish.dishId = item.ID;
                    array.push(dish)
                }
            });
        })

        setDishesConsumed(array);
    }

    const deleteDish = async (event)=> {
        const fetchUrlProducts = `http://pet.foodtracker.ru/diary/${event.target.getAttribute('data-dish-id')}`;

        await fetch(fetchUrlProducts, {
            method: 'DELETE',
            headers: {
                'authKey': localStorage.getItem('authKey'),
                'date': new Date().toISOString()
            }
        })

        const currentProduct = dishesConsumed.find((item)=> item.ID = (event.target.getAttribute('data-dish-id')));

        const array = dishesConsumed.filter(elem => Number(elem.ID) !== currentProduct.dishId);

        setDishesConsumed(array);
    }

    useEffect(()=> {
        getUser();
        getDishes();
    }, []);

    return (
        <div className="meals-item-page page-container">
            <h1 className="meals-item-page-title">
                { currentMeal.title }
            </h1>

            <ul className="dishes-list-consumed">
                {
                    dishesConsumed.map((item, index)=> {
                        return (
                            <li className="dishes-list-consumed-item" key={index}>
                                <p className="dishes-list-consumed-item-title">
                                    {item.name}
                                </p>
                                <button className="dishes-item-button" data-dish-id={item.dishId} onClick={deleteDish}>X</button>
                            </li>
                        )
                    })
                }
            </ul>

            <ul className="dishes-list">
                {
                    STORE.DISHES.map((item, index)=> {
                        if (item.type === mealsId) {
                            return (
                                <DishesItem item={item} onClick={addProduct} key={item.id}/>
                            )
                        }
                    })
                }
            </ul>
        </div>
    );
};

export default MealsItemPage;