import React, { useState, useEffect } from "react";
import './Location.css'
import LocationLogo from '../../../assets/images/profile/Location.png'
import PopUpLocation from "./PopUp/PopUp";
import { DropDown } from '../components/Components'
import SearchInput from '../components/SearchInput/SearchInput'
import Shimmer from '../shimmer/shimmer'
import RightMark from '../../../assets/images/profile/Right.png'
import {getListCountry} from './../models/manageCountry'

export default function Location({ Focused, setFocused, ProfileData, UpdateLocation }) {
    const [selectInput, setSelectInput] = useState()
    console.log(selectInput)

    const handleSave = ()=> {
        UpdateLocation({ placeId: selectInput?.id})
        setFocused(false)
    }

    return(
        <>
            <div className={`LocationElementContainer ${Focused ? 'Location__focused': 'closeFocused'}`}>
                <div className="Location__Container" onClick={()=> setFocused(true)}>
                    {ProfileData.isLoading ? <Shimmer /> :  <img src={LocationLogo} alt="LocationLogo" /> } 
                </div>
                {Focused ?
                    <div className="Location__DropDown__First">
                        <DropDown PlaceHolderTEXT={"اسم الدوله"} height="30%"/>
                        <SearchInput PlaceHolderTEXT="اسم بلدك"
                                        defualtValue={selectInput?.translations?.fields[0]?.value} 
                                        searchFun={getListCountry}
                                        selectFunc={ (item)=>{ setSelectInput(item) } }
                                        height="30%" />
                        <img src={RightMark} alt="Right" height={'15%'} onClick={handleSave} />
                    </div>
                : null}
            </div>
            {/*Focused ?  <PopUpLocation setFocused={setFocused} ProfileData={ProfileData} setProfileData={setProfileData} /> : null*/}
        </>
    )
}

const isCountryFound = (ProfileData) => {
  return !!ProfileData?.baseProfile?.location?.place?.country;
};