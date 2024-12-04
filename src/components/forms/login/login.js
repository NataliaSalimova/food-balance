import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setUserApi } from '../../../api';

import Field from '../field';
import ShowPasswordButton from '../../buttons/show-password';
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
        setFormData(prevState => ({
            ...prevState,
            type: type
        }));
    };

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event)=> {
        event.preventDefault();

        const { login, password } = formData;

        if (login === '' || password=== '') {
            setError(true)
        } else {
            setError(false);
            getUser();
        }
    }

    const getUser = async () => {
        const { login, password } = formData;

        const user = { login, password };
        const result = await setUserApi('signIn', user)

        switch (result.status) {
            case 200:
                onGetUserSuccess(result.responseJSON.token);
                break;
            case 400 || 401:
                onGetUserError();
                break;
            default:
                alert('Извините, что-то пошло не так. Попробуйте позже');
                break;
        }
    };

    const onGetUserSuccess = (token)=> {
        navigate('/diary');
        localStorage.setItem('authKey', token);
    }

    const onGetUserError = ()=> {
        setUser(false);
    }

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

                <ShowPasswordButton onChangeTypePassword={ changeTypePassword }/>
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