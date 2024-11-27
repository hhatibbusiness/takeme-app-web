import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { BaseURL } from '../assets/constants/Base';

const actionTypes = {
    START_FETCHING_DETAILS: "START_FETCHING_DETAILS",
    END_FETCHING_DETAILS: "END_FETCHING_DETAILS",
    FETCH_DETAILS: "FETCH_DETAILS"
};

const detailsReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_DETAILS:
            return {
                ...state,
                fetchingDetails: true
            }
        case actionTypes.END_FETCHING_DETAILS:
            return {
                ...state,
                fetchingDetails: false
            }
        case actionTypes.FETCH_DETAILS:
            return {
                ...state,
                details: action.details
            }
        default:
            return state;
    }
}

const detailsContext = createContext();

const initialState = {
    details: {},
    fetchingDetails: false
};

const detailsActions = {
    fetchDetails: async (dispatch, data = null) => {
        try {
            dispatch({ type: actionTypes.START_FETCHING_DETAILS });

            const res = await axios.get(`${BaseURL}/details?locale=${data.lan}`);

            console.log(res);

            dispatch({ type: actionTypes.END_FETCHING_DETAILS });
        } catch (e) {
            console.error(e.message);
            
        }
    }
}


export const DetailsProvider = ({ children }) => {
    const [details, dispatch] = useReducer(detailsReducer, initialState);

    useEffect(() => {
        const data = {
            lan: 'ar'
        }
        detailsActions.fetchDetails(dispatch, data);
    }, [])


    return (
        <detailsContext.Provider value={details} >
            {children}
        </detailsContext.Provider>
    );
}

export const useDetailsContext = () => useContext(detailsContext);