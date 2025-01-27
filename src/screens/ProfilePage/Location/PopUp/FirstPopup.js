import React, { useState } from "react";
import './PopUp.css'
import { DropDown } from '../../components/Components'
import SearchInput from '../../components/SearchInput/SearchInput'
import RightMark from '../../../../assets/images/profile/Right.png'
import {SearchPlaces} from '../../models/manageCountry'


export default function FirstPopup({ ProfileData, handleSave }){
    const [placeInput, setPlaceInput] = useState(ProfileData?.location?.placesResponseDto)

    return(
        <div className="Location__DropDown__First">
            <DropDown PlaceHolderTEXT={"اسم الدوله"} height="30%"/>
            <SearchInput PlaceHolderTEXT="اسم بلدك"
                            defualtValue={placeInput?.translations?.fields[0]?.value} 
                            searchFun={ SearchPlaces }
                            selectFunc={ (item)=>{ setPlaceInput(item) } }
                            height="30%" />
            <img src={RightMark} alt="Right" height={'15%'} onClick={()=> handleSave({ placesResponseDto: placeInput })} />
        </div>
    )
}