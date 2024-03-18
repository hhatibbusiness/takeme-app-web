import React, {useEffect, useState} from 'react';
import './ProviderBody.scss';
import Socials from "../../Socials/Socials";
import {useTranslation} from "react-i18next";
import copy from "copy-to-clipboard";
import {getAnalytics, logEvent} from "firebase/analytics";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {openPopup, changePopupProduct, changeDestination} from "../../../../../store/actions/ui.actions";
import {connect} from "react-redux";
import providerRatingScore from "../../../../Provider/ProviderRatings/ProviderRating/ProviderRatingScore/ProviderRatingScore";
import history from '../../../../../history/history';
import {closePopup} from "../../../../../store/actions/ui.actions";
import locationImage from '../../../../../assets/images/product/Location.jpg'

const ProviderBody = ({provider: p, activeProduct, isAuthenticated, changeDestination, socials, prov, openPopup, closePopup, changePopupProduct}) => {
    const [array, setArray] = useState([]);
    const [copied, setCopied] = useState('')
    const [currentLocation, setCurrentLocation] = useState('');

    const {t} = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setArray(array);
    }, []);

    useEffect(() => {
        setCurrentLocation(location.pathname);
    }, []);

    const renderStars = (rating, i) => {
        const floorNumber = Math.floor(rating);
        const ceil = Math.ceil(rating);
        if(floorNumber == ceil) {
            return <i style={{color: `${i < p.ratingsScore && 'gold'}`}} className={`${i < ceil ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
        } else {
            return <i style={{color: `${i < ceil && 'gold'}`, transform: 'rotateY(180deg)'}} className={`${i <= ceil - 1 ? 'fa-solid' : 'fa-regular'} ${(i <= floorNumber - 1 || i > ceil - 1) ? 'fa-star' : 'fa-star-half-stroke'}`}></i>;
        }
    }

    return (
        <div className={'ProviderBody'}>
            <div className="ProviderBody__details--container">
                <div className="ProviderBody__details">
                    <p onClick={e => {
                        if(prov) {
                            copy(window?.location?.href && window.location.href);
                            setCopied(
                                <div className={'ProviderLinkCopy__container'}>
                                    {/*<i className="fa-solid fa-clipboard-list"></i>*/}
                                    <p><span><i className="fa-solid fa-caret-left"></i></span>link copied</p>
                                </div>
                            );
                            setTimeout(() => {
                                setCopied('')
                            }, 1000);
                            const analytics = getAnalytics();
                            logEvent(analytics, 'link copied', {
                                providerName: p.name,
                                providerId: p.id
                            })
                        }
                    }} className={'ProviderBody__name'}>{p?.name && p.name} {copied}</p>
                    <div className="ProviderBody__location">
                        {/*<img src={locationImage}/>*/}
                        <i className="fa-solid fa-location-dot"></i>
                        <p className={'ProviderBody__city'}>{p?.city && p?.city}</p>
                    </div>
                </div>
            </div>
            <div className="ProviderBody__left">
                {
                    p?.productsCountMsg && <p className={'ProviderBody__msg'}>{p.productsCountMsg}</p>
                }
                <Socials provider={p} right={true}/>
                {/*{*/}
                {/*    p?.ratingsCount > 0 ? (*/}
                {/*        <p onClick={e => {*/}
                {/*            e.stopPropagation();*/}
                {/*            e.preventDefault();*/}
                {/*            if(!isAuthenticated) {*/}
                {/*                closePopup();*/}
                {/*                return navigate('/login', {state: {previousLocation: currentLocation}})*/}
                {/*            };*/}
                {/*            changePopupProduct(activeProduct);*/}
                {/*            openPopup();*/}
                {/*            changeDestination(true);*/}
                {/*        }} className={'ProviderBody__score'}>*/}
                {/*            {*/}
                {/*                p?.ratingsScore && p?.ratingsScore > 0 && (*/}
                {/*                    <p className={'ProviderBody__stars'}>*/}
                {/*                        {*/}
                {/*                            p?.ratingsScore && array.map((a, i) => (*/}
                {/*                                renderStars(p?.ratingsScore, i)*/}
                {/*                            ))*/}
                {/*                        }*/}
                {/*                    </p>*/}
                {/*                )*/}
                {/*            }<span>({p?.ratingsCount && p.ratingsCount})</span>*/}
                {/*        </p>*/}
                {/*    ) : (*/}
                {/*        <p style={{color: `var(--main-color-green-dark-1)`, fontWeight: 'bold', columnGap: '3px', display: 'flex', alignItems: "center"}} onClick={e => {*/}
                {/*            e.preventDefault();*/}
                {/*            e.stopPropagation();*/}
                {/*            changePopupProduct(activeProduct);*/}
                {/*            openPopup();*/}
                {/*            changeDestination(true);*/}
                {/*        }}><i className="fa-solid fa-plus"></i>{t("add-rating")}</p>*/}
                {/*    )*/}
                {/*}*/}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, {openPopup, changeDestination, changePopupProduct, closePopup}) (ProviderBody);