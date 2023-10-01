import React, {useEffect, useState} from 'react';
import './Provider.scss';
import history from '../../../history/history';
import {useNavigate} from "react-router-dom";
import ProviderProfile from "./ProviderProfile/ProviderProfile";
import ProviderProducts from "./ProviderProducts/ProviderProducts";
import Socials from "./Socials/Socials";

const Provider = ({provider: p, prov, search, socials, link, openGallery, providerOrNot}) => {
    const [activeProduct, setActiveProduct] = useState(null);
    const navigator = useNavigate();
    useEffect(() => {
        if (!p) return;
        console.log(p?.products[Object.keys(p?.products)[0]][0]);
        setActiveProduct(p?.products[Object.keys(p?.products)[0]][0]);
    }, [p]);
    return (
        <div className={'Provider'}>
            <div style={{background: `${prov && '#EEF2F5'}`, marginLeft: 'auto', width: '100%', paddingBottom: '10px'}}>
                <ProviderProfile prov={prov} socials={socials} link={link} provider={p} />
                {
                    socials && <Socials activeProduct={activeProduct} provider={p} right />
                }
            </div>
            <ProviderProducts search={search} providerOrNot={providerOrNot} setActiveProduct={setActiveProduct} products={p?.products && p.products} openGallery={openGallery}/>
            {
                p?.products && (
                    <Socials activeProduct={activeProduct} provider={p} />
                )
            }

        </div>
    );
};

export default Provider;