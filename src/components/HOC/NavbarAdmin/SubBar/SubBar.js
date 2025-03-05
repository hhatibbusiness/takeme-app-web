import React, { useEffect, useState } from 'react';
import './SubBar.css';
import { connect } from 'react-redux';
import searchImage from '../../../../assets/defaults/Search Gray.png';
import sortImage from '../../../../assets/defaults/Sorting Arrows.png';
import addImage from '../../../../assets/defaults/Add.png';
import InitButton from '../../../../assets/defaults/InitButton.png'
import { Link, useLocation } from 'react-router-dom';
import DotsDropDown from '../../../DotsDropDown/DotsDropDown';
import useDebounce from '../../../../utilty/useDebounce';
import SearchInput from '../../../SearchInput/SearchInput';
import { searchCountries } from '../../../../store/actions/countries.actions';
import { InitPlaces } from '../../../../store/actions/places.actions';

const SubBar = ({searchFun, hasSort, hasInit, isSearching, urls, baseData, changeSort, fetchingSearchResults, closeSearch, openSearch, searchTerm, setSearchTerm, sortType, countries, searchCountries, InitPlaces}) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [event, setEvent] = useState('');
    const [openInit, setOpenInit] = useState(false)
    const [selectedItem, setSelectedItem] = useState()

    const searchTermChangeHandler = e => {
        setSearchTerm(e.target.value);
        setEvent(e);
    }

    useEffect(() => {
        if (baseData && isSearching) {
            searchFun(baseData(event));
        }
    }, [debouncedSearchTerm, isSearching]);

    return (
        <>
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
                        <div id={'SubBar__search--icon'} onClick={e => {
                            openSearch();
                            setOpenInit(false)
                        }} className='SubBar__right--search'>
                            <img className='SubBar__icon' src={searchImage} />
                        </div>
                    )
                }
            </div>
            <div className='SubBar__left'>
                {
                    !isSearching && hasInit && (
                        <div onClick={e => setOpenInit(!openInit)} className='SubBar__left--sort'>
                            <img className='SubBar__icon' src={InitButton} />
                        </div>
                    )
                }
                {
                    hasSort && (
                        <div onClick={e => {
                            setOpen(true);
                            setOpenInit(false)
                        }} className='SubBar__left--sort'>
                            <img className='SubBar__icon' src={sortImage} />
                        </div>
                    )
                }
                {
                    !isSearching && (
                        <Link id={'SubBar__left--add'} to={urls?.addUrl} className='SubBar__left--add'>
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
        {openInit &&
            <div style={{position: "fixed", top: "95px", right:"10px", width: "80vw", height: "50px"}}>
                <SearchInput
                    PlaceHolderTEXT="اختر الدولة لإضافة بلدانها بشكل اتوماتيك"
                    selectFunc={ (item)=>{ setSelectedItem(item) } }
                    searchFunc={searchCountries}
                    data={countries.searchResults}
                    isSearch={countries.searching}
                    handleClose={() => setOpenInit(false)}
                    handleSave={() => {
                        setOpenInit(false)
                        InitPlaces({lan: 'ar_SA', localeId: 1, countryId: selectedItem?.id})
                    }}
                />
            </div>
        }
        </>
    )
}


const mapStateToProps = state => ({
    countries: state.countries
})

export default connect(mapStateToProps, {searchCountries, InitPlaces})(SubBar);