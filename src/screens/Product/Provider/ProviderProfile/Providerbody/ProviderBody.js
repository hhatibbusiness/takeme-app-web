import React, {useEffect, useState} from 'react';
import './ProviderBody.scss';
import Socials from "../../Socials/Socials";
import {useTranslation} from "react-i18next";
import copy from "copy-to-clipboard";
import {getAnalytics, logEvent} from "firebase/analytics";
import {Link} from "react-router-dom";

const ProviderBody = ({provider: p, socials, prov}) => {
    const [array, setArray] = useState([]);
    const [copied, setCopied] = useState('')

    const {t} = useTranslation();

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setArray(array);
    }, []);

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
                    p?.ratingsCount > 0 ? (
                        <Link to={`/provider/${p.id}/ratings`} className={'ProviderBody__score'}>
                            {
                                p?.ratingsScore && p?.ratingsScore > 0 && (
                                    <p className={'ProviderBody__stars'}>
                                        {
                                            p?.ratingsScore && array.map((a, i) => (
                                                <i style={{color: `${i < p.ratingsScore && 'gold'}`}} className="fa-solid fa-star"></i>
                                            ))
                                        }
                                    </p>
                                )
                            }<span>({p?.ratingsCount && p.ratingsCount})</span>
                        </Link>
                    ) : (
                        <Link to={`/provider/${p.id}/ratings`} className={'ProviderBody__score'}>{t('no reviews')}</Link>
                    )
                }
                {
                    p?.productsCountMsg && <p className={'ProviderBody__msg'}>{p.productsCountMsg}</p>
                }

            </div>

        </div>
    );
};

export default ProviderBody;