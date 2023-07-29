import React, {useEffect, useState} from 'react';
import './ProviderBody.scss';
import Socials from "../../Socials/Socials";
import {useTranslation} from "react-i18next";

const ProviderBody = ({provider: p, socials}) => {
    const [array, setArray] = useState([]);

    const {t} = useTranslation();

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setArray(array);
    }, []);

    return (
        <div className={'ProviderBody'}>
            <div className="ProviderBody__details--container">
                <div className="ProviderBody__details">
                    <h2 className={'ProviderBody__name'}>{p?.name && p.name}</h2>
                    <div className="ProviderBody__location">
                        <i className="fa-solid fa-location-dot"></i>
                        <p className={'ProviderBody__city'}>{p?.city && p?.city}</p>
                    </div>
                </div>
            </div>
            <div className="ProviderBody__left">
                {
                    p?.ratingsCount > 0 ? (
                        <p className={'ProviderBody__score'}>
                            <span>{p?.ratingsScore && p?.ratingsScore}</span>{
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
                        </p>
                    ) : (
                        <p className={'ProviderBody__score'}>{t('no reviews')}</p>
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