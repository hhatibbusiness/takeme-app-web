import React from 'react';
import './Button.scss';
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Button = ({text, disabled, sending, onClick}) => {
    const {t} = useTranslation();
    return (
        <div className="Button">
            <button disabled={disabled} onClick={onClick} className="Button__btn">
                {
                    sending ? (
                        <span><i className="fa-solid fa-circle-notch"></i></span>
                    ) : (
                        <span>{t(text)}</span>
                    )
                }
            </button>
            <p className="Button__register">{t('create')}?<NavLink className={'Button__register--link'} to={'/register'}>{t('loginregister')}</NavLink></p>
        </div>
    );
};

export default Button;