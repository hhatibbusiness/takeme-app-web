import React from 'react';
import './Socials.scss';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createOrder} from "../../../../store/actions/order.actions";

const Socials = ({right, isAuthenticated, provider, createOrder, currentUser, activeProduct, lan}) => {
    const navigate = useNavigate();
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
            <a target={'_blank'} href={provider.navigateLink} onClick={e => {
                !isAuthenticated && e.preventDefault();
            }} className="Socials__link"><i className="fa-solid fa-location-arrow"></i></a>
            <a onClick={e => {
                !isAuthenticated && e.preventDefault();
            }} target={'_blank'} className="Socials__link" href={`whatsapp://send?phone=201008549612&text=hello`}><i className="fa-brands fa-whatsapp"></i></a>
            {/* <a onClick={e => {
                !isAuthenticated && e.preventDefault();
            }} target={'_blank'} className="Socials__link" href={`whatsapp://send?phone=${provider.phoneCountryCode}${provider.phone}`}><i className="fa-brands fa-whatsapp"></i></a> */}
            <a onClick={e => {
                !isAuthenticated && e.preventDefault();
            }} href={`tel:${provider.phoneCountryCode}${provider.phone}`} className="Socials__link"><i className="fa-solid fa-phone"></i></a>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
    lan: state.categories.lan,
    currentUser: state.login.data
})

export default connect(mapStateToProps, {createOrder}) (Socials);