import React, {Fragment, useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { setUserApi } from '../../../api';

import ShowPasswordButton from '../../buttons/show-password';
import Button from '../../buttons/base';
import Field from '../field';
import Loader from '../../loader';
import ErrorIndicator from '../../error-indicator';

import DELAY_SHOW_INDICATOR_ERROR from './registration.constants';

const Registration = ()=> {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        login: '',
        password: '',
        confirmPassword: '',
    });
    const [ passwordTypes, setPasswordTypes ] = useState({
        password: 'password',
        confirmPassword: 'password'
    });
    const [ error, setError ] = useState(false);
    const [ passwordMatch, setPasswordMatch ] = useState(true);
    const [ user, setUser ] = useState(false);
    const [ isSubmitForm, setIsSubmitForm ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isErrorIndicator, setIsErrorIndicator ] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event)=> {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const signUpRequest = async ()=> {
        const { login, password, name, email } = formData;
        const user = { login, password, name, email };

        return  await setUserApi('signUp', user);
    }

    const signUp = async ()=> {
        const result = await signUpRequest();

        switch (result.status) {
            case 200:
                onSignUpSuccess();
                break;
            case 409:
                onSignUpError();
                break;
            default:
                onSignUpErrorDefault();
                break;
        }

        setIsLoading(false);
        setIsSubmitForm(false);
    }

    const onSignUpSuccess = (token)=> {
        navigate('/calorie-calculation');
        localStorage.setItem('authKey', token);
    }

    const onSignUpError = ()=> {
        setUser(true);
    }

    const onSignUpErrorDefault = ()=> {
        setIsErrorIndicator(true);

        setTimeout(()=> {
            setIsErrorIndicator(false);
        }, DELAY_SHOW_INDICATOR_ERROR);
    }

    const validateForm = ()=> {
        const { name, login, email, password, confirmPassword } = formData;

        if (name === '' ||
            login === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            setError(true);
            setIsSubmitForm(false);
        } else if (password !== confirmPassword) {
            setPasswordMatch(false);
            setIsSubmitForm(false);
        } else {
            setError(false);
            setPasswordMatch(true);
            setIsLoading(true);
            setIsSubmitForm(true);
        }

        return error;
    }

    const onSubmitForm = (event) => {
        event.preventDefault();

        validateForm();
    }

    const changeTypePassword = (typeInputPassword, typeButtonPassword)=> {
        setPasswordTypes(prevState => ({
            ...prevState,
            [typeButtonPassword]: typeInputPassword
        }));
    }

    useEffect(()=> {
        if (isSubmitForm) signUp();
    }, [isSubmitForm])

    return (
        <Fragment>
            { isErrorIndicator ? <ErrorIndicator/> : '' }
            { isLoading ? <Loader/> : '' }
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
                        type={passwordTypes.password}
                        onChange={handleChange}
                        error={error}
                        errorText={'*Пожалуйста, введите пароль'}
                    />
                    <ShowPasswordButton onChangeTypePassword={changeTypePassword}/>
                </div>
                <div className="form__password">
                    <Field
                        label={'Подтверждение пароля'}
                        id={'confirmPassword'}
                        value={formData.confirmPassword}
                        type={passwordTypes.confirmPassword}
                        onChange={handleChange}
                        error={error}
                        errorText={'*Подтвердите пароль'}
                    />
                    <ShowPasswordButton onChangeTypePassword={changeTypePassword} typeButtonPassword="confirmPassword"/>
                </div>
                {!passwordMatch && <span className="error">Пароли не совпадают!</span>}

                {user && <span className="error">
                    *Пользователь с таким логином уже зарегистрирован. Используйте другой логин или перейдите на
                    <Link to="/login"> страницу входа</Link>
                </span>}
                <Button handleSubmit={onSubmitForm}>
                    Зарегистрироваться
                </Button>
                <Link to="/login" className="link ta-center">Войти</Link>
            </form>
        </Fragment>
    );
}

export default Registration;
