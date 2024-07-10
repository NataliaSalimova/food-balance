import React from 'react';
import { Link } from 'react-router-dom';

import './meals-item.css';

const MealsItem = ({ meal }) => {
    return (
        <li className="meals-item">
            <p className="meals-title">{meal.title}</p>
            <Link to={meal.type} className="meals-button">+</Link>
        </li>
    )
}

export default MealsItem;

// const fetchUrlProducts = 'http://pet.foodtracker.ru/diary';

// const { value } = useContext(Context);

// const [caloriesOfDishesType, setCaloriesOfDishesType] = useState({});
//
// const normCcalMin = ()=> {
//     return Math.round(ccal*meal.normInPercententMin*0.01);
// }
//
// const normCcalMax = ()=> {
//     return Math.round(ccal*meal.normInPercententMax*0.01);
// }
//
// const onClickButton = ()=> {
//     if (!value) return;
//
//     setDishes(prev=> ({
//         ...prev,
//         array: prev.array.push(value)
//     }));
//
//     hideRecommend(true);
//     toggleDished(!initialStateDishes);
// }

// const showProducts = ()=> {
//     if (dishes.array.length) return;
//     return (
//         dishes.array.map((dish, index)=> {
//             if (dish.type === meal.type) {
//                 return (
//                     <div key={index}>
//                         <p>{dish.name}</p>
//                         <button data-dish-id={dish.ID} onClick={deleteButton}>Удалить</button>
//                     </div>
//                 )
//             }
//         })
//     )
// }

// const getConsumedCaloriesOfDishes = ()=> {
//     let consumedCaloriesOfDishes = {};
//
//     dishesConsumed.map((dish, index)=> {
//         if (consumedCaloriesOfDishes[dish.type]) {
//             consumedCaloriesOfDishes[dish.type] = consumedCaloriesOfDishes[dish.type] + dish.calories;
//         } else {
//             consumedCaloriesOfDishes[dish.type] = dish.calories;
//         }
//     });
//
//     setCaloriesOfDishesType(prev=>({
//         ...prev,
//         caloriesOfDishesType: consumedCaloriesOfDishes
//     }))
// }
//
// const deleteButton = async (event)=> {
//     const fetchUrlProducts = `http://pet.foodtracker.ru/diary/${event.target.getAttribute('data-dish-id')}`;
//
//     const response = await fetch(fetchUrlProducts, {
//         method: 'DELETE',
//         headers: {
//             'authKey': localStorage.getItem('authKey'),
//             'date': new Date().toISOString()
//         }
//     })
// }

// useEffect(()=> {
//     getConsumedCaloriesOfDishes();
//
//     // setDishes(prev=> ({
//     //     ...prev,
//     //     array: dishesConsumed
//     // }));
//
// }, [dishesConsumed]);


{/*<div className={`dishes-consumed ${!hide ? '' : ''}`}>*/}
{/*    /!*<p>{caloriesOfDishesType.caloriesOfDishesType ? caloriesOfDishesType.caloriesOfDishesType[meal.type] :  ''}</p>*!/*/}
{/*    {*/}
{/*        dishes.array.map((dish, index)=> {*/}
{/*            if (dish.type === meal.type) {*/}
{/*                return (*/}
{/*                    <div key={index}>*/}
{/*                        <p>{dish.name}</p>*/}
{/*                        <button data-dish-id={dish.ID}>Удалить</button>*/}
{/*                    </div>*/}
{/*                )*/}
{/*            }*/}
{/*        })*/}
{/*    }*/}
{/*</div>*/}

{/*<div className={!initialStateDishes ? 'hidden' : ''}>*/}
{/*    <ul className="dishes-list">*/}
{/*        {*/}
{/*            STORE.DISHES.map((dish, index)=> {*/}
{/*                if (dish.type === meal.type) {*/}
{/*                    return (*/}
{/*                        <ProductItem key={dish.id} product={dish} onClick={onClickButton} />*/}
{/*                    )*/}
{/*                }*/}
{/*            })*/}
{/*        }*/}
{/*    </ul>*/}
{/*</div>*/}