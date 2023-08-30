import React, {useEffect, useRef, useState} from 'react';
import Input from "../../../components/Input/Input";
import './NewPassword.scss';
import Spinner from "../../../components/Spinner/Spinner.Component";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Button from "../../../components/Button/Button";
import {connect} from "react-redux";
import {changePassword} from "../../../store/actions/forget.password.actions";

const NewPassword = ({changingPassword, changePassword, validation, lan}) => {
    const [newPassword, setNewPassword] = useState({
        value: '',
        touched: false,
        valid: false,
        rules: {
            required: true,
            minLength: 6
        }
    });
    const [newPasswordActive, setNewPasswordActive] = useState(false)
    const [confirmNewPassword, setConfirmNewPassword] = useState({
        value: '',
        touched: false,
        valid: false,
        rules: {
            required: true,
            minLength: 6
        }
    });
    const [confirmNewPasswordActive, setConfirmNewPasswordActive] = useState(false);

    const {t} = useTranslation();
    const conRef=useRef();

    const handleInputValidation = (value, rules) => {
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
            console.log(inputIsValid);
        }
        if(rules.required) {
            inputIsValid = value.trim() !== '' && inputIsValid;
        }

        if(rules.minLength) {
            inputIsValid = value.length >= rules.minLength && inputIsValid;
        }

        return inputIsValid;
    }

    const passwordChangeHandler = e => {
        if(e.target.value == confirmNewPassword.value) {
            setNewPassword({
                ...newPassword,
                value: e.target.value,
                touched: true,
                valid: handleInputValidation(e.target.value, newPassword.rules)

            });
            setConfirmNewPassword({
                ...confirmNewPassword,
                valid: true && handleInputValidation(confirmNewPassword.value, confirmNewPassword.rules)
            })
        }else {
            setNewPassword({
                ...newPassword,
                value: e.target.value,
                valid: handleInputValidation(e.target.value, newPassword.rules),
                touched: true
            });
            setConfirmNewPassword({
                ...confirmNewPassword,
                valid: false
            });
        }
    }

    const confirmPasswordChangeHandler = (e) => {
        if(e.target.value == newPassword.value) {
            console.log(e.target.value , newPassword.value);
            setConfirmNewPassword(prevState => ({
                ...confirmNewPassword,
                value: e.target.value,
                touched: true,
                valid: newPassword.valid
            }));
        } else {
            console.log(e.target.value , newPassword.value);
            setConfirmNewPassword({
                ...confirmNewPassword,
                value: e.target.value,
                touched: true,
                valid: false
            })
        }
    }

    const navigate = useNavigate();
    const params = useParams();
    const btnClickHandler = e => {
        e.preventDefault();
        e.stopPropagation();
        console.log(!validation.valid, params.email, validation.email);
        console.log(validation.valid || (params.email != validation.email))
        if(!validation.valid || (params.email != validation.email)) return;
        console.log('hello');
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
            <Input onChange={confirmPasswordChangeHandler} name={'confirmPassword'} type={'password'} value={confirmNewPassword} setValue={setConfirmNewPassword} inputActive={confirmNewPasswordActive} setInputActive={setConfirmNewPasswordActive} locale={'rewrite new password'} />
            <Button text={'change'} sending={changingPassword} disabled={!newPassword.valid || !confirmNewPassword.valid} onClick={btnClickHandler} />
        </div>
    );
};

const mapStateToProps = state => ({
    changingPassword: state.forget.changingPassword,
    validation: state.forget.validation,
    lan: state.categories.lan
})

export default connect(mapStateToProps, {changePassword}) (NewPassword);