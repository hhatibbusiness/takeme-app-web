import React, {useEffect, useState} from 'react';
import './Register.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import UserDetails from "../../components/RegisterComponents/UserDetails/UserDetails";
import Step from "../../components/RegisterComponents/Step/Step";
import EmailVerify from "../../components/RegisterComponents/EmailVerify/EmailVerify";
import Submit from '../../components/RegisterComponents/Submit/Submit';
import AuthenticationError from '../../components/AuthenticationError/AuthenticationError';

const Register = () => {
    const [form, setForm] = useState({
        username: {
            value: '',
            type: 'text',
            rules: {
                required: true
            },
            valid: false,
            touched: false,
            name: 'username'
        },
        phone: {
            value: '',
            type: 'tel',
            rules: {
                required: true
            },
            valid: false,
            touched: false,
            name: 'phone'
        },
        email: {
            value: '',
            type: 'email',
            rules: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            name: 'email'
        },
        password: {
            value: '',
            type: 'password',
            rules: {
                required: true,
                passwordMatch: true
            },
            valid: false,
            touched: false,
            name: 'password'
        },
        confirmPassword: {
            value: '',
            type: 'password',
            rules: {
                required: true,
                match: true
            },
            valid: false,
            touched: false,
            name: 'confirmPassword'
        }
    });
    const [city, setCity] = useState({
        type: 'text',
        value: '',
        valid: false,
        rules: {
            required: true
        },
        name: 'city',
        touched: false

    })
    const [isValid, setIsValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [agree, setAgree] = useState(false);
    const [step, setStep] = useState(1);
    const [phoneActive, setPhoneActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [usernameActive, setUsernameActive] = useState(false);
    const [confirmPasswordActive, setConfirmPasswordActive] = useState(false);
    const [emailActive, setEmailActive] = useState(false);
    const [cityActive, setCityActive] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        const home = document.querySelector('body');

        const freezeStyles = () => {
            home.classList.add('Home__hide')
        }
        const releaseStyles = () => {
            home.classList.remove('Home__hide')
        }

        freezeStyles();

        return () => {
            releaseStyles();
        }

    }, []);

    const formSbumitHandler = e => {

    }

    const stepRenderer = () => {
        switch (step) {
            case 1:
                return (
                    <UserDetails
                        step={step}
                        setStep={setStep}
                        passwordActive={passwordActive}
                        setPasswordActive={setPasswordActive}
                        phoneActive={phoneActive}
                        setPhoneActive={setPhoneActive}
                        usernameActive={usernameActive}
                        setUsernameActive={setUsernameActive}
                        confirmPasswordActive={confirmPasswordActive}
                        setConfirmPasswordActive={setConfirmPasswordActive}
                        emailActive={emailActive}
                        setEmailActive={setEmailActive}
                        form={form}
                        setForm={setForm}
                        isValid={isValid}
                        setIsValid={setIsValid}
                    />
                );
            case 2:
                return (
                    <EmailVerify
                        form={form}
                        setStep={setStep}
                        step={step}
                    />
                )
            case 3:
                return (
                    <Submit
                        form={form}
                        setForm={setForm}
                        agree={agree}
                        setAgree={setAgree}
                        emailActive={emailActive}
                        setEmailActive={setEmailActive}
                        cityActive={cityActive}
                        setCityActive={setCityActive}
                        city={city}
                        setCity={setCity}
                        isValid={isValid}
                        formIsValid={formIsValid}
                        setFormIsValid={setFormIsValid}
                    />
                )
        }
    }

    return (
        <div className={'Register'}>
            <Navbar backBtn={true} midText={t('Register')} />
            <Step 
                step={step} 
                setStep={setStep}
                form={form}
                isValid={isValid}
            />
            <form onSubmit={formSbumitHandler} autoCorrect={'off'} autoComplete={'off'} className="Register__form">
                {
                    stepRenderer()
                }
            </form>
            <AuthenticationError errorMessage={'بيانات خاطئة'} />

        </div>
    );
};

export default Register;