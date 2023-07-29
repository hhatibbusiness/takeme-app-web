import React, {useEffect, useState} from 'react';
import './Register.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import UserDetails from "../../components/RegisterComponents/UserDetails/UserDetails";
import Step from "../../components/RegisterComponents/Step/Step";
import PhoneVerify from "../../components/RegisterComponents/PhoneVerify/PhoneVerify";

const Register = () => {
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [agree, setAgree] = useState('');
    const [phoneActive, setPhoneActive] = useState(false);
    const [passwordActive, setPasswordActive] = useState(false);
    const [usernameActive, setUsernameActive] = useState(false);
    const [confirmPasswordActive, setConfirmPasswordActive] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        const home = document.querySelector('body');

        const freezeStyles = () => {
            // home && (home.style.height = '100vh')
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
                        phone={phone}
                        setPhone={setPhone}
                        step={step}
                        setStep={setStep}
                        username={userName}
                        setUserName={setUserName}
                        password={password}
                        setPassword={setPassword}
                        passwordActive={passwordActive}
                        setPasswordActive={setPasswordActive}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        phoneActive={phoneActive}
                        setPhoneActive={setPhoneActive}
                        usernameActive={usernameActive}
                        setUsernameActive={setUsernameActive}
                        confirmPasswordActive={confirmPasswordActive}
                        setConfirmPasswordActive={setConfirmPasswordActive}
                    />
                );
            case 2:
                return (
                    <PhoneVerify
                        phone={phone}
                        setStep={setStep}
                        step={step}
                    />
                )
        }
    }

    return (
        <div className={'Register'}>
            <Navbar backBtn={true} midText={t('Register')} />
            <Step step={step} setStep={setStep} />
            <form onSubmit={formSbumitHandler} autoCorrect={'off'} autoComplete={'off'} className="Register__form">
                {
                    stepRenderer()
                }
                {/*<div className="Register__form--element">*/}
                {/*    <button className="Register__form--button">{true ? <i className="fa-solid fa-circle-notch"></i> : t('Registerbtn')}</button>*/}
                {/*    <p className="Register__form--register">{t('create')}?<NavLink className={'Register__form--register-link'} to={'/register'}>{t('Registerregister')}</NavLink></p>*/}
                {/*</div>*/}
            </form>

        </div>
    );
};

export default Register;