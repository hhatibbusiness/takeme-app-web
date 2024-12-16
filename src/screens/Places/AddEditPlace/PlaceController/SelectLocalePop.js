import React, { useState, useRef } from 'react';
import SelectPopup from '../../../../components/SelectPopup/SelectPopup';
import { useSelectContext } from '../../../../context/single.select.context';
import { searchPlacesAPI } from '../../model/managePlaces';
import '../Place.style.css';

const MyComponent = ({ text }) => {
    const { select, openPopup } = useSelectContext();
    const [items, setItems] = useState([]);
    const Listitems = useRef([]);
    const [page, setPage] = useState(0);
    const [more, setMore] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);

    /// Search and List Functions if the user make and search text make SearchPlacesFun and if not make a list items.
    const ListPlacesFun = async (dataProps) => {
        if (searchText) {
            console.log("Searching Places");
            setSearching(true);
            setMore(false);
            const data = await searchPlacesAPI(dataProps);
            setItems(data);
            setSearching(false);
        } else {
            console.log("List Places");
            setMore(true);
            const data = await searchPlacesAPI(dataProps);
            Listitems.current = Listitems.current.concat(data);
            //console.log("List Items", Listitems.current);
            setItems(Listitems.current);
            setPage(prev=> prev+1);
        }
    };

    /// Item Click Function take the item Selected from the List.
    const itemClickFun = (item) => {
        console.log("Item Clicked", item)
    };

    const SingleProps = {
        itemsFun: ListPlacesFun,
        page: page,
        more: more,
        items: items,
        setSearchKey: setSearchText,
        searchKey: searchText,
        paginationData: {},
        searchData: {},
        displayName: 'name',
        isSearching: true, /// change
        searching: searching,  /// chnage

        dotsProps: id => ({}),  ///// Added in the Components and ItemsList.
        dots: false,
        window: false,
        selectedItems: [],
        itemClickFun,
        single: true,
    };

    return (
        <>
            <button className='singlePopup__button' onClick={openPopup}>{ text }</button>
            {select.open &&
                <SelectPopup {...SingleProps}  />
            }
        </>
    );
};

export default MyComponent;