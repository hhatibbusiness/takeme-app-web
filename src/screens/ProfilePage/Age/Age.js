import React, { useEffect, useState } from "react";
import './Age.css';
import { CalculateAge } from "./utility/utility";
import Shimmer from "../shimmer/shimmer";
import { Input } from '../components/Components';
import Right from '../../../assets/images/profile/Right.png';

export default function Age({ Focused, FocusHandle, ProfileData, ProfileActions }) {
    const [ dateOfBirth , setDateBirth ] = useState({})
    const [ value, setValue ] = useState(null)
    const [ display, setDisplay ] = useState(null)

    /// Update the date of birth for editing
    const handleInputChange = (name) => {
        let value = name.replace(/[^\d]/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 4) value = `${value.slice(0, 4)}/${value.slice(4)}`;
        if (value.length > 7) value = `${value.slice(0, 7)}/${value.slice(7)}`;
        setValue(value);
    };

    // Save Data
    const handleSave = ()=>{
        let valueData = value.split("/");
        if (valueData?.length == 3 ) {
            const data = { "year": valueData[0], "month": valueData[1] , "day": valueData[2], "display": display}
            setDateBirth(data)
            ProfileActions.updateDateOfBirth(data)
            FocusHandle(false)
        }
    }

    /// Handle Change data
    useEffect(()=>{
        setDateBirth(ProfileData?.dateOfBirth || {})
    }, [ProfileData.isLoading])

    useEffect(()=> {
        setDisplay(dateOfBirth?.display)
        if (dateOfBirth?.year && dateOfBirth?.month && dateOfBirth?.day) {
            setValue(`${dateOfBirth.year}/${dateOfBirth.month}/${dateOfBirth.day}`)
        } else {
            setValue(null)
        }
    }, [Focused, ProfileData.isLoading])

    return (
        <div className={`AgeContainer ${Focused ? 'focused__Age' : 'focused__Age_closed'}`}>
            {ProfileData.isLoading ? <Shimmer /> :
                <div className='Age__Container' onClick={() => FocusHandle(true)}>
                    {CalculateAge(dateOfBirth)}
                </div>
            }
            {/* Conditionally render the input field */}
            {Focused && (
                <div className="Input-Age__Container">
                    <div className="Input__Age">
                        <Input
                            type="text" 
                            PlaceHolderTEXT="YYYY/MM/DD"
                            value={value}
                            onChange={(name) => handleInputChange(name)}
                        />
                    </div>
                    <div className="UnderInput__Age">
                        <div className="UnderInputChecked__Age">
                            <input 
                                type="checkbox" 
                                id="ageCheckbox" 
                                name="ageCheckbox" 
                                checked={display} 
                                onChange={() => setDisplay(!display)}
                            />
                            <label>اخفاء</label>
                        </div>
                        <img src={Right} alt="Right" onClick={handleSave} />
                    </div>
                </div>
            )}
        </div>
    );
}
