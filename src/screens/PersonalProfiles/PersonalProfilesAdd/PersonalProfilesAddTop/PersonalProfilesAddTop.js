import React, {useEffect, useState} from 'react';
import './PersonalProfilesAddTop.css';
import settingsImage from '../../../../assets/images/Settings.png';
import profileImage from '../../../../assets/images/Default rofile image.png';
import trustedImage from '../../../../assets/images/Trusted.png';
import locationImage from '../../../../assets/images/Location.png';
import {connect} from "react-redux";

const PersonalProfilesAddTop = ({profile}) => {

    return (
        <div className={'PersonalProfilesAddTop'}>
            <div className="PersonalProfilesAddTop__right">
                <img src={settingsImage} alt='Settings' />
                <p className={'personalProfilesAddTop__settings'}>Admin<br/>enable</p>
            </div>
            <div className="PersonalProfilesAddTop__middle">
                <img src={profileImage} alt='Profile' />
                <img src={trustedImage} alt='trusted profile' />
            </div>
            <div className="PersonalProfilesAddTop__left">
                <img src={locationImage} alt='Location' />
                <p className="PersonalProfilesAddTop__location">مصر</p>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    profile: state.auth.profile,
});

export default connect(mapStateToProps) (PersonalProfilesAddTop);