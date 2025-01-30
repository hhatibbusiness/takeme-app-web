import React from "react";
import './Location.css'
import LocationLogo from '../../../assets/images/profile/Location.png'
import No_Location from '../../../assets/images/profile/No_Location.png'
import PopUpLocation from "./PopUp/PopUp";
import Shimmer from '../shimmer/shimmer'
import FirstPopup from "./PopUp/FirstPopup";


export default function Location({ Focused, setFocused, ProfileData, UpdateLocation }) {

    const logo = ProfileData.location ? No_Location : LocationLogo

    const handleSave = (props)=> {
        UpdateLocation(props)
        setFocused(false)
    }

    return(
        <>  
            <div className={`LocationElementContainer ${Focused ? 'Location__focused': 'closeFocused'}`}>
                <div className="Location__Container" onClick={()=> setFocused(true)}>
                    {ProfileData.isLoading ? <Shimmer /> :  <img src={logo} alt="LocationLogo" /> } 
                </div>
                {!ProfileData?.location && Focused &&
                    <FirstPopup handleSave={handleSave} ProfileData={ProfileData}/>
                }
            </div>
            {ProfileData?.location && Focused &&  <PopUpLocation setFocused={setFocused} ProfileData={ProfileData} handleSave={handleSave}/> }
        </>
    )
}