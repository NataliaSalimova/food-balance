import React, { useState } from 'react';

const ShowPasswordButton = ({isPasswordShow, buttonType})=> {
    const [formData, setFormData] = useState({
        passwordType: 'password',
        confirmPasswordType: 'password'
    });

    const [ buttonPassword, setShowPassword ] = useState(false);
    const [ buttonConfirmPassword, setShowConfirmPassword ] = useState(false);
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
        <button className={`authorization-page-password-button ${isPasswordShow ? 'show' : ''}`}
            data-button-type={buttonType} onClick={showPassword}>
            <img src="/images/show-password.png" width="25" height="25" alt="Show password" />
        </button>
    )
}

export default ShowPasswordButton;