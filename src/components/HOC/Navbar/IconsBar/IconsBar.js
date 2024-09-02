import React, {useState} from 'react';
import './IconsBar.css';
import Icon from "./Icon/Icon";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";

const IconsBar = ({ eyeOpen, backupFilter, setBackupFilters, showEye, store, setFiltersActive, filtersActive, setEyeOpen, viewOpen, setViewOpen }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [showPersonPopup, setShowPersonPopup] = useState(false);
    const [showGlassPopup, setShowGlassPopup] = useState(false);

    const {t} = useTranslation();
    const navigate = useNavigate();

    const eyeClickHandler = e => {
        console.log('click!')
        setViewOpen(!viewOpen);
    }

    const filterClickHandler = e => {
        setFiltersActive(!filtersActive);
        setBackupFilters(!backupFilter);
    }

    const disabledIconClickHandler = e => {
        setShowPopup(true);
    }

    const searchIconClickHandler = e => {
        if(store) {
            return setShowGlassPopup(true);
        }
        navigate('/search');
    }

    const personIconClickHandler = e => {
        setShowPersonPopup(true);
    }

    return (
        <div className={'IconsBar'}>
            <div className={'IconsBar__icon--container'}>
                <Icon icon={<i className="fa-solid fa-user"></i>} disabled={true} iconClickHandler={personIconClickHandler} />
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
                    <Icon icon={<i className="fa-solid fa-eye"></i>} iconClickHandler={eyeClickHandler} viewOpen={viewOpen} />
            }
            <div className="IconsBar__icon--container">
                <Icon icon={<i className="fa-solid fa-magnifying-glass"></i>} iconClickHandler={searchIconClickHandler} disabled={store} />
                {
                    showGlassPopup && store && <>
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
    );
};

const mapStateToProps = state => ({
    store: state.categories.store
})

export default connect(mapStateToProps) (IconsBar);