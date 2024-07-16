import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ShowPasswordButton from '../show-password-button';

import './login-form.scss';

const LoginForm = ()=> {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        type: 'password'
    });
    const [ error, setError ] = useState(false);
    const [ user, setUser ] = useState(true);
    const navigate = useNavigate();

    const fetchURL = 'http://pet.foodtracker.ru/signIn';

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

        await fetch(fetchURL, {
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
        }).catch((error) => console.log(error));
    };

    return (
        <form className="login-form">
            <div className="login-form__field">
                <label
                    className="login-form__label">
                    Логин
                </label>
                <input
                    className="login-form__input"
                    name="login"
                    placeholder="Логин"
                    id="login"
                    value={formData.login}
                    onChange={handleChange}/>
                {error && !formData.login && <span className="error">*Пожалуйста, введите ваш логин</span>}
            </div>
            <div className="login-form__field">
                <label
                    className="login-form__label">
                    Пароль
                </label>
                <input
                    className="login-form__input"
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
                className="login-form__button"
                onClick={handleSubmit}>
                Войти
            </button>

            <Link to="/registration" className="login-form__button">Зарегистрироваться</Link>
        </form>
    )
}

export default LoginForm;