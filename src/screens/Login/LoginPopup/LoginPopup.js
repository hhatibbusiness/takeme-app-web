import React from 'react';
import './LoginPopup.css';
import {useTranslation} from "react-i18next";

const LoginPopup = ({message}) => {
    const {t} = useTranslation();
    return (
        <div className={'LoginPopup'}>
            <div className="LoginPopup__container">
                <p>
                    {
                        message
                    }
                </p>
                <div className="LoginPopup__btns">
                    <div className="LoginPopup__btn">{t('cancel')}</div>
                </div>
            </div>
            <div className="LoginPopup__backdrop"></div>
        </div>
    );
};

export default React.memo(LoginPopup);