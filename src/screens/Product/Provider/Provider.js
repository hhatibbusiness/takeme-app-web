import React from 'react';
import './Provider.scss';
import history from '../../../history/history';
import {useNavigate} from "react-router-dom";
import ProviderProfile from "./ProviderProfile/ProviderProfile";
import ProviderProducts from "./ProviderProducts/ProviderProducts";
import Socials from "./Socials/Socials";

const Provider = ({provider: p, socials, link, openGallery}) => {
    const navigator = useNavigate();
    return (
        <div className={'Provider'}>
            <ProviderProfile socials={socials} link={link} provider={p} />
            <ProviderProducts products={p?.products && p.products} openGallery={openGallery}/>
            {
                p?.products && (
                    <Socials />
                )
            }

        </div>
    );
};

export default Provider;