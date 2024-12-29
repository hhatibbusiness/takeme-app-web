import React, { useEffect, useState } from "react";
import './Age.css';
import { CalculateAge } from "./utility/utility";
import Shimmer from "../shimmer/shimmer";
import { Input } from '../components/Components';
import Right from '../../../assets/images/profile/Right.png';

export default function Age({ Focused, FocusHandle, ProfileData, ProfileActions }) {
    const [date, setDate] = useState(ProfileData?.dateOfBirth || {});
    const [tempDate, setTempDate] = useState(ProfileData?.dateOfBirth || {}); // Temporary state for editing
    const [age, setAge] = useState(' ');
    const [showedDate, setShowedDate] = useState('');

    /// Update the temporary date of birth for editing
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
                setTempDate({...tempDate, ...newDate}); // Update temporary date
            } else {
                setTempDate({ ...tempDate, 'year': '', 'month': '', 'day': '' });
            }
        } else {
            setTempDate({...tempDate, 'year': '', 'month': '', 'day': '' });
        }
    };

    // Handle the save button
    const handleSave = () => {
        if (tempDate?.year && tempDate?.month && tempDate?.day) {
            ProfileActions.updateDateOfBirth(tempDate);
            setDate(tempDate); // Update actual date
            setAge(CalculateAge(tempDate)); // Update displayed age
            FocusHandle(!Focused);
        }
    };

    // Handle discard action
    const handleDiscard = () => {
        setTempDate(date); // Revert to saved date
        //if (ProfileData?.dateOfBirth?.year && ProfileData?.dateOfBirth?.month && ProfileData?.dateOfBirth?.day)
            //setShowedDate(`${date?.year || ''}/${date?.month || ''}/${date?.day || ''}`);
    };

    /// Load saved date of birth on component mount or profile data change
    useEffect(() => {
        setDate(ProfileData?.dateOfBirth);
        setTempDate(ProfileData?.dateOfBirth); // Initialize tempDate
        if (ProfileData?.dateOfBirth?.year && ProfileData?.dateOfBirth?.month && ProfileData?.dateOfBirth?.day) {
            setAge(CalculateAge(ProfileData?.dateOfBirth));
            setShowedDate(`${ProfileData?.dateOfBirth?.year}/${ProfileData?.dateOfBirth?.month}/${ProfileData?.dateOfBirth?.day}`);
        }
    }, [ProfileData?.dateOfBirth]);


    useEffect(()=> {
        handleDiscard()
    }, [Focused])

    return (
        <div className={`AgeContainer ${Focused ? 'focused__Age' : 'focused__Age_closed'}`}>
            {ProfileData.isLoading ? <Shimmer /> :
                <div className='Age__Container' onClick={() => FocusHandle(true)}>
                    {age}
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
                            onChange={(name) => handleInputChange(name)}
                        />
                    </div>
                    <div className="UnderInput__Age">
                        <div className="UnderInputChecked__Age">
                            <input 
                                type="checkbox" 
                                id="ageCheckbox" 
                                name="ageCheckbox" 
                                checked={tempDate?.display || false} 
                                onChange={() => setTempDate(prev => ({ ...prev, 'display': !prev?.display }))}
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
