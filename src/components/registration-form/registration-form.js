import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    const [ buttonPassword, setShowPassword ] = useState(false);
    const [ buttonConfirmPassword, setShowConfirmPassword ] = useState(false);
    const [ user, setUser ] = useState(false);

    const fetchURL = 'http://pet.foodtracker.ru/signUp';

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

        const response = await fetch(fetchURL, {
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

    const changeTypeFieldPassword = ()=> {
        setFormData(prevFormData => ({
            ...prevFormData,
            passwordType: prevFormData.passwordType === 'password' ? 'text' : 'password'
        }));
    }

    const changeTypeFieldConfirmPassword = ()=> {
        setFormData(prevFormData => ({
            ...prevFormData,
            confirmPasswordType: prevFormData.confirmPasswordType === 'password' ? 'text' : 'password'
        }));
    }

    const showPassword = (event)=> {
        event.preventDefault();

        const buttonType = event.currentTarget.dataset.buttonType;

        if (buttonType === 'buttonPassword') {
            changeTypeFieldPassword();
            setShowPassword(!buttonPassword);
        } else {
            changeTypeFieldConfirmPassword();
            setShowConfirmPassword(!buttonConfirmPassword);
        }
    }

    return (
        <form className="authorization-page-form">
            <div className="authorization-page-field">
                <label className="authorization-page-label">Имя</label>
                <input
                    className="authorization-page-input"
                    name="name"
                    placeholder="Имя"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}/>
                {error && !formData.name && <span className="error">*Пожалуйста, введите ваше имя</span>}
            </div>
            <div className="authorization-page-field">
                <label className="authorization-page-label">Логин</label>
                <input
                    className="authorization-page-input"
                    name="login"
                    placeholder="Логин"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}/>
                {error && !formData.login && <span className="error">*Пожалуйста, введите ваш логин</span>}
            </div>
            <div className="authorization-page-field">
                <label className="authorization-page-label">Email</label>
                <input
                    className="authorization-page-input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}/>
                {error && !formData.email && <span className="error">*Пожалуйста, введите ваш email</span>}
            </div>
            <div className="authorization-page-field">
                <label className="authorization-page-label">Пароль</label>
                <input
                    className="authorization-page-input"
                    type={formData.passwordType}
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}/>
                <button className={`authorization-page-password-button ${buttonPassword ? 'show' : ''}`}
                    data-button-type="buttonPassword" onClick={showPassword}>
                    <img src="/images/show-password.png" width="25" height="25" alt="Show password" />
                </button>
                {error && !formData.value && <span className="error">*Пожалуйста, введите пароль</span>}
                {!passwordMatch && <span className="error">Пароли не совпадают!</span>}
            </div>
            <div className="authorization-page-field">
                <label className="authorization-page-label">Подтверждение пароля</label>
                <input
                    className="authorization-page-input"
                    type={formData.confirmPasswordType}
                    name="confirmPassword"
                    placeholder="Подтверждение пароля"
                    value={formData.confirmPassword}
                    onChange={handleChange}/>
                <button className={`authorization-page-password-button ${buttonConfirmPassword ? 'show' : ''}`} data-button-type="buttonConfirmPassword" onClick={showPassword}>
                    <img src="/images/show-password.png" width="25" height="25" alt="Show password" />
                </button>
                {error && !formData.confirmPassword && <span className="error">*Подтвердите пароль</span>}
            </div>
            {user && <span className="error">
                *Пользователь с таким логином уже зарегистирован. Используйте другой логин или перейдите на <Link to="/login">страницу входа</Link>
            </span>}
            <button className="authorization-page-button" type="button" onClick={handleSubmit}>Зарегистрироваться</button>
        </form>
    );
}

export default RegistrationForm;
