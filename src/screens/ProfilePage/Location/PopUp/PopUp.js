import React, { useState } from "react";
import './PopUp.css'
import exist from '../../../../assets/images/profile/exist.png'
import Right from '../../../../assets/images/profile/Right.png'
import { DropDown, Input, TextArea } from "../../components/Components";
import SearchInput from "../../components/SearchInput/SearchInput";
import { SearchPlaces } from "./../../models/manageCountry";


export default function PopUpLocation ({ setFocused, ProfileData, handleSave, countryData }) {
    const [locationData, setLocationData] = useState(ProfileData?.location || {});

    const isNumber = (value)=>{
        return (value?.trim() == '' || Number(value))
    }

    return(
        <div className="PopUp__location">
            <img src={exist} className="existButton__Location"  alt="EXIST" onClick={()=> setFocused(false)}/>
            <img src={Right} className="RightButton__Location"  alt="RIGHT" onClick={()=> handleSave(locationData)}/>
            <div className="InputsContainer__Location_Popup">
                <div style={{ width: '100%', height: '10%', margin: '10px 0'}}>
                    <DropDown PlaceHolderTEXT={countryData?.name} />
                </div>
                <SearchInput PlaceHolderTEXT = "اسم البلد"
                            defualtValue={locationData?.placesResponseDto?.translations?.fields.find(item => item.key === 'name')?.value} 
                            searchFun={SearchPlaces}
                            selectFunc={(v)=> setLocationData(prev => ({...prev, placesResponseDto: v}))}
                            height={'10%'}
                            countryId={countryData?.id}
                            shadow={true}
                />
                <Input
                    PlaceHolderTEXT={'اسم الشارع'}  
                    value={locationData?.address || ""}
                    onChange={(v)=> setLocationData(prev => ({...prev, address: v}))}
                    height={'10%'} 
                />
                <Input 
                    PlaceHolderTEXT={'رقم البيت'}   
                    value={locationData?.buildingNumber || ""} 
                    onChange={(v)=> isNumber(v) && setLocationData(prev => ({...prev, buildingNumber: v}))} 
                    height={'10%'}
                />
                
                <div className="RowAdd_InputData">
                    <Input PlaceHolderTEXT={" رقم الطابق"} 
                            value={locationData?.floorNumber || ""}    
                            onChange={(v)=> isNumber(v) && setLocationData(prev => ({...prev, floorNumber: v}))} 
                            style={{border: "none", borderRadius: "0px" }} 
                    />
                    <Input PlaceHolderTEXT={" رقم الغرفه"} 
                            value={locationData?.roomNumber || ""} 
                            onChange={(v)=> isNumber(v) && setLocationData(prev => ({...prev, roomNumber: v}))}
                            style={{border: "none", borderRadius: "0px" ,borderRight: "1px solid #E5E5E5"}}
                    />
                </div>
                
                <Input PlaceHolderTEXT={"الرقم البريدي"} 
                        value={locationData?.postalCode || ""}   
                        onChange={(v)=> isNumber(v) && setLocationData(prev => ({...prev, postalCode: v}))} 
                        height={'10%'}
                />
                <TextArea PlaceHolderTEXT={"ملاحظات"} 
                            value={locationData?.comments || ""}
                            onChange={(v)=> setLocationData(prev => ({...prev, comments: v}))}
                />
            </div>
        </div>
    )
}
