import React, {Fragment, useEffect, useState} from 'react';
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
    const [ passwordType, setPasswordType ] = useState({
        password: 'password'
    });
    const [ error, setError ] = useState(false);
    const [ user, setUser ] = useState(true);
    const [ isSubmitForm, setIsSubmitForm ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const changeTypePassword = (typeInputPassword)=> {
        setPasswordType(typeInputPassword);
    }

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onValidationForm = (event)=> {
        event.preventDefault();

        const { login, password } = formData;

        if (login === '' || password=== '') {
            setError(true);
            setIsSubmitForm(false);
        } else {
            setError(false);
            setIsLoading(true);
            setIsSubmitForm(true);
        }
    }

    const signInRequest = async () => {
        return await setUserApi('signIn', formData);
    };

    const signIn = async ()=> {
        const result = await signInRequest();

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
        setIsSubmitForm(false);
    }

    const onGetUserSuccess = (token)=> {
        navigate('/diary');
        localStorage.setItem('authKey', token);
    }

    const onGetUserError = ()=> {
        setUser(false);
    }

    useEffect(()=> {
        if (isSubmitForm) signIn();
    }, [isSubmitForm])

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
                        type={passwordType}
                        onChange={handleChange}
                        error={error}
                        errorText={'*Пожалуйста, введите ваш пароль'}
                    />

                    <ShowPasswordButton onChangeTypePassword={ changeTypePassword }/>
                </div>

                { !user && <span className="error">*Неверный логин или пароль</span> }

                <Button handleSubmit={onValidationForm}>
                    Войти
                </Button>

                <Link to="/registration" className="link ta-center">Зарегистрироваться</Link>
            </form>
        </Fragment>
    )
}

export default Login;
