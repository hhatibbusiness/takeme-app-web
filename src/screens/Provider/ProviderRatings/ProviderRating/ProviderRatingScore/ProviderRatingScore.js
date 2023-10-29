import React, {useEffect, useState} from 'react';
import './ProviderRatingScore.css';

const ProviderRatingScore = ({rating}) => {
    const [starsArray, setStartsArray] = useState();

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setStartsArray(array);
    }, []);
    return (
        <div className={'ProviderRatingScore'}>
            <div className="ProviderRatingScore__stars">
                {
                    starsArray?.map((s, i) => (
                        <i style={{color: `${i < rating.ratingScore ? 'gold' : 'gray'}`}} className="fa-solid fa-star"></i>
                    ))
                }
            </div>
            <div className="ProviderRatingScore__status">
                <p>{rating.statusDetails}</p>
            </div>
        </div>
    );
};

export default ProviderRatingScore;