import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setUserApi } from '../../../api';

import Field from '../field';
import ShowPassword from '../../buttons/show-password';
import Button from '../../buttons/base';

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
            <Field
                label={'Логин'}
                id={'login'}
                value={formData.login}
                onChange={handleChange}
                error={error}
                errorText={'*Пожалуйста, введите ваш логин'}
            />
            <div className="form__password">
                <Field
                    label={'Пароль'}
                    id={'password'}
                    value={formData.password}
                    type={formData.type}
                    onChange={handleChange}
                    error={error}
                    errorText={'*Пожалуйста, введите ваш пароль'}
                />

                <ShowPassword onHandleClick={changeTypePassword}/>
            </div>

            { !user && <span className="error error_bottom">*Неверный логин или пароль</span> }

            <Button handleSubmit={handleSubmit}>
                Войти
            </Button>

            <Link to="/registration" className="form__link ta-center">Зарегистрироваться</Link>
        </form>
    )
}

export default Login;