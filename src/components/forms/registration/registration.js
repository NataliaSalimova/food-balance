import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { setUserApi } from '../../../api';

import ShowPassword from '../../buttons/show-password';
import Button from '../../buttons/base';
import Field from '../field';

const Registration = ()=> {
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
            <Field
                label={'Имя'}
                id={'name'}
                value={formData.name}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, введите ваше имя'}
            />
            <Field
                label={'Логин'}
                id={'login'}
                value={formData.login}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, введите ваш логин'}
            />
            <Field
                label={'Email'}
                id={'email'}
                value={formData.email}
                type={'email'}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, введите ваш email'}
            />
            <div className="form__password">
                <Field
                    label={'Пароль'}
                    id={'password'}
                    value={formData.password}
                    type={formData.passwordType}
                    onChange={handleChange}
                    error={error}
                    errorText={'*Пожалуйста, введите пароль'}
                />
                <ShowPassword onHandleClick={changeTypePassword}/>
            </div>
            <div className="form__password">
                <Field
                    label={'Подтверждение пароля'}
                    id={'confirmPassword'}
                    value={formData.confirmPassword}
                    type={formData.confirmPasswordType}
                    onChange={handleChange}
                    error={error}
                    errorText={'*Подтвердите пароль'}
                />
                <ShowPassword onHandleClick={changeTypeConfirmPassword}/>
            </div>
            {!passwordMatch && <span className="error">Пароли не совпадают!</span>}

            {user && <span className="error">
                *Пользователь с таким логином уже зарегистрирован. Используйте другой логин или перейдите на
                <Link to="/login">страницу входа</Link>
            </span>}
            <Button handleSubmit={handleSubmit}>
                Зарегистрироваться
            </Button>
            <Link to="/login" className="button ta-center">Войти</Link>
        </form>
    );
}

export default Registration;
