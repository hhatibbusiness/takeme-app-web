import React from 'react';
import './Socials.scss';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createOrder} from "../../../../store/actions/order.actions";

const Socials = ({right, assets, platform, isAuthenticated, provider, createOrder, currentUser, activeProduct, lan}) => {
    const navigate = useNavigate();
    const formatWazeLink = (lat, long) => {
        const linkArray = assets.waze_template.split('%');
        console.log(linkArray);
        let finalLink = `${linkArray[0]}${lat}%${linkArray[1]}${long}`;
        return finalLink;
    }
    const formateMapsLink = (lat, long) => {
        return `${assets.maps_template}${provider.latitude},${provider.longitude}`
    }
    return (
        <div onClick={e => {
            if(!isAuthenticated) {
                navigate('/login');
            }else {
                const order = {
                    orderId: `${currentUser.phone}_${currentUser.name}-${provider.phone}_${provider.name}-${activeProduct.name}-${Date.now()}`,
                    locale: lan,
                    customerId: currentUser?.id,
                    providerId: provider?.id,
                    productId: activeProduct?.id,
                    status: 'started',
                    // "acceptedTermsAndConditions": currentUser?.termsConditionsAccepted,
                    // "sort_index": 15,
                    // "statusDetails": provider?.statusDetails,
                    // "price": 10088,
                    // "comments": activeProduct?.comments
                }
                createOrder(order);
            }
        }} className={`Socials`} style={{marginleft: `${right && 'auto'}`, display: 'flex', alignItems: `${right && 'left'}`, marginRight: `${right && '10px'}`, marginTop: `${right && '10px'}`}}>
            <div target={'_blank'} href={provider.navigateLink}  className="Socials__link  Socials__link--location">
                <i className="fa-solid fa-location-arrow"></i>
                <div className="Socials__location">
                    <a onClick={e => {
                        !isAuthenticated && e.preventDefault();
                    }} target={"_blank"} href={`${!provider.wazeMapLink ? formatWazeLink(provider.latitude, provider.longitude) : provider.wazeMapLink}`}  className="Socials__location--link">
                        <span><i className="fa-brands fa-waze"></i></span>
                        <span>waze</span>
                    </a>
                    <a onClick={e => {
                        !isAuthenticated && e.preventDefault();
                    }} target={"_blank"} href={`${!provider.googleMapLink ? formateMapsLink() : provider.googleMapLink}`} className="Socials__location--link">
                        <span><i className="fa-solid fa-map-location-dot"></i></span>
                        <span>maps</span>
                    </a>
                </div>

            </div>
            <a onClick={e => {
                !isAuthenticated && e.preventDefault();
            }} target={'_blank'} className="Socials__link" href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${provider?.phoneCountryCode && provider?.phoneCountryCode}${provider?.phone && provider.phone}&text=hello` : `http://web.whatsapp.com/send?phone=${provider?.phoneCountryCode && provider?.phoneCountryCode}${provider?.phone && provider.phone}`)}><i className="fa-brands fa-whatsapp"></i></a>
            {/* <a onClick={e => {
                !isAuthenticated && e.preventDefault();
            }} target={'_blank'} className="Socials__link" href={`whatsapp://send?phone=${provider.phoneCountryCode}${provider.phone}`}><i className="fa-brands fa-whatsapp"></i></a> */}
            <a onClick={e => {
                !isAuthenticated && e.preventDefault();
            }} href={`tel:${provider.phoneCountryCode}${provider.phone}`} className="Socials__link">
                <i className="fa-solid fa-phone"></i>
            </a>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
    lan: state.categories.lan,
    currentUser: state.login.data,
    assets: state.assets,
    platform: state.assets.platform
})

export default connect(mapStateToProps, {createOrder}) (Socials);