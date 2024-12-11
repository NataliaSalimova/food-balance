import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";

import { getUserDataApi, getDishesApi } from '../../../api';

import STORE from '../../../store';

import Header from '../../header'
import RatioCalories from '../../ratio-calories';
import EssentialMacronutrients from '../../essential-macronutrients';
import Calendar from '../../calendar';
import Meals from '../../meals';
import WaterConsumption from '../../water-consumption';
import Loader from "../../loader";
import ErrorFallback from "../../error-fallback";

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
    const [ isLoading, setIsLoading ] = useState(true);

    const navigate = useNavigate();

    const getUserDataRequest = ()=> {
        return getUserDataApi();
    }

    const [count, setCount] = useState(5);

    const throwCounterClickHandler = e => {
        e.preventDefault();
        setCount(count - 1);
    };

    if (count <= 0) {
        throw new Error("Counter threw an error!");
    }

    const getUser = ()=> {
        const response = getUserDataRequest();

        switch (response.status) {
            case 200:
                getUserDataSuccess(response);
                break;
            case 401:
                getUserDataError();
                break;
            default:
                getUserDataErrorDefault();
                break;
        }

        setIsLoading(false);
    };

    const getUserDataSuccess = (response)=> {
        const {
            calories,
            caloriesRemaining,
            carbohydrates,
            carbohydratesTotal,
            proteins,
            proteinsTotal,
            fats,
            fatsTotal,
            cups
        } = response.responseJSON;

        setUser(prevState => ({
            ...prevState,
            caloriesRemaining: calories ?? caloriesRemaining,
            carbohydratesTotal: carbohydrates ?? carbohydratesTotal,
            proteinsTotal: proteins ?? proteinsTotal,
            fatsTotal: fats ?? fatsTotal,
            waterConsumed: cups ? cups.filter((cup) => cup.selected).length * 0.25 : 0,
            cups: cups ?? []
        }));
    }

    const getUserDataError = ()=> {
        navigate('/login');
    }

    const getUserDataErrorDefault = ()=> {
        //setIsErrorIndicator(true);
    }

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
        <div className="page-container">
            { isLoading ? <Loader/> : '' }
            <Header/>
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