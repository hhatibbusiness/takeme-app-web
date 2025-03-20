import React from "react";
import './Gender.css'
import Shimmer from '../shimmer/shimmer'
import translation from '../../../locales/ar/translation.json'
import MaleLogo from '../../../assets/images/profile/MaleLogo.png'
import FemaleLogo from '../../../assets/images/profile/FemaleLogo.png'
import othersGender from '../../../assets/images/profile/othersGender.png'
import NoGender from '../../../assets/images/profile/NotSelected_Gender.png'
import OrangeVLine from '../../../assets/images/profile/OrangeVLine.png'
import useDoubleTap from "../../../utilty/useDoubleClick";

export default function Gender({ Focused, allow, visited, GenderFocused, ProfileData, updateGender }) {
    const genderList = translation.genderList
    let Logo = NoGender;
    if (ProfileData?.gender === 1) {
        Logo = MaleLogo
    } else if (ProfileData?.gender === 2) {
        Logo = FemaleLogo
    } else if (ProfileData?.gender === 3) {
        Logo = othersGender
    }

    const handleGender = (Gender) => {
        updateGender(ProfileData.id, Gender, visited);
        GenderFocused(false);
    }

    const doubleTapHandler = useDoubleTap(()=> GenderFocused(!Focused));

    return(
        <div className={`GenderLogo__Container ${Focused ? 'focused' : 'focused_close'}`}>
            {ProfileData.isLoading ? <Shimmer /> :
                <>
                <div className="GenderLogo">           
                    <img src={Logo} alt='Logo' onClick={ () =>  allow && doubleTapHandler()} />
                </div>
                {Focused && (
                    <div className="Gender__dropDown">
                        {genderList.map((item, index) => 
                                <>
                                    <button key={item.id} 
                                            className={`Gender__button ${ProfileData.gender=== item.id && 'selected_button__Location'}`} 
                                            onClick={()=> handleGender(item.id)} >
                                                { item.name }
                                    </button>

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