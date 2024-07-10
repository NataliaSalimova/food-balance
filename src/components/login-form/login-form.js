import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login-form.css';

const LoginForm = ()=> {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        passwordType: 'password'
    });

    const [ show, setShow ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ user, setFoundUser ] = useState(true);
    const navigate = useNavigate();

    const fetchURL = 'http://pet.foodtracker.ru/signIn';

    const handleChange = (event)=> {
        const target = event.target;

        const { name, value } = target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const showPassword = (event)=> {
        event.preventDefault();

        setFormData(prevFormData => ({
            ...prevFormData,
            passwordType: prevFormData.passwordType === 'password' ? 'text' : 'password'
        }));

        setShow(!show);
    };

    const handleSubmit = (event)=> {
        event.preventDefault();

        validateForm();

        findUser();
    }

    const validateForm = ()=> {
        if (formData.login === '' || formData.password === '') {
            setError(true);
        } else {
            setError(false);
        }
    };

    const findUser = async () => {
        const data = {
            login: formData.login,
            password: formData.password
        };

        await fetch(fetchURL, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((response)=> {
            if (response.status === 200) navigate('/calorie-calculation');
        }).catch(()=> {
            alert('Что-то пошло не так')
        })
    };

    return (
        <form className="login-page-form">
            <div className="login-page-field">
                <label
                    className="login-page-label">
                    Логин
                </label>
                <input
                    className="login-page-input"
                    name="login"
                    placeholder="Логин"
                    id="login"
                    value={formData.login}
                    onChange={handleChange}/>
                {error && !formData.login && <span className="error">*Пожалуйста, введите ваш логин</span>}
            </div>
            <div className="login-page-field">
                <label
                    className="login-page-label">
                    Пароль
                </label>
                <input
                    className="login-page-input"
                    name="password"
                    type={formData.passwordType}
                    placeholder="Пароль"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}/>
                {error && !formData.password && <span className="error">*Пожалуйста, введите ваш пароль</span>}
                <button className={`login-page-password-button ${show ? 'show' : ''}`} onClick={showPassword}>
                    <img src="/images/show-password.png" width="25" height="25" alt="Show password" />
                </button>
            </div>
            {!user && <span className="error error_bottom">*Incorrect login or password entered</span>}
            <button
                className="login-page-button"
                onClick={handleSubmit}>
                Войти
            </button>
        </form>
    )
}

export default LoginForm;