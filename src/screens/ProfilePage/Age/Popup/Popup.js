import React, { useEffect, useState } from "react";
import './Popup.css';
import DateInput from '../../components/DateInput/DateInput';
import Right from '../../../../assets/images/profile/Right.png';

export default function AgePopup({ handleSave, dateOfBirth }) {
    const [date, setDate] = useState({ year: "", month: "", day: "" });
    const [display, setDisplay] = useState(dateOfBirth?.display);

    useEffect(() => {
        if (dateOfBirth?.year && dateOfBirth?.month && dateOfBirth?.day) {
            setDate({
                year: dateOfBirth.year,
                month: dateOfBirth.month.toString().padStart(2, '0'),
                day: dateOfBirth.day.toString().padStart(2, '0')
            });
        }
    }, [dateOfBirth]);

    const handleChange = ({ year, month, day }) => {
        setDate({ year, month, day });
    };

    return (
        <div className="Input-Age__Container">
            <div className="Input__Age">
                <DateInput value={`${date.year}/${date.month}/${date.day}`} handleChange={handleChange} />
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
                <img src={Right} alt="Right" onClick={() => handleSave(date, display)} />
            </div>
        </div>
    );
}
