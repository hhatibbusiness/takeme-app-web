import React, { useEffect, useState } from "react";
import './Age.css';
import { CalculateAge } from "./utility/utility";
import Shimmer from "../shimmer/shimmer";
import AgePopup from "./Popup/Popup";


export default function Age({ Focused, FocusHandle, ProfileData, ProfileActions }) {
    const [ dateOfBirth , setDateBirth ] = useState({})

    // Save Data
    const handleSave = (value, display)=>{
        let valueData = value.split("/");
        if (valueData?.length == 3 ) {
            const data = { "year": valueData[0], "month": valueData[1] , "day": valueData[2], "display": display}
            console.log(data)
            if (Number(data?.month) <= 12 && Number(data?.month) >= 1 && Number(data?.day) <= 31 && Number(data?.day) >= 1 ) {
                setDateBirth(data)
                ProfileActions.updateDateOfBirth(data)
                FocusHandle(false)    
            }
        }
    }

    /// Handle Change data
    useEffect(()=>{
        setDateBirth(ProfileData?.dateOfBirth || {})
    }, [ProfileData.isLoading])


    return (
        <>
        <div className={`AgeContainer ${Focused ? 'focused__Age' : 'focused__Age_closed'}`}>
            {ProfileData.isLoading ? <Shimmer /> :
                <div className='Age__Container' onClick={() => FocusHandle(true)}>
                    {CalculateAge(dateOfBirth)}
                </div>
            }
        </div>
        {Focused && (
            <div className="PopupContainer">
                <AgePopup handleSave={handleSave} dateOfBirth={dateOfBirth} />
            </div>
        )}
        </>
    );
}
