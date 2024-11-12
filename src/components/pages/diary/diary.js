import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './diary.module.scss';

import { getUserDataApi, getDishesApi } from '../../../api';

import RatioCalories from '../../ratio-calories';
import EssentialMacronutrients from '../../essential-macronutrients';
import Meals from '../../meals';
import Calendar from '../../calendar';
import WaterConsumption from '../../water-consumption';

import STORE from "../../../store";

function Diary() {
    const [user, setUser] = useState({
        caloriesConsumed: 0,
        carbohydratesConsumed: 0,
        proteinsConsumed: 0,
        fatsConsumed: 0,
        caloriesRemaining: 0,
        carbohydratesTotal: '',
        proteinsTotal: '',
        fatsTotal: '',
        dishesConsumed: [],
        waterConsumed: 0,
        cups: []
    });

    const navigate = useNavigate();

    const getUser = async ()=> {
        const response = await getUserDataApi();

        switch (response.status) {
            case 200:
                const res = response.responseJSON;

                setUser(prevState => ({
                    ...prevState,
                    caloriesRemaining: res.calories ?? res.caloriesRemaining,
                    carbohydratesTotal: res.carbohydrates ?? res.carbohydrates,
                    proteinsTotal: res.proteins ?? res.proteinsTotal,
                    fatsTotal: res.fats ?? res.fatsTotal,
                    waterConsumed: res.cups ? res.cups.filter((cup) => cup.selected).length * 0.25 : 0,
                    cups: res.cups ?? []
                }));

                break;

            case 401:
                navigate('/login');

                break;

            default:
                alert('Что-то пошло не так');

                break;
        }
    };

    const getDishes = async ()=> {
        const data= {
            date: new Date(localStorage.getItem('currentDate')).toISOString() ?? new Date().toISOString()
        }
        const result = await getDishesApi(data);

        let calories = 0;
        let carbohydratesConsumed = 0;
        let proteinsConsumed = 0;
        let fatsConsumed = 0;
        let dishes = [];

        result.responseJSON.map((item)=> {
            STORE.DISHES.find((dish)=> {
                if ((item.dishID === dish.id)) {
                    calories += dish.calories;
                    carbohydratesConsumed += dish.carbohydrates;
                    proteinsConsumed += dish.proteins;
                    fatsConsumed += dish.fats;
                    dishes.push(item);
                }
            });
        })

        setUser(prevState => ({
            ...prevState,
            caloriesConsumed: calories,
            carbohydratesConsumed: carbohydratesConsumed,
            proteinsConsumed: proteinsConsumed,
            fatsConsumed: fatsConsumed,
            dishesConsumed: dishes
        }));
    }

    useEffect(()=> {
        getUser();
        getDishes();
    }, []);

    return (
        <div className="diary-page page-container">
            <div className={styles.header}>
                <Link to='/' className={styles.link}>
                    FoodBalance
                </Link>
                <Link to='/profile' className={`page-link ${styles.profile}`}>
                    <img src="/images/profile.png"
                        width="30"
                        height="30"
                        alt="Icon profile"/>
                </Link>
            </div>

            <RatioCalories
                caloriesConsumed={user.caloriesConsumed}
                caloriesRemaining={user.caloriesRemaining}/>
            <EssentialMacronutrients
                carbohydratesTotal={user.carbohydratesTotal}
                proteinsTotal={user.proteinsTotal}
                fatsTotal={user.fatsTotal}
                carbohydratesConsumed={user.carbohydratesConsumed}
                proteinsConsumed={user.proteinsConsumed}
                fatsConsumed={user.fatsConsumed} />
            <Calendar onClick={getDishes}/>
            <Meals dishesConsumed={user.dishesConsumed}/>
            <WaterConsumption user={user}/>
        </div>
    );
}

export default Diary;