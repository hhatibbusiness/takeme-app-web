import React, { useEffect, useRef, useState } from 'react';
import './SelectPopup.css';
import { useSelectContext } from '../../context/single.select.context';
import ItemsShimmer from '../ItemsShimmer/ItemsShimmer';
import ItemsList from '../ItemsList/ItemsList';
import useDebounce from '../../utilty/useDebounce';


const SelectPopup = ({
    itemsFun, //this is the function of the search or list.
    page, //the page of the pagination 0, 1, 2, 3, 4, ......
    more, // this determine if there are more items or not. true or false
    items, // the items of the select component.
    setSearchKey, // searchKey set function created when you call this compoent in your page.
    searchKey, // searchKey state created when you call this component in your page. (used in the itemsList for the highlighted text.)
    paginationData, // data for the itemsFun when the pagination triggered for the listItems component.
    searchData, //data for the search function triggered when the user change the imput function.
    displayName, // the name displayed in the listItems.
    isSearching, //that determine if the highlighttext decorated or not this is attached to the itemslist component and for this case will always will be true.
    searching, // when the search function is searching for new items. true or false
    dots, // used to show or hide dots for the item. true or false
    window, // relative for the itemslist component. true (if its page) or false(if its popup).
    selectedItem, //selected item if its single select
    itemClickFun, // if the select is single it change the selectedItem
    single, // determine if the select is single (true) or multi (false).
    checkClickHandler, // function triggered if the select is multiple and the check is clicked.
    multiSelectFun, // triggered if the select is multiple and the item is clicked.
    setOpen
}) => {
    const { closePopup } = useSelectContext();
    const debouncedSearchTerm = useDebounce(searchKey, 500);

    const searchInputChangeHandler = (e) => {
        setSearchKey(e.target.value);
    }
    
    const parentScroller = useRef();

    useEffect(() => {
        console.log(itemsFun);
        itemsFun(searchData);
    }, [debouncedSearchTerm]);

    const closePopFun = () => {
        setOpen(false);
        closePopup();
    }

    return (
        <div className='SelectPopup'>
            <div className='SelectPopup__container'>
                <div onClick={closePopFun} className='SelectPopup__close'>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div className='SelectPopup__search'>
                    <input onChange={searchInputChangeHandler} placeholder={'شو اسم اللغة البدك ياه'} />
                    <div className='SelectPopup__icon'>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
                <div ref={parentScroller} className='selectPopup__list'>
                    {
                        searching ? (
                            <ItemsShimmer dots={dots} />
                        ) : (
                                <ItemsList
                                    itemsFun={itemsFun}
                                    items={items}
                                    page={page}
                                    more={more}
                                    paginationData={paginationData}
                                    single={single}
                                    select={true}
                                    closePopup={closePopFun}
                                    parentScroller={parentScroller.current}
                                    multiSelectFun={multiSelectFun || null}
                                    displayName={displayName}
                                    isSearching={isSearching}
                                    window={window}
                                    selectedItem={selectedItem}
                                    itemClickFun={itemClickFun}
                                    dotsProps={(  ) => {}}
                                    searchKey={searchKey}
                                />
                        )
                    }
                </div>
                {
                    !single && (
                        <div onClick={checkClickHandler} className='SelectPopup__check'>
                            <i class="fa-solid fa-check"></i>
                        </div>
                    )
                }
            </div>
            <div onClick={closePopFun} className='SelectPopup__backdrop'></div>
        </div>
    )
}

export default SelectPopup;
