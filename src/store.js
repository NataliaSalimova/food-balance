const STORE = {
    DISHES: [
        {
            id: 1,
            name: 'Зеленый смузи',
            calories: 300,
            type: 'breakfast',
            proteins: 100,
            fats: 10,
            carbohydrates: 15,
        },
        {
            id: 2,
            name: 'Скрамбл со шпинатом и грибами',
            calories: 400,
            type: 'breakfast',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 3,
            name: 'Тост с авокадо и яйцом',
            calories: 400,
            type: 'breakfast',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 4,
            name: 'Курица по-гречески на салате',
            calories: 322,
            type: 'dinner',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 5,
            name: 'Боул с курицей и брокколи',
            calories: 400,
            type: 'dinner',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 6,
            name: 'Боул с тунцом и свеклой',
            calories: 400,
            type: 'dinner',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 7,
            name: 'Салат из семги и апельсина',
            calories: 322,
            type: 'eveningMeal',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 8,
            name: 'Стейк из семги и сальсой из киви',
            calories: 400,
            type: 'eveningMeal',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 9,
            name: 'Стейк из белой рыбы и зеленым салатом',
            calories: 400,
            type: 'dinner',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 10,
            name: 'Творог',
            calories: 400,
            type: 'snack',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 11,
            name: 'Черешня',
            calories: 400,
            type: 'snack',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 12,
            name: 'Груша',
            calories: 400,
            type: 'snack',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
        {
            id: 13,
            name: 'Груша',
            calories: 400,
            type: 'snack',
            proteins: 10,
            fats: 10,
            carbohydrates: 15
        },
    ],

    MEALS: [
        {
            id: 1,
            title: 'Завтрак',
            type: 'breakfast',
            normInPercententMin: 25,
            normInPercententMax: 30
        },
        {
            id: 2,
            title: 'Обед',
            type: 'dinner',
            normInPercententMin: 30,
            normInPercententMax: 35
        },
        {
            id: 3,
            title: 'Ужин',
            type: 'eveningMeal',
            normInPercententMin: 20,
            normInPercententMax: 25
        },
        {
            id: 4,
            title: 'Снек',
            type: 'snack',
            normInPercententMin: 10,
            normInPercententMax: 15
        }
    ]
};

export default STORE;