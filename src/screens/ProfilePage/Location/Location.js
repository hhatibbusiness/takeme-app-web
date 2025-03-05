import React, { useEffect, useState } from "react";
import './Location.css'
import LocationLogo from '../../../assets/images/profile/Location.png'
import No_Location from '../../../assets/images/profile/No_Location.png'
import PopUpLocation from "./PopUp/PopUp";
import Shimmer from '../shimmer/shimmer'
//import FirstPopup from "./PopUp/FirstPopup";
import { countryList } from '../models/manageCountry'

export default function Location({ Focused, setFocused, ProfileData, UpdateLocation }) {
    const [countryData, setCountryData ] = useState()
    const logo = ProfileData.location ? No_Location : LocationLogo

    const handleSave = (props)=> {
        UpdateLocation(ProfileData.id, props)
        setFocused(false)
    }
    console.log("------", ProfileData)
    useEffect(() => {
        const fetchCountry = async () => {
            let data = await countryList();
            data = data || "اسم الدوله"
            setCountryData({...data[0], 'name': data[0]?.translations?.fields.find(item => item?.key === 'name').value})
        }
        fetchCountry();
    }, []);

    
    return(
        <>  
            <div className={`LocationElementContainer ${Focused ? 'Location__focused': 'closeFocused'}`}>
                <div className="Location__Container" onClick={()=> setFocused(true)}>
                    {ProfileData.isLoading ? <Shimmer /> :  
                    <>
                        <img src={logo} alt="LocationLogo" />
                        <div className="LocationLogo_Text">{ProfileData?.location?.placesResponseDto?.translations?.fields[0]?.value}</div>
                    </>
                    }
                </div>
                {/* {!ProfileData?.location && Focused &&
                    <FirstPopup handleSave={handleSave} ProfileData={ProfileData} countryData={countryData} />
                } */}
            </div>
            {Focused &&  <PopUpLocation setFocused={setFocused} ProfileData={ProfileData} countryData={countryData} handleSave={handleSave}/> }
        </>
    )
}