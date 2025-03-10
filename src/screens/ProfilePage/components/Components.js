import React, { useState, useEffect } from "react";
import './Components.css'
import downArrow  from '../../../assets/images/profile/downArrow.png'


export function DropDown({ PlaceHolderTEXT, width='100%', height='100%' }){
    return(
        <div className="DropDown__Container" style={{ width: width, height: height }}>
            {PlaceHolderTEXT}
            <img src={downArrow} alt="DOWNARROW" />
        </div>
    )
}


export function Input({ PlaceHolderTEXT, value, onChange, type="text", width, height, style={}, maxLength }) {
    return(
        <div className="Input__Location" style={{width: width||'100%', height: height||'100%', ...style}}>
            <input type={type}
                    placeholder={PlaceHolderTEXT}
                    value={value}
                    onChange={(e)=> onChange(e.target.value)}
                    maxLength={maxLength}
            />
        </div>
    )
}

export function TextArea({ PlaceHolderTEXT, value, onChange }){
    return(
        <div className="TextArea__Location" >
            <textarea type="text" placeholder={PlaceHolderTEXT} value={value} onChange={(e)=> onChange(e.target.value)}/>
        </div>
    )
}