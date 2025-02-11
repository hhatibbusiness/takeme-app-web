import axios from "axios";
import * as actionTypes from "./action.types";
import {addAlert} from "./alert.actions";
import {BaseURL} from "../../assets/constants/Base";

export const changeSortType = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.CHANGE_SORT_PLACES, sortType: data.sortType });
        const fetchingData = {
            lan: 'ar',
            page: 0,
            sortType: data.sortType,
            searchKey: data.searchKey || ''
        };
        fetchPlaces(dispatch, fetchingData);
        searchPlaces(dispatch, fetchingData);
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
};

export const fetchPlaces = (data) => async dispatch => {
    try {
        if (data.page == 0) dispatch({ type: actionTypes.START_FETCHING_PLACES });
        const res = await axios.get(`${BaseURL}/places/list?mLocale=${data.lan}&page=${data.page}&ascending=${true}`);
        dispatch({ type: actionTypes.FETCH_PLACES, places: res.data.output });
        dispatch({ type: actionTypes.END_FETCHING_PLACES });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };
        addAlert(alertData);
    }
};

export const addPlace = (data) => async dispatch => {
    console.log("ADD PLACE...", data);
    dispatch({ type: actionTypes.ADD_PLACE, place: data });
};

export const editPlace = (data) => async dispatch => {
    dispatch({ type: actionTypes.EDIT_PLACE, place: data });
};

export const deletePlace = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.START_DELETING_PLACE });
        await axios.delete(`${BaseURL}/places/delete?mlocale=${data.lan}&placeId=${data.placeId}`, {
            headers: { 'accept': '*/*', 'Content-Type': 'application/json' }
        });

        dispatch({
            type: actionTypes.DELETE_PLACE,
            placeId: data.placeId
        });
        dispatch({ type: actionTypes.END_DELETING_PLACE });
    } catch (e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
        dispatch({ type: actionTypes.END_DELETING_COUNTRY });
    }
};

export const searchPlaces = (data) => async dispatch => {
    try {
        if (data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_PLACES });
        const res = await axios.get(`${BaseURL}/places/search?mLocale=${data.lan}&searchKey=${data.searchKey}&page=${data.page}`, {
            headers: { 'accept': '*/*', 'Content-Type': 'application/json' }
        });
        dispatch({
            type: actionTypes.SEARCH_PLACES,
            searchResults: res.data.output,
            searchKey: data.searchKey,
            page: data.page
        });

        dispatch({ type: actionTypes.END_SEARCHING_PLACES });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
};

export const openSearchPlaces = () => {
    return { type: actionTypes.OPEN_SEARCH_PLACES };
};

export const closeSearchPlaces = () => {
    return { type: actionTypes.CLOSE_SEARCH_PLACES };
};
