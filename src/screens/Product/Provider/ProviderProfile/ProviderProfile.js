import React from 'react';
import ProviderImage from "./ProviderImage/ProviderImage";
import ProviderBody from "./Providerbody/ProviderBody";
import './ProviderProfile.scss';
import {useNavigate} from "react-router-dom";

const ProviderProfile = ({provider: p, link, socials}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => link && navigate(`/provider/${p.id}`)} style={{cursor: `${link && 'pointer'}`}} className={'ProviderProfile'}>
            <ProviderImage id={p.id} img={p?.imagePath && p.imagePath} />
            <ProviderBody socials={socials} provider={p} />
        </div>
    );
};

export default ProviderProfile;