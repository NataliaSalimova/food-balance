import React, {Fragment, useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { setUserApi } from '../../../api';

import Field from '../field';
import ShowPasswordButton from '../../buttons/show-password';
import Button from '../../buttons/base';

import Loader from '../../loader';
import ErrorIndicator from '../../error-indicator';

import DELAY_SHOW_INDICATOR_ERROR from './login.constants';

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
    const [ isErrorIndicator, setIsErrorIndicator ] = useState(false);
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

    const onValidateForm = (event)=> {
        event.preventDefault();

        const { login, password } = formData;

        if (login === '' || password=== '') {
            setError(true);
            setIsLoading(false);
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
                onGetUserErrorDefault();
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

    const onGetUserErrorDefault = ()=> {
        setIsErrorIndicator(true);

        setTimeout(()=> {
            setIsErrorIndicator(false);
        }, DELAY_SHOW_INDICATOR_ERROR);
    }

    useEffect(()=> {
        if (isSubmitForm) signIn();
    }, [isSubmitForm])

    return (
        <Fragment>
            { isLoading ? <Loader/> : '' }
            { isErrorIndicator ? <ErrorIndicator/> : '' }
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

                <Button handleSubmit={onValidateForm}>
                    Войти
                </Button>

                <Link to="/registration" className="link ta-center">Зарегистрироваться</Link>
            </form>
        </Fragment>
    )
}

export default Login;
