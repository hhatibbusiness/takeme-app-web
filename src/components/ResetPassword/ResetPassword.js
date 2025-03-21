import React, { useEffect, useState } from 'react';
import close from '../../assets/images/auth/close.png';
import { connect } from 'react-redux';
import InputComponent from '../InputComponent/InputComponent';
import lockImage from '../../assets/images/defaults/lock.png';
import './ResetPassword.css';
import LoginButton from '../LoginButton/LoginButton';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from "../../utls/assets";
import {addAlert} from "../../store/actions/alert.actions";
import Overlay from "../Overlay/Overlay";

const ResetPassword = ({ params, addAlert, resetting, setResetting, locale }) => {
    const [password, setPassword] = useState({
        value: '',
        rules: {
            required: {
                valid: false
            },
            minLength: {
                valid: false,
                value: 6
            }
        },
        touched: false,
        valid: false
    });
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        rules: {
            required: {
                valid: false
            },
            minLength: {
                valid: false,
                value: 6
            }
        },
        touched: false,
        valid: false
    });

    const [submitted, setSubmitted] = useState(true);
    const [valid, setValid] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState({});
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState({});
    const [spin, setSpin] = useState(false);

    const navigate = useNavigate();

    const inputValidator = (value, rules) => {
        let inputIsValid = true;

        if (rules.required) {
            inputIsValid = value.trim() != '' && inputIsValid;
        }

        if (rules.minLength) {
            inputIsValid = value.length >= rules.minLength.value && inputIsValid;
        }

        if (rules.isEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            inputIsValid = emailRegex.test(value) && inputIsValid;
        }

        return inputIsValid;
    }

    const passwordChangeHandler = value => {
        setSubmitted(false);

        const isValid = inputValidator(value, password?.rules);

        setPassword({
            ...password,
            value: value,
            touched: true,
            valid: inputValidator(value, password?.rules)
        });

        setValid(isValid && email.valid);

        setPasswordErrors({});

        const maxValid = value.length >= password.rules.minLength.value;

        if (password.rules.required && value.trim().length == 0) {
            setPasswordErrors({
                ...passwordErrors,
                required: {
                    message: 'ادخل كلمة المرور'
                }
            });
        } else if (password.rules.minLength && !maxValid) {
            setPasswordErrors({
                ...passwordErrors,
                minLength: {
                    message: 'اقل طول هو 6 حروف '
                }
            })
        }
    }

    const ConfirmPasswordChangeHandler = value => {
        setSubmitted(false);

        const isValid = inputValidator(value, confirmPassword?.rules) && value == password.value;

        setConfirmPassword({
            ...confirmPassword,
            value: value,
            touched: true,
            valid: inputValidator(value, confirmPassword?.rules)
        });

        setValid(isValid && password.valid);

        setConfirmPasswordErrors({});

        if (value !== password.value) {
            setConfirmPasswordErrors({
                ...confirmPasswordErrors,
                match: {
                    message: 'كلمة المرور غير متطابقة!'
                }
            })
        }
    }

    const resetClickHandler = async () => {
        setSubmitted(true);
        if (!valid) return;
        try {
            setSpin(true);
            const data = {
                localeId: locale.id,
                userAuthenticationRequestDto: {
                    authType: 'email',
                    authValue: await params.get('email'),
                    password: password.value
                }
            }

            const res = await axios.post(`${BASE_URL}endpoints/users/verify-email-code-and-change-password?mLocale=${locale.locale}&code=${await params.get('code')}`, data);
            if(res.status === 200) {
                setResetting(false);
                navigate('/login');
            }
            setSpin(false);
        } catch (e) {
            addAlert({
                msg: e?.response?.data?.error,
                alertType: 'danger'
            })
            setSpin(false);
        }
    }

    useEffect(() => {
        (async () => {
            const currentEmail = await params.get('email');
            setEmail(currentEmail);
        })();
    }, []);

    return (
        <div className='ResetPassword'>
            <div className='ResetPassword__container'>
                <div onClick={e => {
                    setResetting(false);
                }} className='ResetPassword__close'>
                    <img src={close} />
                </div>
                <div className='ResetPassword__message'>
                    <p>
                        <span className='ResetPassword__message--body'>ادخل كلمة المرور الجديدة التي تريدها للايميل</span>
                        <span>{ email }</span>
                    </p>
                </div>
                <div className='ResetPassword__form'>
                    <div>
                        <InputComponent
                            icon={lockImage}
                            type={'password'}
                            placeholder={'كلمة المرور الجديدة'}
                            value={password.value}
                            setValue={passwordChangeHandler}
                            touched={password.touched}
                            valid={password.valid}
                            submitted={submitted}
                        />
                        {
                            Object.keys(passwordErrors).length > 0 && submitted && (
                                <ul className='Authentication__errors--list'>
                                    {
                                        Object.keys(passwordErrors).map((error) => (
                                            <li>{ passwordErrors[error].message }</li>
                                        ))
                                    }
                                </ul>
                            ) 
                        }

                    </div>
                    <div>
                        <InputComponent
                            icon={lockImage}
                            type={'password'}
                            placeholder={'تأكيد كلمة المرور الجديدة'}
                            value={confirmPassword.value}
                            setValue={ConfirmPasswordChangeHandler}
                            touched={confirmPassword.touched}
                            valid={confirmPassword.valid}
                            submitted={submitted}
                        />
                        {
                            Object.keys(confirmPasswordErrors).length > 0 && submitted && (
                                <ul className='Authentication__errors--list'>
                                    {
                                        Object.keys(confirmPasswordErrors).map((error) => (
                                            <li>{ confirmPasswordErrors[error].message }</li>
                                        ))
                                    }
                                </ul>
                            ) 
                        }

                    </div>
                    <LoginButton
                        icon={null}
                        value={'تغيير كلمة المرور'}
                        backColor={'#07AB83'}
                        color={'white'}
                        borderColor={'transparent'}
                        separatorColor={'white'}
                        fontWeight={700}
                        clickFun={resetClickHandler}
                        hasImage={false}
                        spin={spin}
                    />
                </div>
            </div>
            {
                spin && (
                    <Overlay />
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    email: state.auth.resetPasswordEmail,
    locale: state.categories.selectedLocale
})

export default connect(mapStateToProps, {addAlert}) (ResetPassword);