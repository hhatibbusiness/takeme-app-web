import React, { useEffect, useState } from "react";
import './Age.css';
import { CalculateAge } from "./utility/utility";
import Shimmer from "../shimmer/shimmer";
import { Input } from '../components/Components';
import Right from '../../../assets/images/profile/Right.png';

export default function Age({ Focused, setFocused, isLoading, ProfileData, setProfileData }) {
    const [date, setDate] = useState(ProfileData?.dateOfBirth || {});
    const [age, setAge] = useState(' ');
    const [showedDate, setShowedDate] = useState('');

    /// Update the date of birth in the profile data after changing
    const handleInputChange = (name) => {
        let value = name.replace(/[^\d]/g, "");
        if (value.length > 8) value = value.slice(0, 8);
    
        if (value.length > 4) value = `${value.slice(0, 4)}/${value.slice(4)}`;
        if (value.length > 7) value = `${value.slice(0, 7)}/${value.slice(7)}`;
        setShowedDate(value);

        if (value.length === 10) {
            let speDate = value.split("/");
            let year = parseInt(speDate[0]);
            let month = parseInt(speDate[1]);
            let day = parseInt(speDate[2]);
            if (year > 0 && month > 0 && month < 13 && day > 0 && day < 32) {
                let newDate = { 'year': year, 'month': month, 'day': day };
                setDate(prev => ({...prev, ...newDate}));
                setAge(CalculateAge(newDate));
            };
        } else {
            setDate(prev => ({...prev, 'year': '', 'month': '', 'day': ''}));
            setAge(' ');
        }
    };

    // Handle the save button
    const handleSave = () => {
        if (date?.year && date?.month && date?.day) {
            setProfileData(prev => ({...prev, 'dateOfBirth': date}));
            setAge(CalculateAge(date));
            setFocused(!Focused);
        }
    };

    /// Update the date of birth in the profile data after Loading
    useEffect(() => {
        setDate(ProfileData?.dateOfBirth);
        if (ProfileData?.dateOfBirth?.year && ProfileData?.dateOfBirth?.month && ProfileData?.dateOfBirth?.day) {
            setAge(CalculateAge(ProfileData?.dateOfBirth));
            setShowedDate(`${ProfileData?.dateOfBirth?.year}/${ProfileData?.dateOfBirth?.month}/${ProfileData?.dateOfBirth?.day}`);
        }
    }, [ProfileData?.dateOfBirth]);

    return (
        <div className={`AgeContainer ${Focused ? 'focused__Age' : 'focused__Age_closed'}`}>
            {isLoading ? <Shimmer /> :
                <div className='Age__Container' onClick={() => setFocused(true)} >
                    { age }
                </div>
            }
            {/* Conditionally render the input field */}
            {Focused && (
                <div className="Input-Age__Container">
                    <div className="Input__Age">
                        <Input
                            type="text" 
                            PlaceHolderTEXT="YYYY/MM/DD"
                            value={showedDate}
                            onChange={(name)=> handleInputChange(name)}
                        />
                    </div>
                    <div className="UnderInput__Age">
                        <div className="UnderInputChecked__Age">
                            <input type="checkbox" id="ageCheckbox" name="ageCheckbox" checked={date?.isDisabled} onChange={()=> setDate(prev=> ({...prev, 'isDisabled': !prev.isDisabled}))}/>
                            <label>اخفاء</label>
                        </div>
                        <img src={Right} alt="Right" onClick={()=> handleSave()}/>
                    </div>
                </div>
            )}
        </div>
    );
}
