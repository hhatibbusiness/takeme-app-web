import React, {useEffect, useState} from 'react';
import './ProviderBody.scss';
import Socials from "../../Socials/Socials";
import {useTranslation} from "react-i18next";
import copy from "copy-to-clipboard";
import {getAnalytics, logEvent} from "firebase/analytics";
import {Link} from "react-router-dom";
import {openPopup, changePopupProduct, changeDestination} from "../../../../../store/actions/ui.actions";
import {connect} from "react-redux";
import providerRatingScore
    from "../../../../Provider/ProviderRatings/ProviderRating/ProviderRatingScore/ProviderRatingScore";

const ProviderBody = ({provider: p, activeProduct, changeDestination, socials, prov, openPopup, changePopupProduct}) => {
    const [array, setArray] = useState([]);
    const [copied, setCopied] = useState('')

    const {t} = useTranslation();

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setArray(array);
    }, []);

    const renderStars = (rating, i) => {
        const floorNumber = Math.floor(rating);
        const ceil = Math.ceil(rating);
        if(floorNumber == ceil) {
            console.log(floorNumber, ceil);
            console.log('star is empty')
            return <i style={{color: `${i < p.ratingsScore && 'gold'}`}} className={`${i < ceil ? 'fa-solid' : 'fa-regular'} fa-star`}></i>
        } else {
            console.log('star is solid')
            return <i style={{color: `${i < ceil && 'gold'}`, transform: 'rotateY(180deg)'}} className={`${i <= ceil - 1 ? 'fa-solid' : 'fa-regular'} ${(i <= floorNumber - 1 || i > ceil - 1) ? 'fa-star' : 'fa-star-half-stroke'}`}></i>;
        }
    }

    return (
        <div className={'ProviderBody'}>
            <div className="ProviderBody__details--container">
                <div className="ProviderBody__details">
                    <h2 onClick={e => {
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
                    }} className={'ProviderBody__name'}>{p?.name && p.name} {copied}</h2>
                    <div className="ProviderBody__location">
                        <i className="fa-solid fa-location-dot"></i>
                        <p className={'ProviderBody__city'}>{p?.city && p?.city}</p>
                    </div>
                </div>
            </div>
            <div className="ProviderBody__left">
                {
                    p?.productsCountMsg && <p className={'ProviderBody__msg'}>{p.productsCountMsg}</p>
                }
                {
                    p?.ratingsCount > 0 ? (
                        <p onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            changePopupProduct(activeProduct);
                            openPopup();
                            changeDestination(true);
                        }} className={'ProviderBody__score'}>
                            {
                                p?.ratingsScore && p?.ratingsScore > 0 && (
                                    <p className={'ProviderBody__stars'}>
                                        {
                                            p?.ratingsScore && array.map((a, i) => (
                                                renderStars(p?.ratingsScore, i)
                                            ))
                                        }
                                    </p>
                                )
                            }<span>({p?.ratingsCount && p.ratingsCount})</span>
                        </p>
                    ) : (
                        <p style={{color: `var(--main-color-green-dark-1)`, fontWeight: 'bold', columnGap: '3px', display: 'flex', alignItems: "center"}} onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            changePopupProduct(activeProduct);
                            openPopup();
                            changeDestination(true);
                        }}><i className="fa-solid fa-plus"></i>{t("add-rating")}</p>
                    )
                }
            </div>

        </div>
    );
};

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {openPopup, changeDestination, changePopupProduct}) (ProviderBody);