import React, {useEffect, useRef, useState} from 'react';
import Input from "../../../components/Input/Input";
import './NewPassword.scss';
import { useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Button from "../../../components/Button/Button";
import {connect} from "react-redux";
import {changePassword} from "../../../store/actions/forget.password.actions";

const NewPassword = ({changingPassword, changePassword, validation, lan}) => {
    const {t} = useTranslation();
    const [newPassword, setNewPassword] = useState({
        value: '',
        type: 'password',
        rules: {
            required: {
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
    });
    const [newPasswordActive, setNewPasswordActive] = useState(false)
    const [confirmNewPassword, setConfirmNewPassword] = useState({
        value: '',
        type: 'password',
        rules: {
            required: {
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
        name: "confirmPassword"
    });
    const [confirmNewPasswordActive, setConfirmNewPasswordActive] = useState(false);

    const conRef=useRef();

    const handleInputValidation = (value, rules, input) => {
        let inputIsValid = true;
        if(!rules) {
            return true;
        }
        if(rules.isEmail) {
            inputIsValid = String(value)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) && inputIsValid;
        }
        if(rules.required) {
            inputIsValid = value.trim() !== '' && inputIsValid;
        }

        if(rules.minLength) {
            inputIsValid = value.length >= rules.minLength.value && inputIsValid;
        }

        if(input.rules.match) {
            console.log(newPassword.value);
            const match = newPassword.value == value;
            console.log(match);
            inputIsValid = match && inputIsValid;
        }
        console.log(input, inputIsValid);

        return inputIsValid;
    }

    const passwordChangeHandler = e => {
        if(e.target.value == confirmNewPassword.value) {
            setNewPassword({
                ...newPassword,
                value: e.target.value,
                touched: true,
                valid: handleInputValidation(e.target.value, newPassword.rules, newPassword),
                rules: {
                    ...newPassword.rules,
                    required: {
                        ...newPassword.rules.required,
                        valid: e.target.value.length > 0,
                    },
                    minLength: {
                        ...newPassword.rules.minLength,
                        valid: e.target.value.length >= newPassword.rules.minLength.value
                    }
                }
            });
            setConfirmNewPassword({
                ...confirmNewPassword,
                valid: handleInputValidation(e.target.value, newPassword.rules, newPassword),
                rules: {
                    ...confirmNewPassword.rules,
                    required: {
                        ...confirmNewPassword.rules.required,
                        valid: confirmNewPassword.value.length > 0,
                    },
                    match: {
                        ...confirmNewPassword.rules.match,
                        valid: e.target.value == confirmNewPassword.value
                    }
                }
            })
        }else {
            setNewPassword({
                ...newPassword,
                value: e.target.value,
                valid: handleInputValidation(e.target.value, newPassword.rules, newPassword),
                touched: true,
                rules: {
                    ...newPassword.rules,
                    required: {
                        ...newPassword.rules.required,
                        valid: e.target.value.length > 0,
                    },
                    minLength: {
                        ...newPassword.rules.minLength,
                        valid: e.target.value.length >= newPassword.rules.minLength.value
                    }
                }
            });
            setConfirmNewPassword({
                ...confirmNewPassword,
                valid: false,
                rules: {
                    ...confirmNewPassword.rules,
                    match: {
                        ...confirmNewPassword.rules.match,
                        valid: false
                    }
                }
            });
        }
    }

    const confirmPasswordChangeHandler = (e) => {
        if(e.target.value == newPassword.value) {
            setConfirmNewPassword(prevState => ({
                ...confirmNewPassword,
                value: e.target.value,
                touched: true,
                valid: handleInputValidation(e.target.value, confirmNewPassword.rules, confirmNewPassword) && newPassword.valid,
                rules: {
                    ...confirmNewPassword.rules,
                    match: {
                        ...confirmNewPassword.rules.match,
                        valid: e.target.value == newPassword.value
                    }
                }
            }));
        } else {
            setConfirmNewPassword({
                ...confirmNewPassword,
                value: e.target.value,
                touched: true,
                rules: {
                    ...confirmNewPassword.rules,
                    match: {
                        ...confirmNewPassword.rules.match,
                        valid: e.target.value == newPassword.value
                    }
                },
                valid: handleInputValidation(e.target.value, confirmNewPassword.rules, confirmNewPassword) && newPassword.valid
            })
        }
    }

    const navigate = useNavigate();
    const params = useParams();
    const btnClickHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        if(!validation.valid || (params.email != validation.email)) return;
        const data = {
            navigate,
            email: params.email,
            password: newPassword.value,
            lan
        };
        changePassword(data);
    }
    return (
        <div ref={conRef} className={'NewPassword'}>
            <Input onChange={passwordChangeHandler} name={'password'} type={'password'} value={newPassword} setValue={setNewPassword} inputActive={newPasswordActive} setInputActive={setNewPasswordActive} locale={'new password'} />
            <p className={'Register__form--element-rules'}>
                {
                    newPassword.touched && (
                        <ul>
                            {
                                Object.keys(newPassword.rules).map((r, i) => (
                                    !newPassword.rules[r].valid && r != 'required' &&  <li style={{color: `${newPassword.rules[r].valid ? 'green' : 'red'}`}}>{newPassword.rules[r].message}</li>
                                ))
                            }
                        </ul>
                    )
                }
            </p>
            <p>
                <Input onChange={confirmPasswordChangeHandler} name={'confirmPassword'} type={'password'} value={confirmNewPassword} setValue={setConfirmNewPassword} inputActive={confirmNewPasswordActive} setInputActive={setConfirmNewPasswordActive} locale={'rewrite new password'} />
                <p className={'Register__form--element-rules'}>
                    {
                        confirmNewPassword.touched && (
                            <ul>
                                {
                                    Object.keys(confirmNewPassword.rules).map((r, i) => (
                                        !confirmNewPassword.rules[r].valid && r != 'required' &&  <li style={{color: `${confirmNewPassword.rules[r].valid ? 'green' : 'red'}`}}>{confirmNewPassword.rules[r].message}</li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </p>
            </p>
            <Button text={'change'} sending={changingPassword} disabled={!newPassword.valid || !confirmNewPassword.valid} onClick={btnClickHandler} />
        </div>
    );
};

const mapStateToProps = state => ({
    changingPassword: state.forget.changingPassword,
    validation: state.forget.validation,
    lan: state.categories.lan
});

export default connect(mapStateToProps, {changePassword}) (NewPassword);