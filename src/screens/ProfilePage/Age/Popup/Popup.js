import React, { useEffect, useState } from "react";
import './Popup.css'
import { Input } from '../../components/Components';
import Right from '../../../../assets/images/profile/Right.png';


export default function AgePopup({ handleSave, dateOfBirth }) {
    const [ value, setValue ] = useState()
    const [ display, setDisplay ] = useState(dateOfBirth?.display)

    useEffect(()=>{
        if (dateOfBirth?.year && dateOfBirth?.month && dateOfBirth?.day) {
            setValue(`${dateOfBirth.year}/${dateOfBirth.month}/${dateOfBirth.day}`)
        } else {
            setValue(null)
        }    
    }, [])

    /// Update the date of birth for editing
    const handleInputChange = (name) => {
        let value = name.replace(/[^\d]/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 4) value = `${value.slice(0, 4)}/${value.slice(4)}`;
        if (value.length > 7) value = `${value.slice(0, 7)}/${value.slice(7)}`;
        setValue(value);
    };
    
    return(
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
                <img src={Right} alt="Right" onClick={()=> handleSave(value, display)} />
            </div>
        </div>
    )
}