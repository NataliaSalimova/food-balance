import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { setUserApi } from '../../api';

import ShowPasswordButton from '../show-password-button';
import Button from '../button';

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
    const [ error, setError ] = useState(false);
    const [ passwordMatch, setPasswordMatch ] = useState(true);
    const [ user, setUser ] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const signUp = async ()=> {
        const { login, password, name, email } = formData;

        const user = {
            login,
            password,
            name,
            email
        };

        const result = await setUserApi('signUp', user);

        switch (result.status) {
            case 200:
                navigate('/calorie-calculation');
                localStorage.setItem('authKey', result.responseJSON.token);
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
        event.preventDefault();

        const { name, login, email, password, confirmPassword } = formData;

        if (name === '' ||
            login === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            setError(true);
        } else if (password !== confirmPassword) {
            setPasswordMatch(false);
        } else {
            signUp();
            setPasswordMatch(true);
            setError(false);
        }

        return error;
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
        <form className="form">
            <div className="form__field">
                <label className="form__label">Имя</label>
                <input
                    className="form__input"
                    name="name"
                    placeholder="Имя"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}/>
                {error && !formData.name && <span className="error">*Пожалуйста, введите ваше имя</span>}
            </div>
            <div className="form__field">
                <label className="form__label">Логин</label>
                <input
                    className="form__input"
                    name="login"
                    placeholder="Логин"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}/>
                {error && !formData.login && <span className="error">*Пожалуйста, введите ваш логин</span>}
            </div>
            <div className="form__field">
                <label className="form__label">Email</label>
                <input
                    className="form__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}/>
                {error && !formData.email && <span className="error">*Пожалуйста, введите ваш email</span>}
            </div>
            <div className="form__field">
                <label className="form__label">Пароль</label>
                <input
                    className="form__input"
                    type={formData.passwordType}
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}/>
                <ShowPasswordButton onHandleClick={changeTypePassword}/>
                {error && !formData.password && <span className="error">*Пожалуйста, введите пароль</span>}
            </div>
            <div className="form__field">
                <label className="form__label">Подтверждение пароля</label>
                <input
                    className="form__input"
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
            <Button handleSubmit={handleSubmit} text={"Зарегистрироваться"} />
            <Link to="/login" className="button ta-center">Войти</Link>
        </form>
    );
}

export default RegistrationForm;
