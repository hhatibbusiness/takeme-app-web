import React from 'react';
import {useTranslation} from "react-i18next";
import './Failure.scss';

const Failure = () => {
    const {t} = useTranslation();
    return (
        <div className={'Failure'}>
            <p><i className="fa-solid fa-circle-exclamation"></i></p>
            <p>{t('fail to load providers')}</p>
        </div>
    );
};

export default Failure;