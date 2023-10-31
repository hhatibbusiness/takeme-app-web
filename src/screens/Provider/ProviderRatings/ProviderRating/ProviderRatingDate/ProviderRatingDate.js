import React, {useState} from 'react';
import './ProviderRatingDate.css';
import {useTranslation} from "react-i18next";

const ProviderRatingDate = ({rating}) => {
    const [date ,setDate] = useState(new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'}).format(new Date(rating?.createdDate)))
    const {t} = useTranslation();
    return (
        <div className={'ProviderRatingDate'}>
            <span>{t("dateCreated")}</span>{date}
        </div>
    );
};

export default ProviderRatingDate;