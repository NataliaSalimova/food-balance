import React, {Fragment, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setUserApi } from '../../../api';

import Field from '../field';
import ShowPasswordButton from '../../buttons/show-password';
import Button from '../../buttons/base';

import Loader from "../../loader";

const Login = ()=> {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        type: 'password'
    });
    const [ error, setError ] = useState(false);
    const [ user, setUser ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
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
            setIsLoading(true);
            getUser();
        }
    }

    const getUserRequest = async () => {
        return await setUserApi('signIn', formData);
    };

    const getUser = async ()=> {
        const result = await getUserRequest();

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

        setIsLoading(false);
    }

    const onGetUserSuccess = (token)=> {
        navigate('/diary');
        localStorage.setItem('authKey', token);
    }

    const onGetUserError = ()=> {
        setUser(false);
    }

    return (
        <Fragment>
            { isLoading ? <Loader/> : '' }
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

                { !user && <span className="error">*Неверный логин или пароль</span> }

                <Button handleSubmit={handleSubmit}>
                    Войти
                </Button>

                <Link to="/registration" className="link ta-center">Зарегистрироваться</Link>
            </form>
        </Fragment>
    )
}

export default Login;
