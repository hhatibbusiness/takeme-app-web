import React, {useEffect, useRef, useState} from 'react';
import './Provider.scss';
import ProviderProfile from "./ProviderProfile/ProviderProfile";
import ProviderProducts from "./ProviderProducts/ProviderProducts";
import SocialsNew from "./SocialsNew/SocialsNew";

const Provider = ({provider: p, prov, takemeUserToken, currentUser, url, products, searchPage, productTypes, search, closeGallery, galleryProduct, socials, link, openGallery, providerOrNot}) => {
    const [activeProduct, setActiveProduct] = useState(null);
    const [gallery, setGallery] = useState(false);

    const providerRef = useRef();

    useEffect(() => {
        if (!p) return;
        setActiveProduct(p?.products[Object.keys(p?.products)[0]] && p?.products[Object.keys(p?.products)[0]][0]);
    }, [p]);

    return (
        <div id={`${p?.id}`} ref={providerRef} className={'Provider'} style={{gap: `${providerOrNot ? 0 : 0}px`}}>
            <div style={{background: `${prov && '#EEF2F5'}`, marginLeft: 'auto', width: '100%', paddingBottom: '10px'}}>
                {!providerOrNot && <ProviderProfile currentUser={currentUser} takemeUserToken={takemeUserToken} providerOrNot={false} activeProduct={activeProduct} prov={prov} socials={socials} link={link} provider={p} />}
            </div>
            <ProviderProducts url={url} product={products} searchPage={searchPage} productTypes={productTypes} setGallery={setGallery} provider={p} providerRef={providerRef} search={search} providerOrNot={providerOrNot} setActiveProduct={setActiveProduct} products={p?.products && p.products} openGallery={openGallery}/>
            <hr />
            {
                !providerOrNot && p?.products && !searchPage &&  (
                    <SocialsNew currentUser={currentUser} takemeUserToken={takemeUserToken} activeProduct={activeProduct} provider={p} />
                )
            }
        </div>
    );
};

export default React.memo(Provider);