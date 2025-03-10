import React from "react";
import './ProfileImage.css'
import mainImage from '../../../assets/images/profile/Profile.png'

export default function ProfileImage ({ ProfileData, setOpenImageManager }){
    const image = ProfileData?.imageAttachment?.path || mainImage
    return(
        <div className="ProfileImage__container" onClick={()=> setOpenImageManager(true)}>
            <img 
                src={image} 
                alt="MainProfileImage"
                onError={(e) => {
                    e.target.src = mainImage;
                }}
            />
        </div>
    )
}
