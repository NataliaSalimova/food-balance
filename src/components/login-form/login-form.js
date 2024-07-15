import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import './login-form.scss';

const LoginForm = ()=> {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        type: 'password'
    });
    const [ error, setError ] = useState(false);
    const [ user, setFoundUser ] = useState(true);
    const navigate = useNavigate();

    const fetchURL = 'http://pet.foodtracker.ru/signIn';

    const showPassword = (event)=> {
        event.preventDefault();

        setFormData(prevFormData => ({
            ...prevFormData,
            type: prevFormData.type === 'password' ? 'text' : 'password'
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
            if (response.status === 200) navigate('/calorie-calculation');
            if (response.status === 401 || response.status === 400) setFoundUser(false);
        }).catch(()=> {
            alert('Что-то пошло не так')
        })
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

                {error && !formData.password && <span className="error">*Пожалуйста, введите ваш пароль</span>}

                <button className={`login-form__password-button ${formData.type === 'text' ? 'show' : ''}`} onClick={showPassword}>
                    <img src="/images/show-password.png" width="25" height="25" alt="Show password" />
                </button>
            </div>

            {!user && <span className="error error_bottom">*Неверный логин или пароль</span>}

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