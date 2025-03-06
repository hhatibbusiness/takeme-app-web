import React, { useState, useEffect } from "react";
import './PopUp.css'
import exist from '../../../../assets/images/profile/exist.png'
import Right from '../../../../assets/images/profile/Right.png'
import { DropDown, Input as FormInput, TextArea } from "../../components/Components";
import Input from "../../../../components/InputAdmin/Input";
import SearchInput from "../../components/SearchInput/SearchInput";
import { SearchPlaces } from "./../../models/manageCountry";


export default function PopUpLocation ({ setFocused, ProfileData, handleSave, countryData }) {
    const [locationData, setLocationData] = useState(ProfileData?.location || {});
    const addressValid = locationData?.address?.length <= 40 || !locationData?.address;
    const buildingNumber = locationData?.buildingNumber?.length <= 10 || !locationData?.buildingNumber;
    const postalCode = locationData?.postalCode?.length <= 10 || !locationData?.postalCode;

    const createRules = (len, val) => ({
        maxLength: {
            value: len,
            valid: val,
            message: `اكبر عدد من الحروف ${len} حرف`
        }
    });

    const isNumber = (value)=>{
        return (value?.trim() == '' || Number(value))
    }

    const handleSaveClick = (data) => {
        if (!addressValid || !buildingNumber || !postalCode) return
        handleSave(data);
    }

    return(
        <div className="PopUp__location">
            <div className="Header__Location_Popup">
                <img src={exist} className="existButton__Location"  alt="EXIST" onClick={()=> setFocused(false)}/>
                <img src={Right} className="RightButton__Location"  alt="RIGHT" onClick={()=> handleSaveClick(locationData)}/>
            </div>
            <div className="InputsContainer__Location_Popup">
                <div style={{ height: '60px' }}>
                    <DropDown PlaceHolderTEXT={countryData?.name} />
                </div>
                <SearchInput PlaceHolderTEXT = "اسم البلد"
                            defualtValue={locationData?.placesResponseDto?.translations?.fields.find(item => item.key === 'name')?.value} 
                            searchFun={SearchPlaces}
                            selectFunc={(v)=> setLocationData(prev => ({...prev, placesResponseDto: v}))}
                            height='60px'
                            countryId={countryData?.id}
                            shadow={true}
                />
                <Input
                    id="street-name"
                    placeholder={'اسم الشارع'}  
                    value={locationData?.address || ""}
                    setValue={(v)=> setLocationData(prev => ({...prev, address: v}))}
                    touched={true}
                    valid={addressValid}
                    submitted={true}
                    required={false}
                    rules={createRules(20, addressValid)}
                />
                <Input 
                    id="building-number"
                    placeholder={'رقم البيت'}   
                    value={locationData?.buildingNumber || ""} 
                    setValue={(v)=> isNumber(v) && setLocationData(prev => ({...prev, buildingNumber: v}))}
                    touched={true}
                    valid={buildingNumber}
                    submitted={true}
                    required={false}
                    type="number"
                    rules={createRules(10, buildingNumber)}
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
                    valid={postalCode}
                    submitted={true}
                    required={false}
                    type="number"
                    rules={createRules(10, postalCode)}
                />
                <TextArea PlaceHolderTEXT={"ملاحظات"} 
                            value={locationData?.comments || ""}
                            onChange={(v)=> setLocationData(prev => ({...prev, comments: v}))}
                />
            </div>
        </div>
    )
}
