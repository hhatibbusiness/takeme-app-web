import React from 'react';
import './Provider.scss';
import history from '../../../history/history';
import {useNavigate} from "react-router-dom";
import ProviderProfile from "./ProviderProfile/ProviderProfile";
import ProviderProducts from "./ProviderProducts/ProviderProducts";
import Socials from "./Socials/Socials";

const Provider = ({provider: p}) => {
    const navigator = useNavigate();
    return (
        <div className={'Provider'}>
            <ProviderProfile provider={p} />
            <ProviderProducts products={p?.products && p.products} />
            {
                p?.products && (
                    <Socials />
                )
            }

        </div>
    );
};

export default Provider;