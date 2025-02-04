import React, { useState, useEffect } from "react";
import './SearchInput.css'
import SearchIcon from '../../../../assets/images/profile/SearchIcon.png'
import { SearchPlaces } from './../../models/manageCountry'

export default function SearchInput({ PlaceHolderTEXT, defualtValue, selectFunc, searchFun, width='100%', height='100%', shadow=false, countryId }){
    const [value, setValue] = useState(defualtValue || '');
    const [listCountry, setListCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const handleSearch = (name) => {
        setValue(name)
    }
    const handleCheckItem = (item)=> {
        setValue(item.translations.fields[0].value);
        setIsSearch(false);
        selectFunc(item)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (value === '' && !isLoading ) return;
            setIsLoading(prev => true);
            try {
                const res = await SearchPlaces({searchKey: value, countryID: countryId});
                setListCountry(res);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [value])

    return(
        <>
        {isSearch && shadow && <div className='overlaySearch' onClick={()=> setIsSearch(false)}/>}
        <div className={`SearchInput__Location ${isSearch ? "focused__SearchElement" : "focused__SearchElement_closed"}`} style={{ width: width, height: height}}>
            <img src={SearchIcon} alt="SEARCHICON" />
            <input type="text"
                    placeholder={PlaceHolderTEXT} 
                    value={value}
                    onChange={(e)=> handleSearch(e.target.value)}
                    onFocus={()=> setIsSearch(true)}
            />
            {value !== '' && !isLoading && isSearch &&
                    <div className="ResultSearch__SeachInput">
                        {listCountry?.length > 0 ? (
                            listCountry.map((item, index) => (
                                <div    
                                    className='SearchResultsItem__Location' 
                                    key={index}
                                    onClick={()=> handleCheckItem(item)} >{highlightText(item.translations.fields[0].value, value)}</div>
                            ))
                        ) : (
                            <div className="SearchResultsNoItem__Location">
                                إذا بلدك غير متواجد راسلنا الاضافتها
                            </div>
                        )}
                    </div>
            }
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
