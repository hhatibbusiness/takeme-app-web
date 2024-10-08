import React from 'react';
import ProviderImage from "./ProviderImage/ProviderImage";
import ProviderBody from "./Providerbody/ProviderBody";
import './ProviderProfile.scss';
import {useNavigate} from "react-router-dom";
import {togglePopup} from "../../../../store/actions/ui.actions";
import {connect} from "react-redux";
import {getAnalytics, logEvent} from "firebase/analytics";

const ProviderProfile = ({provider: p, takemeUserToken, currentUser, search, togglePopup, activeProduct, prov, link, socials}) => {
    const navigate = useNavigate();

    return (
        <div onClick={(e) => {
            e.preventDefault();
            search && togglePopup();
            link && navigate(`/provider/${p?.providerId}`);
            if(p?.providerId == 9) {
                const analytics = getAnalytics();
                logEvent(analytics, 'Ameen_clicked_from_product', {
                    provider_id: p?.providerId,
                    productId: activeProduct?.id
                });
            }
        }} style={{cursor: `${link && 'pointer'}`}} className={`ProviderProfile ${prov ? 'ProviderProfile__provider' : ''} `}>
            <ProviderImage p={p} activeProduct={activeProduct} id={p?.id} img={p?.imagePath && p.imagePath} prov={prov} />
            <ProviderBody takemeUserToken={takemeUserToken} currentUser={currentUser} activeProduct={activeProduct} prov={prov} socials={socials} provider={p} />
            <div className="ProviderBody__location">
                {/*<img src={locationImage}/>*/}
                <i className="fa-solid fa-location-dot"></i>
                <p className={'ProviderBody__city'}>{p?.city && p?.city}</p>
            </div>

        </div>
    );
};

export default connect(null, {togglePopup}) (React.memo(ProviderProfile));