import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ShowPasswordButton from "../show-password-button";

const RegistrationForm = ()=> {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        login: '',
        password: '',
        passwordType: 'password',
        confirmPassword: '',
        confirmPasswordType: 'password'
    });
    const navigate = useNavigate();

    const [ error, setError ] = useState(false);
    const [ passwordMatch, setPasswordMatch ] = useState(true);
    const [ user, setUser ] = useState(false);

    const signUp = 'http://pet.foodtracker.ru/signUp';

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validateForm = ()=> {
        if (formData.name === '' || formData.login === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '') {
            setError(true);
        } else {
            setError(false);
        }
    }

    const saveUser = ()=> {
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
        } else if (formData.confirmPassword === '') {
            setError(true);
        } else {
            setPasswordMatch(true);

            saveUserRequest();
        }
    }
    
    const saveUserRequest = async () => {
        const data = {
            login: formData.login,
            password: formData.password,
            name: formData.name,
            email: formData.email
        };

        const response = await fetch(signUp, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        const result = await response.json();

        switch (response.status) {
            case 200:
                navigate('/calorie-calculation');
                localStorage.setItem('authKey', result.token);
                break;
            case 409:
                setUser(true)
                break;
            default:
                alert('Извините, что-то пошло не так. Попробуйте зарегистироваться позже');
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        validateForm();
        saveUser();
    }

    const changeTypePassword = ()=> {
        setFormData(prevFormData => ({
            ...prevFormData,
            passwordType: prevFormData.passwordType === 'password' ? 'text' : 'password'
        }));
    }

    const changeTypeConfirmPassword = ()=> {
        setFormData(prevFormData => ({
            ...prevFormData,
            confirmPasswordType: prevFormData.confirmPasswordType === 'password' ? 'text' : 'password'
        }));
    }

    return (
        <form className="authorization-form">
            <div className="authorization-form__field">
                <label className="authorization-form__label">Имя</label>
                <input
                    className="authorization-form__input"
                    name="name"
                    placeholder="Имя"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}/>
                {error && !formData.name && <span className="error">*Пожалуйста, введите ваше имя</span>}
            </div>
            <div className="authorization-form__field">
                <label className="authorization-form__label">Логин</label>
                <input
                    className="authorization-form__input"
                    name="login"
                    placeholder="Логин"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}/>
                {error && !formData.login && <span className="error">*Пожалуйста, введите ваш логин</span>}
            </div>
            <div className="authorization-form__field">
                <label className="authorization-form__label">Email</label>
                <input
                    className="authorization-form__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}/>
                {error && !formData.email && <span className="error">*Пожалуйста, введите ваш email</span>}
            </div>
            <div className="authorization-form__field">
                <label className="authorization-form__label">Пароль</label>
                <input
                    className="authorization-form__input"
                    type={formData.passwordType}
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}/>
                <ShowPasswordButton onHandleClick={changeTypePassword}/>
                {error && !formData.password && <span className="error">*Пожалуйста, введите пароль</span>}
            </div>
            <div className="authorization-form__field">
                <label className="authorization-form__label">Подтверждение пароля</label>
                <input
                    className="authorization-form__input"
                    type={formData.confirmPasswordType}
                    name="confirmPassword"
                    placeholder="Подтверждение пароля"
                    value={formData.confirmPassword}
                    onChange={handleChange}/>
                <ShowPasswordButton onHandleClick={changeTypeConfirmPassword}/>
                {error && !formData.confirmPassword && <span className="error">*Подтвердите пароль</span>}
            </div>
            {!passwordMatch && <span className="error">Пароли не совпадают!</span>}

            {user && <span className="error">
                *Пользователь с таким логином уже зарегистирован. Используйте другой логин или перейдите на <Link to="/login">страницу входа</Link>
            </span>}
            <button className="authorization-form__button" type="button" onClick={handleSubmit}>Зарегистрироваться</button>
            <Link to="/login" className="authorization-form__button ta-center">Войти</Link>
        </form>
    );
}

export default RegistrationForm;
