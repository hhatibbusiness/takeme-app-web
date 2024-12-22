import React, { createContext, useState, useContext } from 'react';
import { searchPlacesAPI } from '../screens/Places/model/managePlaces';

export const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
    const [searchPlaces, setSearchPlaces] = useState([]);
    const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);
    const [searchPlaceTerm, setSearchPlacesTerm] = useState('');
    const [isJustSearching, setIsJustSearching] = useState(false);
    const [sortTypePlace, setSortTypePlace] = useState('ASCENDING');

    // Change Sort function in Navbar
    const changeSortPlaces = (data) => {
        setSortTypePlace(data?.sortType);
    };

    // Close and Open Search Places
    const closeSearchPlaces = () => {
        setIsSearchingPlaces(false);
    };
    const openSearchPlaces = () => {
        setIsSearchingPlaces(true);
    };
    // Search Places
    const SearchPlacesFun = async (BaseData) => {
        setIsJustSearching(true);
        const response = await searchPlacesAPI(BaseData);
        const NewData = response?.output
        setIsJustSearching(false);
        setSearchPlaces(NewData);
        setSearchPlacesTerm(BaseData?.searchkey);
    };

    return (
        <PlacesContext.Provider value={{ SearchPlacesFun, searchPlaces, 
                                        isSearchingPlaces, isJustSearching, searchPlaceTerm, 
                                        closeSearchPlaces, openSearchPlaces, 
                                        sortTypePlace, changeSortPlaces }}>
            { children }
        </PlacesContext.Provider>
    );
};

export const usePlacesContext = () => useContext(PlacesContext);