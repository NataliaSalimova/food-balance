import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setUserApi } from '../../../api';

import ShowPassword from '../../buttons/show-password';
import Button from '../../buttons/base'

const Login = ()=> {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        type: 'password'
    });
    const [ error, setError ] = useState(false);
    const [ user, setUser ] = useState(true);
    const navigate = useNavigate();

    const changeTypePassword = (type)=> {
        setFormData(prevFormData => ({
            ...prevFormData,
            type: type
        }));
    };

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(test => ({
            ...test,
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
        const user = {
            login: formData.login,
            password: formData.password
        };

        const result = await setUserApi('signIn', user)

        switch (result.status) {
            case 200:
                navigate('/diary');
                localStorage.setItem('authKey', result.responseJSON.token);
                break;
            case 400 || 401:
                setUser(false);
                break;
            default:
                alert('Извините, что-то пошло не так. Попробуйте зарегистироваться позже');
                break;
        }
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

                <ShowPassword onHandleClick={changeTypePassword}/>
            </div>

            { !user && <span className="error error_bottom">*Неверный логин или пароль</span> }

            <Button handleSubmit={handleSubmit}>
                Войти
            </Button>

            <Link to="/registration" className="button ta-center">Зарегистрироваться</Link>
        </form>
    )
}

export default Login;