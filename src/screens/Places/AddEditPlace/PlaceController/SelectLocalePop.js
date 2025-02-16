import React, { useState, useRef, useEffect } from 'react';
import SelectPopup from '../../../../components/SelectPopup/SelectPopup';
import '../Place.style.css';

const SinglePopupAPI = ({ placeHolderText, SearchFunctionAPI, ListFunctionAPI, displayName, onSelectItem, selectedItems={} }) => {
    const [items, setItems] = useState([]);
    const Listitems = useRef([]);
    const [page, setPage] = useState(0);
    const [more, setMore] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searching, setSearching] = useState(false);
    const [isOpen, setOpen] = useState(false);

    useEffect(()=> {
        setItems([]);
    }, [isOpen]);

    /// Search and List Functions if the user make and search text make SearchPlacesFun and if not make a list items.
    const ListSearchFun = async (dataProps) => {
        if (searchText) {
            setSearching(true);
            setMore(false);
            const res = await SearchFunctionAPI({ searchkey: searchText, page: 0 });
            if (res.status) {
                const data = res.output;
                setItems(data);
                setSearching(false);
            }
        } else {
            setMore(true);
            const data = await ListFunctionAPI({ page: page });
            if (data.status) {
                Listitems.current = Listitems.current.concat(data.output);
                setItems(Listitems.current);
                setPage(prev=> prev+1);
                setMore(data.output.length >= 10);
            }
        }
    };

    /// Item Click Function take the item Selected from the List.
    const itemClickFun = (item) => {
        onSelectItem(item);
    };

    const SingleProps = {
        itemsFun: ListSearchFun,
        page: page,
        more: more,
        items: items,
        setSearchKey: setSearchText,
        searchKey: searchText,
        paginationData: {},
        searchData: {},
        displayName: displayName,
        isSearching: searching,
        searching: searching,

        window: false,
        selectedItem: selectedItems,
        itemClickFun,
        single: true,
        setOpen: setOpen,
    };

    return (
        <>
            <button className='singlePopup__button' onClick={()=> setOpen(true)}>{ placeHolderText }</button>
            {isOpen &&
                <SelectPopup {...SingleProps}  />
            }
        </>
    );
};

export default SinglePopupAPI;