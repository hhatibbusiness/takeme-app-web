import React, { useState } from "react";
import './SearchInput.css'
import SpinnerSmall from '../SpinnerSmall/SpinnerSmall';
import RightMark from '../../assets/images/profile/Right.png'

export default function SearchInput({ 
    PlaceHolderTEXT,
    defaultValue,
    selectFunc,
    searchFunc,
    data,
    isSearch,
    width='100%',
    height='100%',
    shadow=false,
    handleClose,
    handleSave,
}){
    const [value, setValue] = useState(defaultValue || '');
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearch = (searchKey) => {
        setValue(searchKey);
        searchFunc({page: 0, lan: "ar_SA", searchKey: searchKey})
    }

    const handleCheckItem = (item) => {
        setValue(item.translations.fields[0].value);
        selectFunc(item);
        setSearchOpen(false)
    }

    return(
        <>
        <div className="overlaySearchInput" onClick={handleClose}/>
        <div className={`SearchInput__Location`} style={{ width: width, height: height}}>
            <i class="fa-solid fa-chevron-down" style={{ fontSize: "12px", padding: "5px"}}></i>
            <input type="text"
                    placeholder={PlaceHolderTEXT} 
                    value={value}
                    onChange={(e)=> handleSearch(e.target.value)}
                    onFocus={()=> setSearchOpen(true)}
            />
            {searchOpen && value !== '' && !isSearch &&
                    <div className="ResultSearch__SeachInput">
                        {data?.length > 0 ? (
                            data.map((item, index) => (
                                <div    
                                    className='SearchResultsItem__Location' 
                                    key={index}
                                    onClick={()=> handleCheckItem(item)} >{highlightText(item.translations.fields[0].value, value)}
                                </div>
                            ))
                        ) : (
                            <div className="SearchResultsNoItem__Location">
                                إذا بلدك غير متواجد راسلنا الاضافتها
                            </div>
                        )}
                    </div>
            }
        </div>
        <div style={{position:"relative", height: "20px", marginLeft: "5px", zIndex: "500"}}>
            <img src={RightMark} alt="Right" onClick={handleSave} height={"100%"}/>
        </div>
        </>
    )
}

function highlightText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
        part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={index} style={{ color: '#07AB83' }}>{part}</span> : 
        part
    );
}
