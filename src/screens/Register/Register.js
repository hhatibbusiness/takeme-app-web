// import React, {useEffect, useState} from 'react';
// import './Register.scss';
// import Navbar from "../../components/HOC/Navbar/Navbar";
// import {useTranslation} from "react-i18next";
// import UserDetails from "../../components/RegisterComponents/UserDetails/UserDetails";
// import Step from "../../components/RegisterComponents/Step/Step";
// import EmailVerify from "../../components/RegisterComponents/EmailVerify/EmailVerify";
// import Submit from '../../components/RegisterComponents/Submit/Submit';
// import AuthenticationError from '../../components/AuthenticationError/AuthenticationError';
// import {connect} from "react-redux";
// import {sendEmailVerifyCodeToCustomer} from "../../store/actions/register.actions";
// import {sendCodeToServer} from "../../store/actions/register.actions";
// import {registerError} from "../../store/actions/register.actions";
// import {Outlet} from "react-router-dom";
//
// const Register = ({errorMessage, validation, registerError, sendingCodeToServer, sendCodeToServer, sendingCodeToCustomer, sendEmailVerifyCodeToCustomer, lan}) => {
//     const [form, setForm] = useState({
//         username: {
//             value: '',
//             type: 'text',
//             rules: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             name: 'username'
//         },
//         phone: {
//             value: '',
//             type: 'tel',
//             rules: {
//                 required: true,
//                 isNumber: true,
//                 fraction: true
//             },
//             valid: false,
//             touched: false,
//             name: 'phone'
//         },
//         email: {
//             value: '',
//             type: 'email',
//             rules: {
//                 required: true,
//                 isEmail: true
//             },
//             valid: false,
//             touched: false,
//             name: 'email'
//         },
//         password: {
//             value: '',
//             type: 'password',
//             rules: {
//                 required: true,
//                 passwordMatch: true,
//                 minLength: 6
//             },
//             valid: false,
//             touched: false,
//             name: 'password'
//         },
//         confirmPassword: {
//             value: '',
//             type: 'password',
//             rules: {
//                 required: true,
//                 match: true
//             },
//             valid: false,
//             touched: false,
//             name: 'confirmPassword'
//         },
//         phoneCountryCode: {
//             value:'',
//             touched: false,
//             name: 'phoneCountryCode',
//             rules: {
//                 required: true,
//                 isNumber: true,
//                 fraction: true
//             },
//             valid: false,
//             type: 'tel'
//         }
//     });
//     const [city, setCity] = useState({
//         type: 'text',
//         value: '',
//         valid: false,
//         rules: {
//             required: true
//         },
//         name: 'city',
//         touched: false
//
//     })
//     const [isValid, setIsValid] = useState(false);
//     const [formIsValid, setFormIsValid] = useState(false);
//     const [agree, setAgree] = useState(false);
//     const [step, setStep] = useState(1);
//     const [phoneActive, setPhoneActive] = useState(false);
//     const [passwordActive, setPasswordActive] = useState(false);
//     const [usernameActive, setUsernameActive] = useState(false);
//     const [confirmPasswordActive, setConfirmPasswordActive] = useState(false);
//     const [emailActive, setEmailActive] = useState(false);
//     const [cityActive, setCityActive] = useState(false);
//     const [phoneCountryCodeActive, setPhoneCountryCodeActive] = useState(false);
//
//     const {t} = useTranslation();
//
//     useEffect(() => {
//         const home = document.querySelector('body');
//
//         const freezeStyles = () => {
//             home.classList.add('Home__hide')
//         }
//         const releaseStyles = () => {
//             home.classList.remove('Home__hide')
//         }
//
//         freezeStyles();
//
//         return () => {
//             releaseStyles();
//         }
//
//     }, []);
//
//     const formSbumitHandler = e => {
//
//     }
//
//     useEffect(() => {
//         registerError('');
//     }, []);
//
//     const stepRenderer = () => {
//         switch (step) {
//             case 1:
//                 return (
//                     <UserDetails
//                         step={step}
//                         setStep={setStep}
//                         passwordActive={passwordActive}
//                         setPasswordActive={setPasswordActive}
//                         phoneActive={phoneActive}
//                         setPhoneActive={setPhoneActive}
//                         usernameActive={usernameActive}
//                         setUsernameActive={setUsernameActive}
//                         confirmPasswordActive={confirmPasswordActive}
//                         setConfirmPasswordActive={setConfirmPasswordActive}
//                         emailActive={emailActive}
//                         setEmailActive={setEmailActive}
//                         form={form}
//                         setForm={setForm}
//                         isValid={isValid}
//                         setIsValid={setIsValid}
//                         phoneCountryCodeActive={phoneCountryCodeActive}
//                         setPhoneCountryCodeActive={setPhoneCountryCodeActive}
//                     />
//                 );
//             case 2:
//                 return (
//                     <EmailVerify
//                         form={form}
//                         setStep={setStep}
//                         step={step}
//                         sendCodeFun={sendEmailVerifyCodeToCustomer}
//                         sendingCode={sendingCodeToCustomer}
//                         lan={lan}
//                         sendingCodeToServer={sendingCodeToServer}
//                         sendCodeToServerFun={sendCodeToServer}
//                         buttonLink={'/login'}
//                         buttonText={'registerlogin'}
//                     />
//                 )
//             case 3:
//                 return (
//                     <Submit
//                         form={form}
//                         setForm={setForm}
//                         agree={agree}
//                         setAgree={setAgree}
//                         emailActive={emailActive}
//                         setEmailActive={setEmailActive}
//                         cityActive={cityActive}
//                         setCityActive={setCityActive}
//                         city={city}
//                         setCity={setCity}
//                         isValid={isValid}
//                         formIsValid={formIsValid}
//                         setFormIsValid={setFormIsValid}
//                     />
//                 )
//         }
//     }
//
//     return (
//         <div className={'Register'}>
//             <Navbar step={step} setStep={setStep} backBtn={true} midText={t('register')} />
//             <Step
//                 step={step}
//                 setStep={setStep}
//                 form={form}
//                 isValid={isValid}
//                 num={3}
//                 validation={validation}
//                 type={0}
//             />
//             <form onSubmit={formSbumitHandler} autoCorrect={'off'} autoComplete={'off'} className="Register__form">
//                 {
//                     stepRenderer()
//                 }
//             </form>
//             <AuthenticationError errorMessage={errorMessage} />
//             <Outlet />
//         </div>
//     );
// };
//
// const mapStateToProps = state => ({
//     sendingCodeToCustomer: state.register.sendingCodeToCustomer,
//     lan: state.categories.lan,
//     errorMessage: state.login.errorMessage,
//     sendingCodeToServer: state.register.sendingCodeToServer,
//     validation: state.register.validation
// })
//
// export default connect(mapStateToProps, {sendEmailVerifyCodeToCustomer, registerError, sendCodeToServer}) (Register);

import React, {useEffect, useState} from 'react';
import './Register.scss';
import {useTranslation} from "react-i18next";
import UserDetails from "../../components/RegisterComponents/UserDetails/UserDetails";
import Step from "../../components/RegisterComponents/Step/Step";
import EmailVerify from "../../components/RegisterComponents/EmailVerify/EmailVerify";
import Submit from '../../components/RegisterComponents/Submit/Submit';
import AuthenticationError from '../../components/AuthenticationError/AuthenticationError';
import {connect} from "react-redux";
import {sendEmailVerifyCodeToCustomer} from "../../store/actions/register.actions";
import {sendCodeToServer} from "../../store/actions/register.actions";
import {registerError} from "../../store/actions/register.actions";
import {Outlet} from "react-router-dom";
import {KeepAlive} from "react-activation";
import {changeNavbarAssets} from "../../store/actions/ui.actions";

const Register = ({errorMessage, changeNavbarAssets, validation, registerError, sendingCodeToServer, sendCodeToServer, sendingCodeToCustomer, sendEmailVerifyCodeToCustomer, lan}) => {
    const {t} = useTranslation();
    const [form, setForm] = useState({
        username: {
            value: '',
            type: 'text',
            rules: {
                required: {
                    value: true,
                    message: t('requiredInput'),
                    valid: false
                }
            },
            valid: false,
            touched: false,
            name: 'username'
        },
        phone: {
            value: '',
            type: 'tel',
            rules: {
                required: {
                    value: true,
                    message: t('requiredInput'),
                    valid: false
                },
                // isNumber: {
                //     value: true,
                //     message: t('integer'),
                //     valid: false
                // },
                fraction: {
                    value: true,
                    message: t('fraction'),
                    valid: false
                }
            },
            valid: false,
            touched: false,
            name: 'phone'
        },
        email: {
            value: '',
            type: 'email',
            rules: {
                required: {
                    value: true,
                    message: t('requiredInput'),
                    valid: false
                },
                isEmail: {
                    value: true,
                    message: t('notemail'),
                    valid: false
                }
            },
            valid: false,
            touched: false,
            name: 'email'
        },
        password: {
            value: '',
            type: 'password',
            rules: {
                required: {
                    value: true,
                    message: t('requiredInput'),
                    valid: false
                },
                minLength: {
                    value: 6,
                    message: t('minLength'),
                    valid: false
                }
            },
            valid: false,
            touched: false,
            name: 'password'
        },
        confirmPassword: {
            value: '',
            type: 'password',
            rules: {
                required: {
                    value: true,
                    message: t('requiredInput'),
                    valid: false
                },
                match: {
                    value: true,
                    message: t('matchMessage'),
                    valid: false
                }
            },
            valid: false,
            touched: false,
            name: 'confirmPassword'
        },
        phoneCountryCode: {
            value:'',
            touched: false,
            name: 'phoneCountryCode',
            rules: {
                required: {
                    value: true,
                    message: t('requiredInput'),
                    valid: false
                },
                fraction: {
                    value: true,
                    message: t('fraction'),
                    valid: false
                }
            },
            valid: false,
            type: 'tel'
        }
    });
    const [city, setCity] = useState({
        type: 'text',
        value: '',
        valid: false,
        rules: {
            required: {
                value: true,
                message: t('requiredInput'),
                valid: false
            }
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
    const [phoneCountryCodeActive, setPhoneCountryCodeActive] = useState(false);


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

    useEffect(() => {
        registerError('');
    }, []);

    useEffect(() => {
        const data = {
            searchPage: false,
            backBtn: true,
            step: step,
            setStep: setStep,
            search: false,
            midText: t('register'),
            logoLink: '/'
        }
        changeNavbarAssets(data);
    }, []);

    useEffect(() => {
        return () => {
            const data = {
                // assets: assets,
                searchPage: false,
                term: '',
                backBtn: false,
                step: null,
                setStep: null,
                search: true,
                logoLink: '/'
            };
            console.log(data);
            changeNavbarAssets(data);
        }
    }, []);

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
                        phoneCountryCodeActive={phoneCountryCodeActive}
                        setPhoneCountryCodeActive={setPhoneCountryCodeActive}
                    />
                );
            case 2:
                return (
                    <EmailVerify
                        form={form}
                        setStep={setStep}
                        step={step}
                        sendCodeFun={sendEmailVerifyCodeToCustomer}
                        sendingCode={sendingCodeToCustomer}
                        lan={lan}
                        sendingCodeToServer={sendingCodeToServer}
                        sendCodeToServerFun={sendCodeToServer}
                        buttonLink={'/login'}
                        buttonText={'registerlogin'}
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
        <KeepAlive cacheKey={'Register'}>
            <div className={'Register'}>
                {/*<Navbar step={step} setStep={setStep} backBtn={true} midText={t('register')} />*/}
                <Step
                    step={step}
                    setStep={setStep}
                    form={form}
                    isValid={isValid}
                    num={3}
                    validation={validation}
                    type={0}
                />
                <form onSubmit={formSbumitHandler} autoCorrect={'off'} autoComplete={'off'} className="Register__form">
                    {
                        stepRenderer()
                    }
                </form>
                <AuthenticationError errorMessage={errorMessage} />
                <Outlet />
            </div>
        </KeepAlive>
    );
};

const mapStateToProps = state => ({
    sendingCodeToCustomer: state.register.sendingCodeToCustomer,
    lan: state.categories.lan,
    errorMessage: state.login.errorMessage,
    sendingCodeToServer: state.register.sendingCodeToServer,
    validation: state.register.validation
})

export default connect(mapStateToProps, {changeNavbarAssets, sendEmailVerifyCodeToCustomer, registerError, sendCodeToServer}) (React.memo(Register));