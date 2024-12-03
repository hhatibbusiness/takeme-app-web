import React from "react";
import './Gender.css'
import Shimmer from '../shimmer/shimmer'
import translation from '../../../locales/ar/translation.json'
import MaleLogo from '../../../assets/images/profile/MaleLogo.png'
import FemaleLogo from '../../../assets/images/profile/FemaleLogo.png'
import OrangeVLine from '../../../assets/images/profile/OrangeVLine.png'


export default function Gender({ Focused, setFocused, isLoading, ProfileData, setProfileData }) {
    const genderList = translation.genderList

    const handleGender = (Gender) => {
        setProfileData({...ProfileData, gender: Gender})
        setFocused(false)
    }
    
    const Logo = (ProfileData?.gender === 1 ) ?  MaleLogo : FemaleLogo
    return(
        <div className={`GenderLogo__Container ${Focused ? 'focused' : 'focused_close'}`}>
            {isLoading ? <Shimmer /> :
                <>
                <div className="GenderLogo">           
                    <img src={Logo} alt='Logo' onClick={()=> setFocused(!Focused)} />
                </div>
                {Focused && (
                    <div className="Gender__dropDown">
                        {genderList.map((item, index) => 
                                <>
                                    <button key={item.id} className={`Gender__button ${ProfileData.gender=== item.id && 'selected_button__Location'}`} onClick={()=> handleGender(item.id)}>{ item.name }</button>
                                    {index < genderList.length -1 && 
                                        <img src={OrangeVLine} alt='OrangeVLine' style={{ height: '100%', width: 'auto'}} />}
                                </>
                        )}
                    </div> 
                )}
                </>
            }
        </div>
    )
}