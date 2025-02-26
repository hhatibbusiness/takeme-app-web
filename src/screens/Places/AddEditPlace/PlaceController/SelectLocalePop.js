import React, { useState, useEffect } from 'react';
import SelectPopup from '../../../../components/SelectPopup/SelectPopup';
import '../Place.style.css';
import PopupInput from '../../../../components/PopupInput/PopupInput'

const SinglePopupAPI = ({ placeHolderText, SearchFunctionAPI, displayName, onSelectItem, selectedItems={} }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [more, setMore] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isSearching, setSearching] = useState(false);
    const [isOpen, setOpen] = useState(false);

    
    useEffect(() => {
        setItems([]);
        setPage(0);
        setSearchText('')
    }, [isOpen]);

    const fetchItems = async (dataProps) => {
        if (page === 0) setSearching(true);
        try {
            const res = await SearchFunctionAPI({ 
                searchkey: searchText, 
                page: page 
            });
            
            if (res.status) {
                const data = res.output;
                if (page === 0) {
                    setItems(data);
                } else {
                    setItems(prevItems => [...prevItems, ...data]);
                }
                setMore(data.length >= 10);
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            setMore(false);
        }
        setSearching(false);
    };

    /// Item Click Function take the item Selected from the List.
    const itemClickFun = (item) => {
        onSelectItem(item);
    };

    const handleSearchChange = (value) => {
        setSearching(true)
        setSearchText(value);
        setItems([]);
        setPage(0);
    };

    const SingleProps = {
        itemsFun: fetchItems,
        page: page,
        more: more,
        items: items,
        setSearchKey: handleSearchChange,
        searchKey: searchText,
        displayName: displayName,
        isSearching: true,
        searching: isSearching,
        window: false,
        selectedItem: selectedItems,
        itemClickFun: onSelectItem,
        single: true,
        setOpen: setOpen,
    };

    return (
        <>
            <PopupInput setOpen={()=> setOpen(true)} placeholder={placeHolderText} selectedItem={selectedItems} displayName={displayName}/>
            {isOpen &&
                <SelectPopup {...SingleProps}  />
            }
        </>
    );
};

export default SinglePopupAPI;
