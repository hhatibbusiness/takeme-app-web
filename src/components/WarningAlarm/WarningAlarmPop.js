import React from "react";
import "./WarningAlarm.css";
import alarm from '../../assets/images/alarm.png'
import warning from '../../assets/images/warning.png'
import SpinnerSmall from "../SpinnerSmall/SpinnerSmall";

// typeSrc: the path of the image that will be shown in the warning pop up in lowercase
// if it is a 'warning' or 'alarm'
// EX: WarningAlarm({ CloseFun, typeSrc: 'warning' })
export default function WarningAlarm({ CloseFun, SaveFun , typeSrc, message, isloading=false }) {
    const image = typeSrc === 'alarm' ? alarm : warning

    return(
        <div className="PopUp-Warning-container">
                <div className="PopUp-Warning">
                    <div className="PopUp-Warning-img">
                        <img src={image} alt='warning' width='100%' height='100%'/>
                    </div>
                    <div dir="rtl" className="PopUp-Warning-text" style={{ whiteSpace: 'pre-line' }}>
                        {message}
                    </div>
                    <div dir="rtl" className="warning-save-cancel-button-container">
                        <div className="warning-save-cancel-button warning__save-button"   onClick={SaveFun}>
                            {isloading ? <SpinnerSmall /> : "موافق"}
                        </div>
                        <div className="warning-save-cancel-button warning__cancel-button" onClick={CloseFun}>إلغاء</div>
                    </div>
                </div>
            </div>
    )
}
