import React, {memo, useEffect, useRef, useState} from 'react';
import './Search.scss';
import {useTranslation} from 'react-i18next';
import {useNavigate} from "react-router-dom";
import {fetchSearchResults, changeSearchTerm} from "../../../../store/actions/search.actions";
import {connect} from "react-redux";
import {getAnalytics, logEvent} from "firebase/analytics";

const waitTime = 1000;

const Search = ({focused, fetchSearchResults, lan, changeSearchTerm}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const {t} = useTranslation();
    const navigate = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const inputChangeHandler = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    const inputKeyUpHandler = e => {
        let timer;
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            changeSearchTerm(e.target.value);
        }, waitTime);
    }

    return (
        <div  onClick={() => {
            navigate('/search');
            const analytics = getAnalytics();
            logEvent(analytics, 'search_bar', {});
        }} className={'Search'}>
            <form onSubmit={e=> e.preventDefault()} className="Search__form">
                <input value={searchTerm} onChange={inputChangeHandler} onKeyUp={inputKeyUpHandler} ref={inputRef} type="text" className="Search__input" placeholder={t('search')}/>
                <button className="Search__btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan
});

export default connect(mapStateToProps, {fetchSearchResults, changeSearchTerm}) (memo(Search));