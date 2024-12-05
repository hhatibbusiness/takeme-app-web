import React, { useEffect, useRef } from "react";
import './Location.css'
import LocationLogo from '../../../assets/images/profile/Location.png'
import PopUpLocation from "./PopUp/PopUp";
import { DropDown } from '../components/Components'
import SearchInput from '../components/SearchInput/SearchInput'
import Shimmer from '../shimmer/shimmer'
import RightMark from '../../../assets/images/profile/Right.png'
import {getListCountry} from './../models/manageCountry'

export default function Location({ Focused, setFocused, isLoading, ProfileData, setProfileData }) {
    const isFound = useRef(isCountryFound(ProfileData));

    const updateCountry = (newCountry) => {
        setProfileData((prevState) => ({
        ...prevState,
        baseProfile: {
            ...prevState.baseProfile,
            location: {
            ...prevState.baseProfile.location,
            place: {
                ...prevState.baseProfile.location.place,
                country: newCountry,
            }},
        },
        }));
    };
  
  useEffect(() => {
      isFound.current = isCountryFound(ProfileData);
  }, [isLoading, Focused]);

  return(
    <>
      <div className={`LocationContainer ${Focused ? 'Location__focused': 'closeFocused'}`}>
          <div className="Location__Container" onClick={()=> setFocused(true)}>
              {isLoading ? <Shimmer /> :  <img src={LocationLogo} alt="LocationLogo" /> } 
          </div>
          {Focused & !isFound.current ?
            <div className="Location__DropDown__First">
              <DropDown PlaceHolderTEXT={"اسم الدوله"} height="35%"/>
              <SearchInput PlaceHolderTEXT="اسم البلد"
                            defualtValue={ProfileData?.baseProfile?.location?.place?.country} 
                            searchFun={getListCountry}
                            CheckFun={(v)=>updateCountry(v.name)}
                            height="35%" />
              <img src={RightMark} alt="Right" height={'15%'} onClick={()=> setFocused(false)}/>
            </div>
          : null}
      </div>
      {(Focused & isFound.current) ?  <PopUpLocation setFocused={setFocused} ProfileData={ProfileData} setProfileData={setProfileData} /> : null}
    </>
  )
}

const isCountryFound = (ProfileData) => {
  return !!ProfileData?.baseProfile?.location?.place?.country;
};