import React from "react";
import './profileImage.css'
import mainImage from '../../assets/images/profile/Profile.png'
import TrustedImg from '../../assets/images/Trusted.png'

const ProfileWithBadge = ({ trusted, size = 100 }) => {
    return (
      <div className="profile-container" style={{ width: size, height: size }}>
        <img src={mainImage} alt="Profile" className="profile-image" />
        {trusted && <img src={TrustedImg} alt="Verified" className="badge" />}
      </div>
    );
};
  
export default ProfileWithBadge;
  