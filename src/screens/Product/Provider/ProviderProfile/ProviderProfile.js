import React from 'react';
import ProviderImage from "./ProviderImage/ProviderImage";
import ProviderBody from "./Providerbody/ProviderBody";
import './ProviderProfile.scss';

const ProviderProfile = ({provider: p}) => {
    return (
        <div className={'ProviderProfile'}>
            <ProviderImage img={p?.imagePath && p.imagePath} />
            <ProviderBody provider={p} />
        </div>
    );
};

export default ProviderProfile;