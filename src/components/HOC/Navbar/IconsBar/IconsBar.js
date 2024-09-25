import React, {useRef, useState} from 'react';
import './IconsBar.css';
import Icon from "./Icon/Icon";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";

const longPressDuration = 10;

const IconsBar = ({ eyeOpen, eyeDis, switchMarketStore, personActive, setPersonActive, pseronAva, separatorActive, searchActive, backupFilter, setBackupFilters, showEye, store, setFiltersActive, filtersActive, setEyeOpen, viewOpen, setViewOpen }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPersonPopup, setShowPersonPopup] = useState(false);
    const [showGlassPopup, setShowGlassPopup] = useState(false);
    const [showEyePopup, setShowEyePopup] = useState(false);
    const [longPressed, setLongPressed] = useState(false);

    const {t} = useTranslation();
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const eyeClickHandler = e => {
        // if(eyeDis) {
        //     return setShowEyePopup(!showEyePopup);
        // }
        // console.log('click!')
        // setViewOpen(!viewOpen);
        // if(!eyeDis) {
        //     switchMarketStore(!store);
        // }
    }

    const filterClickHandler = e => {
        setPersonActive(false);
        setFiltersActive(!filtersActive);
        setBackupFilters(!backupFilter);
    }

    const disabledIconClickHandler = e => {
        setShowPopup(true);
    }

    const searchIconClickHandler = e => {
        if(store || !searchActive) {
            return setShowGlassPopup(true);
        }
        navigate('/search');
    }

    const personIconClickHandler = e => {
        if(pseronAva) {
            setFiltersActive(false);
            return setPersonActive(!personActive);
        }
        setShowPersonPopup(true);
    }

    const eyeMouseDownFunc = e => {
        e.preventDefault();
        console.log('Pressed Down!');
        timerRef.current = setTimeout(() => {
            if(!eyeDis) {
                console.log('done!');
                setLongPressed(true);
                setViewOpen(true);
            }
        }, [500]);
    }

    const eyeMouseUp = e => {
        e.preventDefault();

        console.log('Clicked!', eyeDis, longPressed);

        if(!eyeDis) {
            if(!longPressed) switchMarketStore(!store);
        }

        setLongPressed(false);
        clearTimeout(timerRef.current);
    }

    return (
        <div className={'IconsBar'}>
            <div className="IconsBar__outer--container">
                <div className={'IconsBar__icon--container'}>
                    <Icon icon={<i className="fa-solid fa-user"></i>} personActive={personActive} disabled={!pseronAva} iconClickHandler={personIconClickHandler} />
                    {
                        showPersonPopup && (
                            <>
                                <div onClick={e => setShowPersonPopup(false)} className="IconsBar__backdrop"></div>
                                <div className="IconsBar__popup IconsBar__popup--person">
                                    <div className="IconsBar__popup--triangle"></div>
                                    <p>{t('underbuilding')}</p>
                                </div>
                            </>
    
                        )
                    }
    
                </div>

                <Icon icon={<i className="fa-solid fa-filter"></i>} filtersActive={filtersActive} setFiltersActive={setFiltersActive} iconClickHandler={filterClickHandler} />
                {
                    showEye &&
                    <div className="IconsBar__icon--container">
                        <Icon icon={<i className="fa-solid fa-eye"></i>} disabled={eyeDis} mouseUp={eyeMouseUp} mouseDownFunc={eyeMouseDownFunc} iconClickHandler={eyeClickHandler} viewOpen={viewOpen} store={store} />
                        {
                            showEyePopup && <>
                                <div onClick={e => setShowEyePopup(false)} className="IconsBar__backdrop"></div>
                                <div className="IconsBar__popup IconsBar__popup--glass">
                                    <div className="IconsBar__popup--triangle"></div>
                                    <p>{t('underbuilding')}</p>
                                </div>
                            </>
                        }

                    </div>
                }
                <div className="IconsBar__icon--container">
                    <Icon icon={<i className="fa-solid fa-magnifying-glass"></i>} iconClickHandler={searchIconClickHandler} disabled={store || !searchActive} />
                    {
                        showGlassPopup && <>
                            <div onClick={e => setShowGlassPopup(false)} className="IconsBar__backdrop"></div>
                            <div className="IconsBar__popup IconsBar__popup--glass">
                                <div className="IconsBar__popup--triangle"></div>
                                <p>{t('underbuilding')}</p>
                            </div>
                        </>
                    }
                </div>
                <div className="IconsBar__icon--container">
                    <Icon icon={<i className="fa-solid fa-cart-shopping"></i>} disabled={true} iconClickHandler={disabledIconClickHandler} />
                    {
                        showPopup && <>
                            <div onClick={e => setShowPopup(false)} className="IconsBar__backdrop"></div>
                            <div className="IconsBar__popup IconsBar__popup--car">
                            <div className="IconsBar__popup--triangle"></div>
                                <p>{t('underbuilding')}</p>
                            </div>
                        </>
                    }
                </div>
                
            </div>
            <div style={{background: `${separatorActive ? '#07ab83' : 'rgba(0, 0, 0, 0.15)'}`}} className="IconsBar__separator"></div>
        </div>
    );
};

const mapStateToProps = state => ({
    store: state.categories.store
})

export default connect(mapStateToProps) (IconsBar);