import React from 'react';
import './StoreViewShimmer.css';

const StoreViewShimmer = () => {
    return (
        <div className={'StoreViewShimmer'}>
            <div className="StoreViewShimmer__right">
                <div className="StoreViewShimmer__image"></div>
                <div className="StoreViewShimmer__details">
                    <div className="StoreViewShimmer__name"></div>
                    <div className="StoreViewShimmer__contact"></div>
                </div>
            </div>
            <div className="StoreViewShimmer__left">
                <div className="StoreViewShimmer__location">
                    <i className="fa-solid fa-location-dot"></i>
                    <p className={'StoreViewShimmer__location--country'}></p>

                </div>

            </div>
        </div>
    );
};

export default StoreViewShimmer;