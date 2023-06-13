import React from 'react';
import './Footer.scss';
import {connect} from "react-redux";

const Footer = ({assets}) => {
    return (
        <div className={'Footer'}>
            <div className="Footer__logo">
                <p>{assets.footerText}</p>
            </div>
            <div className="Footer__copy">
                <p><i className="fa-regular fa-copyright"></i>{assets.copyRightYear}</p>
            </div>
            <div className="Footer__links">
                <a href={assets.whatsappLink} target={'_blank'} className="Footer__link"><i className="fa-brands fa-whatsapp"></i></a>
                <a href={assets.facebookLink} target={'_blank'} className="Footer__link"><i className="fa-brands fa-facebook"></i></a>
                <a href={assets.instagramLink} target={'_blank'} className="Footer__link"><i className="fa-brands fa-instagram"></i></a>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (Footer);