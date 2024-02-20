import React from 'react';
import './ProviderScreenProfile.css';
import ProviderImage from "../../Product/Provider/ProviderProfile/ProviderImage/ProviderImage";

const ProviderScreenProfile = ({provider}) => {
    return (
        <div className={'ProviderScreenProfile'}>
            <ProviderImage p={provider} img={provider?.imagePath} id={provider?.id}/>
        </div>
    );
};

export default ProviderScreenProfile;