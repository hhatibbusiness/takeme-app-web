import React, { useState } from "react";
import './PopUp.css'
import exist from '../../../../assets/images/profile/exist.png'
import Right from '../../../../assets/images/profile/Right.png'
import { DropDown, Input, TextArea } from "../../components/Components";
import SearchInput from "../../components/SearchInput/SearchInput";
import { getListCountry } from "../../../../models/manageCountry";


export default function PopUpLocation ({ setFocused, ProfileData, setProfileData }) {
    const [addressData, setAdressData] = useState(ProfileData || {});
    console.log('addressData', addressData)

    const handleSave = () => {
        setProfileData(prev=> addressData);
        setFocused(false);
    };

    return(
        <div className="PopUp__location">
            <img src={exist} className="existButton__Location"  alt="EXIST" onClick={()=>setFocused(prev=> !prev)}/>
            <img src={Right} className="RightButton__Location"  alt="RIGHT" onClick={()=> handleSave()}/>
            <div className="InputsContainer__Location_Popup">
                <div style={{ width: '100%', height: '10%', margin: '10px 0'}}>
                    <DropDown PlaceHolderTEXT={'اختيار الدوله'} />
                </div>
                <SearchInput PlaceHolderTEXT="اسم البلد"
                            defualtValue={addressData?.baseProfile?.location?.place?.country} 
                            searchFun={getListCountry}
                            CheckFun={(v)=>updateCountry(v.name, setAdressData)}
                            height={'10%'} />
                <Input PlaceHolderTEXT={'اسم الشارع'}  value={getStreetName(addressData)} onChange={(v)=> updateStreetName(v, setAdressData)} height={'10%'} />
                <Input PlaceHolderTEXT={'رقم البيت'}   value={getBuildingNumber(addressData)} onChange={(v)=> updateBuildingNumber(v, setAdressData)} height={'10%'}/>
                <Input PlaceHolderTEXT={" رقم الطابق"} value={getFloorNumber(addressData)} onChange={(v)=> updateFloorNumber(v, setAdressData)} height={'10%'}/>
                <Input PlaceHolderTEXT={"الرقم البريدي"} value={getPostalCode(addressData)} onChange={(v)=> updatePostalCode(v, setAdressData)} height={'10%'}/>
                <TextArea PlaceHolderTEXT={"ملاحظات"} value={getComments(addressData)} onChange={(v)=> updateComments(v, setAdressData)}/>
            </div>
        </div>
    )
}


const updateCountry = (newCountry, setData) => {
    setData((prevState) => ({
    ...prevState,
    baseProfile: {
      ...prevState.baseProfile,
      location: {
        ...prevState.baseProfile.location,
        place: {
          ...prevState.baseProfile.location.place,
          country: newCountry,
        },
      },
    },
  }));
};

const updateStreetName = (newStreetName, setData) => {
    setData((prevProfileData) => ({
    ...prevProfileData,
    baseProfile: {
      ...prevProfileData.baseProfile,
      location: {
        ...prevProfileData.baseProfile.location,
        translationsResponseDto: {
          ...prevProfileData.baseProfile.location.translationsResponseDto,
          translations: prevProfileData.baseProfile.location.translationsResponseDto.translations.map(
            (translation) => {
              if (translation.street_name !== undefined) {
                return { ...translation, street_name: newStreetName };
              }
              return translation;
            }
          ),
        },
      },
    },
  }));
};
const getStreetName = (ProfileData) => {
    const translations = ProfileData?.baseProfile?.location?.translationsResponseDto?.translations || [];
    const streetTranslation = translations.find((translation) => translation.street_name !== undefined);
    return streetTranslation?.street_name || undefined;
};
  

const updateBuildingNumber = (newBuildingNumber, setData) => {
    setData((prevProfileData) => ({
    ...prevProfileData,
    baseProfile: {
      ...prevProfileData.baseProfile,
      location: {
        ...prevProfileData.baseProfile.location,
        buildingNumber: newBuildingNumber,
      },
    },
  }));
};
const getBuildingNumber = (ProfileData) => {
    return ProfileData?.baseProfile?.location?.buildingNumber || undefined;
};
  

const updateFloorNumber = (newFloorNumber, setData) => {
    setData((prevProfileData) => ({
    ...prevProfileData,
    baseProfile: {
      ...prevProfileData.baseProfile,
      location: {
        ...prevProfileData.baseProfile.location,
        floorNumber: newFloorNumber,
      },
    },
  }));
};
const getFloorNumber = (ProfileData) => {
    return ProfileData?.baseProfile?.location?.floorNumber || null;
};
  

const updatePostalCode = (newPostalCode, setData) => {
    setData((prevProfileData) => ({
    ...prevProfileData,
    baseProfile: {
      ...prevProfileData.baseProfile,
      location: {
        ...prevProfileData.baseProfile.location,
        postalCode: newPostalCode,
      },
    },
  }));
};
const getPostalCode = (ProfileData) => {
    return ProfileData?.baseProfile?.location?.postalCode || undefined;
};


const updateComments = (newComments, setData) => {
    setData((prevProfileData) => ({
    ...prevProfileData,
    baseProfile: {
      ...prevProfileData.baseProfile,
      location: {
        ...prevProfileData.baseProfile.location,
        translationsResponseDto: {
          ...prevProfileData.baseProfile.location.translationsResponseDto,
          translations: prevProfileData.baseProfile.location.translationsResponseDto.translations.map(
            (translation) => {
              if (translation.comments !== undefined) {
                return { ...translation, comments: newComments };
              }
              return translation;
            }
          ),
        },
      },
    },
  }));
};
const getComments = (ProfileData) => {
    const translations = ProfileData?.baseProfile?.location?.translationsResponseDto?.translations || [];
    const commentsTranslation = translations.find((translation) => translation.comments !== undefined);
    return commentsTranslation?.comments || undefined;
};
  
