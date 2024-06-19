import React from 'react';
import ProviderImage from "./ProviderImage/ProviderImage";
import ProviderBody from "./Providerbody/ProviderBody";
import './ProviderProfile.scss';
import {useNavigate} from "react-router-dom";
import {togglePopup} from "../../../../store/actions/ui.actions";
import {connect} from "react-redux";

const ProviderProfile = ({provider: p, takemeUserToken, currentUser, search, togglePopup, activeProduct, prov, link, socials}) => {
    const navigate = useNavigate();

    return (
        <div onClick={(e) => {
            e.preventDefault();
            search && togglePopup();
            link && navigate(`/provider/${p?.providerId}`);
        }} style={{cursor: `${link && 'pointer'}`}} className={`ProviderProfile ${prov ? 'ProviderProfile__provider' : ''} `}>
            <ProviderImage p={p} activeProduct={activeProduct} id={p?.id} img={p?.imagePath && p.imagePath} prov={prov} />
            <ProviderBody takemeUserToken={takemeUserToken} currentUser={currentUser} activeProduct={activeProduct} prov={prov} socials={socials} provider={p} />
        </div>
    );
};

export default connect(null, {togglePopup}) (React.memo(ProviderProfile));