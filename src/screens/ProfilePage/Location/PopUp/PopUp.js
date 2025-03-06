import React, { useState } from "react";
import './PopUp.css'
import exist from '../../../../assets/images/profile/exist.png'
import Right from '../../../../assets/images/profile/Right.png'
import { DropDown, Input as FormInput, TextArea } from "../../components/Components";
import Input from "../../../../components/InputAdmin/Input";
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
                <div style={{ height: '60px' }}>
                    <DropDown PlaceHolderTEXT={countryData?.name} />
                </div>
                <SearchInput PlaceHolderTEXT = "اسم البلد"
                            defualtValue={locationData?.placesResponseDto?.translations?.fields.find(item => item.key === 'name')?.value} 
                            searchFun={SearchPlaces}
                            selectFunc={(v)=> setLocationData(prev => ({...prev, placesResponseDto: v}))}
                            height={'60px'}
                            countryId={countryData?.id}
                            shadow={true}
                />
                <Input
                    id="street-name"
                    placeholder={'اسم الشارع'}  
                    value={locationData?.address || ""}
                    setValue={(v)=> setLocationData(prev => ({...prev, address: v}))}
                    touched={true}
                    valid={true}
                    submitted={false}
                    required={false}
                />
                <Input 
                    id="building-number"
                    placeholder={'رقم البيت'}   
                    value={locationData?.buildingNumber || ""} 
                    setValue={(v)=> isNumber(v) && setLocationData(prev => ({...prev, buildingNumber: v}))}
                    touched={true}
                    valid={true}
                    submitted={false}
                    required={false}
                    type="number"
                />
                
                <div className="RowAdd_InputData">
                    <FormInput PlaceHolderTEXT={" رقم الطابق"} 
                            value={locationData?.floorNumber || ""}    
                            onChange={(v)=> isNumber(v) && setLocationData(prev => ({...prev, floorNumber: v}))} 
                            style={{border: "none", borderRadius: "0px" }}
                            type="number"
                    />
                    <FormInput PlaceHolderTEXT={" رقم الغرفه"} 
                            value={locationData?.roomNumber || ""} 
                            onChange={(v)=> isNumber(v) && setLocationData(prev => ({...prev, roomNumber: v}))}
                            style={{border: "none", borderRadius: "0px" ,borderRight: "1px solid #E5E5E5"}}
                            type="number"
                    />
                </div>
                
                <Input 
                    id="postal-code"
                    placeholder={"الرقم البريدي"} 
                    value={locationData?.postalCode || ""}   
                    setValue={(v)=> isNumber(v) && setLocationData(prev => ({...prev, postalCode: v}))} 
                    touched={true}
                    valid={true}
                    submitted={false}
                    required={false}
                    type="number"
                />
                <TextArea PlaceHolderTEXT={"ملاحظات"} 
                            value={locationData?.comments || ""}
                            onChange={(v)=> setLocationData(prev => ({...prev, comments: v}))}
                />
            </div>
        </div>
    )
}
