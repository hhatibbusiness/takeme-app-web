import React from 'react';
import './ProviderRatingProfile.css';
import avatarImage from '../../../../../assets/images/avatar.avif';

const ProviderRatingProfile = ({rating}) => {
    return (
        <div className={'ProviderRatingProfile'}>
            <div className="ProviderRatingProfile__avatar">
                <img src={avatarImage} alt=""/>
            </div>
            <div className="ProviderRatingProfile__name">
                <p>{rating.name}</p>
            </div>
        </div>
    );
};

export default ProviderRatingProfile;