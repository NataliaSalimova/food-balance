import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ShowPasswordButton from '../show-password-button';

const LoginForm = ()=> {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        type: 'password'
    });
    const [ error, setError ] = useState(false);
    const [ user, setUser ] = useState(true);
    const navigate = useNavigate();

    const signInURL = 'http://pet.foodtracker.ru/signIn';

    const changeTypePassword = (type)=> {
        setFormData(prevFormData => ({
            ...prevFormData,
            type: type
        }));
    };

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event)=> {
        event.preventDefault();

        if (formData.login === '' || formData.password=== '') {
            setError(true)
        } else {
            setError(false);
            getUser();
        }
    }

    const getUser = async () => {
        const data = {
            login: formData.login,
            password: formData.password
        };

        await fetch(signInURL, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response)=> {
            // eslint-disable-next-line default-case
            switch (response.status) {
                case 200:
                    navigate('/calorie-calculation')
                    break;
                case 400 || 401:
                    setUser(false)
                    break;
            }
        }).catch(()=> alert('Извините, что-то пошло не так. Попробуйте позже'));
    };

    return (
        <form className="form">
            <div className="form__field">
                <label
                    className="form__label">
                    Логин
                </label>
                <input
                    className="form__input"
                    name="login"
                    placeholder="Логин"
                    id="login"
                    value={formData.login}
                    onChange={handleChange}/>
                {error && !formData.login && <span className="error">*Пожалуйста, введите ваш логин</span>}
            </div>
            <div className="form__field">
                <label
                    className="form__label">
                    Пароль
                </label>
                <input
                    className="form__input"
                    name="password"
                    type={formData.type}
                    placeholder="Пароль"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}/>

                { error && !formData.password && <span className="error">*Пожалуйста, введите ваш пароль</span> }

                <ShowPasswordButton onHandleClick={changeTypePassword}/>
            </div>

            { !user && <span className="error error_bottom">*Неверный логин или пароль</span> }

            <button
                className="form__button"
                onClick={handleSubmit}>
                Войти
            </button>

            <Link to="/registration" className="form__button ta-center">Зарегистрироваться</Link>
        </form>
    )
}

export default LoginForm;