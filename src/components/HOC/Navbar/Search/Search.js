import React, {memo, useEffect, useRef, useState} from 'react';
import './Search.scss';
import {useTranslation} from 'react-i18next';
import {useNavigate} from "react-router-dom";
import {fetchSearchResults, changeSearchTerm} from "../../../../store/actions/search.actions";
import {connect} from "react-redux";
import {getAnalytics, logEvent} from "firebase/analytics";
import searchIcon from '../../../../assets/images/searchIcon.png';


const Search = ({searching, store, searchPage, loadingSearchResults, term, changeSearchTerm}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typing, setTyping] = useState(false);
    const [clicking, setClicking] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [inputFocus, setInputFocus] = useState(false);

    const inputRef = useRef();

    const inputChangeHandler = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        if(searchPage) {
            setSearchTerm(term)
        } else {
            setSearchTerm('');
        }
    }, []);

    useEffect(() => {
        let typingTimer;
        if (!clicking) {
            clearTimeout(typingTimer);

            typingTimer = setTimeout(() => {
                if (!clicking) {
                    setTyping(false);
                    changeSearchTerm(searchTerm);
                }
            }, 500);
        }
        return () => {
            clearTimeout(typingTimer);
        }
    }, [clicking]);

    useEffect(() => {

        if(inputFocus && searchPage) {
            window.addEventListener('popstate', e => {
                e.preventDefault();
                setInputFocus(false);
                inputRef?.current?.blur();
            });
        }
    }, [inputFocus]);

    useEffect(() => {
        if(searching && inputRef?.current) {
            inputRef?.current?.focus();
        }
    }, [searching, inputRef?.current]);

    return (
        <>
            <div onClick={() => {
                if(store) return;
                if(!window?.location?.href.includes('search')) {
                    navigate('/search');
                }
                const analytics = getAnalytics();
                logEvent(analytics, 'search_bar', {});
            }} className={`Search Search__input--focused ${inputFocus && 'Search__input--searching'} ${store && 'Search__invisible'}`}>
                <form onSubmit={e=> e.preventDefault()} className={`Search__form `}>
                    <input id={'Search__input'} onFocus={e => {
                        if(searchPage) {
                            setInputFocus(true);
                        } else {
                            inputRef?.current?.blur();
                        }
                    }} value={searchPage ? searchTerm : ''} onChange={e => inputChangeHandler(e)} onKeyUp={e => setClicking(false)} onKeyDown={e => {
                        setClicking(true);
                        setTyping(true);
                    }} ref={inputRef} type="text" className={`Search__input `} placeholder={t('search')}/>
                    <button className="Search__btn">
                        {
                            (typing || loadingSearchResults) ? (
                                <span><i className="fa-solid fa-circle-notch"></i></span>
                            ) : (
                                <img src={searchIcon} alt=""/>
                            )
                        }
                    </button>
                </form>
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    store: state.categories.store
});

export default connect(mapStateToProps, {fetchSearchResults, changeSearchTerm}) (memo(Search));