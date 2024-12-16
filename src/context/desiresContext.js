import React, { createContext, useState, useContext } from 'react';
import { searchDesire } from '../modals/manageDesires.js';

export const DesiresContext = createContext();

export const DesiresProvider = ({ children }) => {
    const [searchDesires, setSearchDesires] = useState([]);
    const [isSearchingDesires, setIsSearchingDesires] = useState(false);
    const [searchDesireTerm, setSearchDesiresTerm] = useState('');
    const [isJustSearching, setIsJustSearching] = useState(false);
    const [sortTypeDesire, setSortTypeDesire] = useState('ASCENDING');

    // Change Sort function in Navbar
    const changeSortDesires = (data) => {
        setSortTypeDesire(data?.sortType);
    };

    // Close and Open Search Desires
    const closeSearchDesires = () => {
        setIsSearchingDesires(false);
    };
    const openSearchDesires = () => {
        setIsSearchingDesires(true);
    };
    // Search Desires
    const SearchDesiresFun = async (BaseData) => {
        setIsJustSearching(true);
        const response = await searchDesire(BaseData);
        const NewData = response?.map((item) => item.productType);
        setIsJustSearching(false);
        setSearchDesires(NewData);
        setSearchDesiresTerm(BaseData?.name);
        console.log('Searching...', BaseData?.name, BaseData, NewData);
    };

    return (
        <DesiresContext.Provider value={{ SearchDesiresFun, searchDesires, 
                                        isSearchingDesires, isJustSearching, searchDesireTerm, 
                                        closeSearchDesires, openSearchDesires, 
                                        sortTypeDesire, changeSortDesires }}>
            {children}
        </DesiresContext.Provider>
    );
};

export const useDesiresContext = () => useContext(DesiresContext);