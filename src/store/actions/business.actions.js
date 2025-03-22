import * as actionTypes from "./action.types";
import FetchAPI from '../../utilty/FetchAPI';
import { BaseURL } from "../../assets/constants/Base";


export const changeSortTypeBusiness = (data) => async dispatch => {
    dispatch({ type: actionTypes.CHANGE_SORT_BUSINESS_PROFILES, sortType: data.sortType });
    const fetchingData = {
        lan: data.mLocale || 'ar_SA',
        page: 0,
        sortType: data.sortType,
        searchKey: data.searchKey || ''
    };
    dispatch(fetchBusiness(fetchingData));
    dispatch(searchBusiness(fetchingData));
};

export const fetchBusiness = (data) => async dispatch => {
    if (data.page === 0) dispatch({ type: actionTypes.START_FETCHING_BUSINESS_PROFILES });
    const res = await FetchAPI(`${BaseURL}/business/plans/list?mLocale=${data.lan}&page=${data.page}&sortType=${data.sortType}`, {}, dispatch);
    if (res) dispatch({ type: actionTypes.FETCH_BUSINESS_PROFILES, profiles: res.output });
    dispatch({ type: actionTypes.END_FETCHING_BUSINESS_PROFILES });
};

export const addBusiness = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_ADDING_BUSINESS_PROFILE });
    const res = await FetchAPI(`${BaseURL}/business/profiles/add?mLocale=${data.mLocale}`, {
        method: 'POST',
        body: data
    }, dispatch);
    if (res) dispatch({ type: actionTypes.ADD_BUSINESS_PROFILE, profile: res.output });
    dispatch({ type: actionTypes.END_ADDING_BUSINESS_PROFILE });
    return res;
};

export const editBusiness = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_EDITING_BUSINESS_PROFILE });
    const res = await FetchAPI(`${BaseURL}/business/profiles/update?mLocale=${data.mLocale}`, {
        method: 'PUT',
        body: data
    }, dispatch);
    if (res) dispatch({ type: actionTypes.EDIT_BUSINESS_PROFILE, profile: res.output });
    dispatch({ type: actionTypes.END_EDITING_BUSINESS_PROFILE });
    return res;
};

export const deleteBusiness = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_DELETING_BUSINESS_PROFILE });
    const res = await FetchAPI(`${BaseURL}/business/profiles/delete?mLocale=${data.mLocale}&businessId=${data.businessId}`, {
        method: 'DELETE'
    }, dispatch);
    if (res) {
        dispatch({
            type: actionTypes.DELETE_BUSINESS_PROFILE,
            businessId: data.businessId
        });
    }
    dispatch({ type: actionTypes.END_DELETING_BUSINESS_PROFILE });
};

export const searchBusiness = (data) => async dispatch => {
    if (data.page === 0) dispatch({ type: actionTypes.START_SEARCHING_BUSINESS_PROFILES });
    const res = await FetchAPI(`${BaseURL}/business/plans/list?mLocale=${data.lan}&page=${data.page}&sortType=${data.sortType || 'NEWEST'}`, {
        method: 'GET'
    }, dispatch);
    if (res) {
        dispatch({
            type: actionTypes.SEARCH_BUSINESS_PROFILES,
            searchResults: res.output,
            searchKey: data.searchKey,
            page: data.page
        });
    }
    dispatch({ type: actionTypes.END_SEARCHING_BUSINESS_PROFILES });
};

export const openSearchBusiness = () => {
    return { type: actionTypes.OPEN_SEARCH_BUSINESS_PROFILES };
};

export const closeSearchBusiness = () => {
    return { type: actionTypes.CLOSE_SEARCH_BUSINESS_PROFILES };
};
