import React from 'react';
import './Search.scss';
import {useTranslation} from 'react-i18next';

const Search = () => {
    const {t} = useTranslation();
    return (
        <div className={'Search'}>
            <form className="Search__form">
                <input type="text" className="Search__input" placeholder={t('search')}/>
                <button className="Search__btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    );
};

export default Search;