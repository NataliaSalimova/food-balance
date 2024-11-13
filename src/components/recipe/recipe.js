import React from 'react';
import { Link } from 'react-router-dom';

import styles from './recipe.module.scss';

const Recipe = ({ recipe, recipeId })=> {
    const {
        description,
        data: {
            ingredients,
            calories,
            carbohydrates,
            fats,
            proteins,
            portion
        }
    } = recipe;

    return (
        <div className={styles.list}>
            <div className={styles.item}>
                <p className={styles.subtitle}>
                    Ингредиенты
                </p>
                <p className={styles.description}>
                    { ingredients }
                </p>
            </div>
            <div className={styles.item}>
                <p className={styles.description}>
                    { description }
                </p>
            </div>
            {
                calories && <div className={styles.item}>
                    <p className={styles.subtitle}>
                        Количество калорий
                    </p>
                    <p className={styles.description}>
                        { calories } ккал
                    </p>
                </div>
            }
            {
                carbohydrates && <div className={styles.item}>
                    <p className={styles.subtitle}>
                        Количество углеводов
                    </p>
                    <p className={styles.description}>
                        { carbohydrates } г
                    </p>
                </div>
            }
            {
                fats && <div className={styles.item}>
                    <p className={styles.subtitle}>
                        Количество жиров
                    </p>
                    <p className={styles.description}>
                        { fats } г
                    </p>
                </div>
            }
            {
                proteins && <div className={styles.item}>
                    <p className={styles.subtitle}>
                        Количество белков
                    </p>
                    <p className={styles.description}>
                        { proteins } г
                    </p>
                </div>
            }
            {
                <div className={styles.item}>
                    <p className={styles.subtitle}>
                        Количество белков
                    </p>
                    <p className={styles.description}>
                        { proteins } г
                    </p>
                </div>
            }
            <div className={styles.item}>
                <p className={styles.subtitle}>
                    Количество порций
                </p>
                <p className={styles.description}>
                    { portion }
                </p>
            </div>
            <Link className="link ta-center" to={`/recipe/edit/${recipeId}`}>Редактировать рецепт</Link>
        </div>
    )
}

export default Recipe;