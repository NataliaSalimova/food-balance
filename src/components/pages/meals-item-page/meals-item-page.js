import React, {useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import './meals-item-page.css';

import STORE from '../../../store';

const MealsItemPage = () => {
    let { mealsId } = useParams();

    const currentMeal = STORE.MEALS.find((item)=> item.type === mealsId);

    return (
        <div className="meals-item-page page-container">
            <h1 className="meals-item-page-title">
                { currentMeal.title }
            </h1>

            <ul className="dishes-list">
                {
                    STORE.DISHES.map((item, index)=> {
                        if (item.type === mealsId) {
                            return (
                                <li className="dishes-item" key={index}>
                                    <div className="dishes-item-container">
                                        <div>
                                            <p className="dishes-item-name">
                                                {item.name}
                                            </p>
                                            <p className="dishes-item-calories">
                                                {item.calories} ккал
                                            </p>
                                        </div>
                                        <button className="dishes-item-button">+</button>
                                    </div>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </div>
    );
};

export default MealsItemPage;

// const { name, calories } = product;
//     const { setValue } = useContext(Context);
//     const fetchUrl = 'http://pet.foodtracker.ru/diary';
//     const addProduct = (event) => {
//         setValue(product);
//         onClick(product);
//         //saveProduct();
//     }
//
//     const saveProduct = async ()=> {
//         const data = {
//             dishID: product.id,
//             types: product.type,
//             date: new Date().toISOString()
//         };
//
//         await fetch(fetchUrl, {
//             method: 'PUT',
//             headers: {
//                 'authKey': localStorage.getItem('authKey')
//             },
//             body: JSON.stringify(data)
//         })
//             .then(response => response.json())
//             // .then(data => console.log(data))
//             .catch(error => console.error(error));
//     }
//
//     return (
//         <li className="product-item">
//             <div className="product-item-container">
//                 <p className="product-item-name">
//                     {name}
//                 </p>
//                 <p className="product-item-calories">
//                     {calories} ккал
//                 </p>
//                 <button onClick={addProduct}>+</button>
//             </div>
//         </li>
//     )