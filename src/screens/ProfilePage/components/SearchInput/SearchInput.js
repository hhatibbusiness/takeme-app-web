import React, { useState, useEffect } from "react";
import './SearchInput.css'
import SearchIcon from '../../../../assets/images/profile/SearchIcon.png'
import { getListCountry } from './../../models/manageCountry'

export default function SearchInput({ PlaceHolderTEXT, defualtValue, CheckFun, searchFun, width='100%', height='100%' }){
    const [value, setValue] = useState(defualtValue || '');
    const [listCountry, setListCountry] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const handleSearch = (name) => {
        setValue(name)
    }
    const handleCheckItem = (item)=> {
        setValue(item.name);
        setIsSearch(false);
        CheckFun(item);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (value === '' && !isLoading ) return;
            setIsLoading(prev => true);
            try {
                const res = await getListCountry(value);
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
        <div className="SearchInput__Location" style={{ width: width, height: height}}>
            <img src={SearchIcon} alt="SEARCHICON" />
            <input type="text"
                    placeholder={PlaceHolderTEXT} 
                    value={value}
                    onChange={(e)=> handleSearch(e.target.value)}
                    onFocus={()=> setIsSearch(true)}
            />
            {value !== '' && !isLoading && isSearch &&
                    <div className="ResultSearch__SeachInput">
                        {listCountry.length > 0 ? (
                            listCountry.map((item, index) => (
                                <div    
                                    className='SearchResultsItem__Location' 
                                    key={index}
                                    onClick={()=> handleCheckItem(item)} >{highlightText(item.name, value)}</div>
                            ))
                        ) : (
                            <div className="SearchResultsNoItem__Location">
                                إذا بلدك غير متواجد راسلنا الاضافتها
                            </div>
                        )}
                    </div>
            }
        </div>
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
