import React from 'react';
import './ProviderProductComments.scss';
import {useTranslation} from "react-i18next";


const ProviderProductComments = ({comments}) => {
    const {t} = useTranslation();
    return (
        <div className={'ProviderProductComments'}>
            <hr />
            <div className="ProviderProductComments__title">{t('notes')}</div>
            {
                comments?.length > 0 && comments.map((c, i) => (
                    <span><span className='ProviderProductComments__stars'><i className="fa-solid fa-circle"></i></span><span className={'ProviderProductComments__comment'}>{c}</span></span>
                ))
            }
        </div>
    );
};

export default ProviderProductComments;