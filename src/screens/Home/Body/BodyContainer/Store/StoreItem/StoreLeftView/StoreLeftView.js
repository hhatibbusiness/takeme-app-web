import React from 'react';
import './StoreLeftView.css';

const StoreLeftView = ({store}) => {
    return (
        <div className={'StoreLeftView'}>
            <div className="StoreLeftView__location">
                <div className="StoreLeftView__location--icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="StoreLeftView__location--city">
                    <p>{store?.country}</p>
                </div>
            </div>
        </div>
    );
};

export default StoreLeftView;