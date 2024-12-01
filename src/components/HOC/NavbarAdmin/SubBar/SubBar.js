import React, { useEffect, useState } from 'react';
import './SubBar.css';
import searchImage from '../../../../assets/defaults/Search Gray.png';
import sortImage from '../../../../assets/defaults/Sorting Arrows.png';
import addImage from '../../../../assets/defaults/Add.png';
import { Link, useLocation } from 'react-router-dom';
import DotsDropDown from '../../../DotsDropDown/DotsDropDown';
import useDebounce from '../../../../utilty/useDebounce';

const SubBar = ({searchFun, hasSort, isSearching, urls, baseData, changeSort, fetchingSearchResults, closeSearch, openSearch, searchTerm, setSearchTerm, sortType}) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [event, setEvent] = useState('');

    const searchTermChangeHandler = e => {
        setSearchTerm(e.target.value);
        setEvent(e);
    }

    useEffect(() => {
        if (baseData) {
            searchFun(baseData(event));
        }
    }, [debouncedSearchTerm]);

    return (
        <div className='SubBar'>
            <div className='SubBar__right'>
                {
                    isSearching ? (
                        <div className='SubBar__box'>
                            <input onChange={searchTermChangeHandler} value={searchTerm} placeholder='شو اللغة البدك ياه..' />
                            <span onClick={e => {
                                closeSearch()
                            }} className='SubBar__box--close'><i class="fa-solid fa-xmark"></i></span>
                        </div>
                    ): (
                        <div onClick={e => {
                            openSearch();
                        }} className='SubBar__right--search'>
                            <img className='SubBar__icon' src={searchImage} />
                        </div>
                    )
                }
            </div>
            <div className='SubBar__left'>
                {
                    hasSort && (
                        <div onClick={e => setOpen(true)} className='SubBar__left--sort'>
                            <img className='SubBar__icon' src={sortImage} />
                        </div>
                    )
                }
                {
                    !isSearching && (
                        <Link to={urls?.addUrl} className='SubBar__left--add'>
                            <img className='SubBar__icon' src={addImage} />
                        </Link>

                    )
                }
                {
                    open && <DotsDropDown sortType={sortType} searchKey={searchTerm} open={open} setOpen={setOpen} sort={true} changeSort={changeSort} />
                }
                {
                    open && <div onClick={e => setOpen(false)} className='DotsDropDown__backdrop'></div>
                }
            </div>
        </div>
    )
}

export default SubBar;