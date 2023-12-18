import React, {useEffect, useRef, useState} from 'react';
import './Provider.scss';
import history from '../../../history/history';
import {useNavigate} from "react-router-dom";
import ProviderProfile from "./ProviderProfile/ProviderProfile";
import ProviderProducts from "./ProviderProducts/ProviderProducts";
import Socials from "./Socials/Socials";
import Gallery from "./ProviderProducts/ProviderProduct/Gallery/Gallery";

const Provider = ({provider: p, prov, search, closeGallery, galleryProduct, socials, link, openGallery, providerOrNot}) => {
    const [activeProduct, setActiveProduct] = useState(null);
    const navigator = useNavigate();
    const [gallery, setGallery] = useState(false);

    const providerRef = useRef();
    useEffect(() => {
        if (!p) return;
        // console.log(p?.products[Object.keys(p?.products)[0]]?[0]);
        setActiveProduct(p?.products[Object.keys(p?.products)[0]] && p?.products[Object.keys(p?.products)[0]][0]);
    }, [p]);
    return (
        <div ref={providerRef} className={'Provider'} style={{gap: `${providerOrNot ? 0 : 10}px`}}>
            <div style={{background: `${prov && '#EEF2F5'}`, marginLeft: 'auto', width: '100%', paddingBottom: '10px'}}>
                <ProviderProfile activeProduct={activeProduct} prov={prov} socials={socials} link={link} provider={p} />
                {
                    socials && <Socials activeProduct={activeProduct} provider={p} right />
                }
            </div>
            <ProviderProducts setGallery={setGallery} provider={p} providerRef={providerRef} search={search} providerOrNot={providerOrNot} setActiveProduct={setActiveProduct} products={p?.products && p.products} openGallery={openGallery}/>
            {
                !providerOrNot && p?.products && (
                    <Socials activeProduct={activeProduct} provider={p} />
                )
            }
            {
                gallery && <Gallery gallery={gallery} product={galleryProduct} closeGallery={closeGallery} setGallery={setGallery} />
            }
        </div>
    );
};

export default Provider;