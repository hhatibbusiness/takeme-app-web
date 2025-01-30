import React, { useEffect, useRef } from "react";
import './InfoError.css';
import ImageLoader from '../../utility/ImageLoader';

// typeSrc: the path of the image that will be shown in the warning pop up in lowercase
// if it is a 'Info' or 'Error'
// EX: WarningAlarm({ CloseFun, typeSrc: 'error' })
export default function InfoError({ CloseFun, typeSrc }) {
    const popupRef = useRef(null);

    useEffect(() => {
        /// Close the popup when clicking outside of its Ref
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                CloseFun();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });

    return (
    <div className="PopUp-Info-container">
        <div ref={popupRef} className="PopUp-Info">

            {/**The Close Button */}
            <div className="close-Info-popup" onClick={CloseFun}>
                <ImageLoader src='close.png' alt='Close' width='100%' height='100%' onClick={CloseFun}/>
            </div>

            {/** Image */}
            <div className="PopUp-Info-img">
                <ImageLoader src={`${typeSrc}.png`} alt='Info' width='100%' height='100%'/>
            </div>
                
            {/** Text */}
            <div dir="rtl" className="PopUp-Info-text">
                يمكنك التواصل مع خدمة عملاء تيكمي اي وقت ترغب فيه
                ولمزيد من المعلومات.
            </div>
        </div>
    </div>

    );
}