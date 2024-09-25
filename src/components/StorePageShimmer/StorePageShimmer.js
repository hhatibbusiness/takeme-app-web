import React, {useEffect, useState} from 'react';
import './StorePageShimmer.css';
import phoneImage from '../../assets/images/Phone.svg';
import whatsImage from '../../assets/images/whatsapp.svg';
import locationImage from '../../assets/images/location.svg';
import ItemTypesShimmer from "../ItemTypesShimmer/ItemTypesShimmer";
import ItemShimmer from "../ItemShimmer/ItemShimmer";

const StorePageShimmer = ({navHeight}) => {
    const [imageRef, setImageRef] = useState();

    useEffect(() => {
        if(imageRef?.current) {
            imageRef.current.style.height = `${imageRef.current.getBoundingClientRect().width}px`;
        }
    }, [imageRef, imageRef?.current]);
    return (
        <div className={'StorePageShimmer'} style={{paddingTop: `${navHeight}px`}}>
            {/*<div className="StorePageShimmer__categories">*/}
            {/*    <div className="StorePageShimmer__categories--category">*/}
            {/*        <div className="StorePageShimmer__categories--st"></div>*/}
            {/*        <div className="StorePageShimmer__categrories--text"></div>*/}
            {/*    </div>*/}
            {/*    <div className="StorePageShimmer__categories--category">*/}
            {/*        <div className="StorePageShimmer__categories--st"></div>*/}
            {/*        <div className="StorePageShimmer__categrories--text"></div>*/}

            {/*    </div>*/}
            {/*    <div className="StorePageShimmer__categories--category">*/}
            {/*        <div className="StorePageShimmer__categories--st"></div>*/}
            {/*        <div className="StorePageShimmer__categrories--text"></div>*/}

            {/*    </div>*/}
            {/*    <div className="StorePageShimmer__categories--category">*/}
            {/*        <div className="StorePageShimmer__categories--st"></div>*/}
            {/*        <div className="StorePageShimmer__categrories--text"></div>*/}

            {/*    </div>*/}
            {/*    <div className="StorePageShimmer__categories--category">*/}
            {/*        <div className="StorePageShimmer__categories--st"></div>*/}
            {/*        <div className="StorePageShimmer__categrories--text"></div>*/}

            {/*    </div>*/}
            {/*    <div className="StorePageShimmer__categories--category">*/}
            {/*        <div className="StorePageShimmer__categories--st"></div>*/}
            {/*        <div className="StorePageShimmer__categrories--text"></div>*/}

            {/*    </div>*/}
            {/*</div>*/}
            {/*<ItemTypesShimmer />*/}
            <div className="StorePageShimmer__separator"></div>
            <ItemShimmer store={true} setImageRef={setImageRef} value={100} />
            {/*<div className="StorePageShimmer__location"><i className="fa-solid fa-location-dot"></i></div>*/}
        </div>
    );
};

export default StorePageShimmer;