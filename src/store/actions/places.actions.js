import FetchAPI from "../../utilty/FetchAPI";
import * as actionTypes from "./action.types";
import {BaseURL} from "../../assets/constants/Base";

export const changeSortType = (data) => async dispatch => {
    dispatch({ type: actionTypes.CHANGE_SORT_PLACES, sortType: data.sortType });
    const fetchingData = {
        lan: 'ar',
        page: 0,
        sortType: data.sortType,
        searchKey: data.searchKey || ''
    };
    fetchPlaces(dispatch, fetchingData);
    searchPlaces(dispatch, fetchingData);
};

export const fetchPlaces = (data) => async dispatch => {
    if (data.page == 0) dispatch({ type: actionTypes.START_FETCHING_PLACES });
    const res = await FetchAPI(`${BaseURL}/places/list?mLocale=${data.lan}&page=${data.page}&ascending=${true}`, {}, dispatch );
    if (res) dispatch({ type: actionTypes.FETCH_PLACES, places: res.output });
    dispatch({ type: actionTypes.END_FETCHING_PLACES });
};

export const addPlace = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_ADDING_PLACE });
    const res = await FetchAPI(`${BaseURL}/places/add?mLocale=${data.lan}`, {method: 'POST', body: data}, dispatch);
    if (res) dispatch({ type: actionTypes.ADD_PLACE, place: res.output })
    dispatch({ type: actionTypes.END_ADDING_PLACE });
    return res;
};

export const editPlace = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_EDITING_PLACE });
    const res = await FetchAPI(`${BaseURL}/places/update?mLocale=${data.lan}`, {method: 'PUT', body: data}, dispatch);
    if (res) dispatch({ type: actionTypes.EDIT_PLACE, place: data });
    dispatch({ type: actionTypes.END_EDITING_PLACE });
    return res;
};

export const deletePlace = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_DELETING_PLACE });
    const res = await FetchAPI(`${BaseURL}/places/delete?mlocale=${data.lan}&placeId=${data.placeId}`, {
        method: 'DELETE',
        headers: { 'accept': '*/*', 'Content-Type': 'application/json' },
    }, dispatch);

    if (res) {
        dispatch({
            type: actionTypes.DELETE_PLACE,
            placeId: data.placeId
        });
    }
    dispatch({ type: actionTypes.END_DELETING_PLACE });
};

export const searchPlaces = (data) => async dispatch => {
    if (data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_PLACES });
    const res = await FetchAPI(`${BaseURL}/places/search?mLocale=${data.lan}&searchKey=${data.searchKey}&page=${data.page}`, {
        headers: { 'accept': '*/*', 'Content-Type': 'application/json' }
    }, dispatch);
    if (res) {
        dispatch({
            type: actionTypes.SEARCH_PLACES,
            searchResults: res.output,
            searchKey: data.searchKey,
            page: data.page
        });
    }
    dispatch({ type: actionTypes.END_SEARCHING_PLACES });
};

export const openSearchPlaces = () => {
    return { type: actionTypes.OPEN_SEARCH_PLACES };
};

export const closeSearchPlaces = () => {
    return { type: actionTypes.CLOSE_SEARCH_PLACES };
};
