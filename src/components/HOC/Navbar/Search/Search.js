import React, {memo, useEffect, useRef, useState} from 'react';
import './Search.scss';
import {useTranslation} from 'react-i18next';
import {useNavigate} from "react-router-dom";
import {fetchSearchResults, changeSearchTerm} from "../../../../store/actions/search.actions";
import {connect} from "react-redux";
import {getAnalytics, logEvent} from "firebase/analytics";
import DropDownList from "../../../DropDownList/DropDownList";
import intro from "../../../Intro/Intro";
import history from '../../../../history/history';

const waitTime = 1000;

const Search = ({focused, searchResults, searchPage, loadingSearchResults, term, lan, changeSearchTerm, search}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [inputFocus, setInputFocus] = useState(false);

    const inputRef = useRef();

    // useEffect(() => {
    //     inputRef.current.focus();
    // }, []);

    const inputChangeHandler = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        console.log(t('search'));
        if(searchPage) {
            setSearchTerm(term)
        } else {
            setSearchTerm('');
        }
    }, []);

    const inputKeyUpHandler = e => {
        let timer;
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            changeSearchTerm(e.target.value);
        }, waitTime);
    }

    useEffect(() => {

        // window.addEventListener('popstate', e => history.go(1));
        if(inputFocus && searchPage) {
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', e => {
                e.preventDefault();
                setInputFocus(false);
                inputRef?.current?.blur();
            });
        }
    }, [inputFocus]);

    return (
        <>
            <div onClick={() => {
                if(!window?.location?.href.includes('search')) {
                    navigate('/search');
                }
                const analytics = getAnalytics();
                logEvent(analytics, 'search_bar', {});
            }} className={`Search ${inputFocus && 'Search__input--focused'}`}>
                <form onSubmit={e=> e.preventDefault()} className={`Search__form `}>
                    <input onBlur={e => {
                        console.log('Hello from Input!');
                        // setInputFocus(false);
                    }} onFocus={e => {
                        console.log(searchPage)
                        if(searchPage) {
                            setInputFocus(true);
                        } else {
                            inputRef?.current?.blur();
                        }
                    }} value={searchTerm} onChange={inputChangeHandler} onKeyUp={inputKeyUpHandler} ref={inputRef} type="text" className={`Search__input `} placeholder={t('search')}/>
                    <button className="Search__btn">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
                {
                    inputFocus && searchResults?.length > 0 && (
                        <DropDownList loadingSearchResults={loadingSearchResults} searchResults={searchResults} inputRef={inputRef} term={term} setInputFocus={setInputFocus} />
                    )
                }
            </div>
            {inputFocus && <div onClick={e => {
                history.back();
                setInputFocus(false);
            }} className="DropDownList__backdrop"></div>}
        </>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    // term: state.search.term
});

export default connect(mapStateToProps, {fetchSearchResults, changeSearchTerm}) (memo(Search));