const GENDER_LIST   = [
    {
        value: 'male',
        text: 'Женский'
    },
    {
        value: 'female',
        text: 'Мужской'
    },
]

const TARGET_LIST = [
    {
        value: 0.8,
        text: 'Снизить вес'
    },
    {
        value: 1,
        text: 'Поддержать текущий вес'
    },
    {
        value: 1.1,
        text: 'Набрать вес'
    }
]

const ACTIVITY_LEVEL_LIST = [
    {
        value: 1.2,
        text: 'Нет физических нагрузок и сидячая работа',
        degree: 'Низкий'
    },
    {
        value: 1.375,
        text: 'Небольшие пробежки или делаете легкую гимнастику 1–3 раза в неделю',
        degree: 'Средний'
    },
    {
        value: 1.55,
        text: 'Вы занимаетесь спортом со средними нагрузками 3–5 раз в неделю',
        degree: 'Умеренный'
    },
    {
        value: 1.725,
        text: 'Вы полноценно тренируетесь 6–7 раз в неделю',
        degree: 'Высокий'
    },
    {
        value: 1.9,
        text: 'Ваша работа связана с физическим трудом, вы тренируетесь 2 раза в день и включаете в программу тренировок силовые упражнения',
        degree: 'Очень высокий'
    }
]

const COEFFICIENTS_CALORIES = {
    WEIGHT: 10,
    HEIGHT: 6.25,
    AGE: 5,
    WOMEN: 161,
    MEN: 5
}

const ENERGY_VALUE_COEFFICIENTS= {
    CARBOHYDRATES: {
        PERCENT: 0.3,
        CALORIES_PER_GRAM: 4,
    },
    PROTEINS: {
        PERCENT: 0.3,
        CALORIES_PER_GRAM: 4,
    },
    FATS: {
        PERCENT: 0.4,
        CALORIES_PER_GRAM: 9,
    }
}

const DELAY_SHOW_INDICATOR_ERROR = 3000;

export {
    GENDER_LIST,
    TARGET_LIST,
    ACTIVITY_LEVEL_LIST,
    COEFFICIENTS_CALORIES,
    ENERGY_VALUE_COEFFICIENTS,
    DELAY_SHOW_INDICATOR_ERROR
}