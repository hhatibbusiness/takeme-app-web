import axios from "axios";
import * as actionTypes from "./action.types";
import {addAlert} from "./alert.actions";
import {BaseURL} from "../../assets/constants/Base";

export const changeSortType = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.CHANGE_SORT_COUNTRIES, sortType: data.sortType });
        const fetchingData = {
            lan: 'ar',
            page: 0,
            sortType: data.sortType,
            searchKey: data.searchKey || ''
        };
        fetchCountries(dispatch, fetchingData);
        searchCountries(dispatch, fetchingData);
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
};

export const fetchCountries = (data) => async dispatch => {
    try {
        if (data.page == 0) dispatch({ type: actionTypes.START_FETCHING_COUNTRIES });
        const res = await axios.get(`${BaseURL}/countries/list?mLocale=${data.lan}&page=${data.page}&ascending=${true}`);
        dispatch({ type: actionTypes.FETCH_COUNTRIES, countries: res.data.output });
        dispatch({ type: actionTypes.END_FETCHING_COUNTRIES });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
};

export const addCountry = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.START_ADDING_COUNTRY });
        const res = await axios.post(`${BaseURL}/countries/add?mLocale=${data.lan}`, data, {
            headers: { 'accept': '*/*', 'Content-Type': 'application/json' }
        });
        dispatch({ type: actionTypes.ADD_COUNTRY, country: res.data });
        dispatch({ type: actionTypes.END_ADDING_COUNTRY });
        return res;
    } catch (e) {
        console.error(e);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
        dispatch({ type: actionTypes.END_ADDING_COUNTRY });
    }
};

export const editCountry = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.START_EDITING_COUNTRY });
        const res = await axios.put(`${BaseURL}/countries/update?mLocale=${data.lan}`, data, {
            headers: { 'accept': '*/*', 'Content-Type': 'application/json' }
        });
        dispatch({ type: actionTypes.EDIT_COUNTRY, country: res.data });
        dispatch({ type: actionTypes.END_EDITING_COUNTRY });
        return res;
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
        dispatch({ type: actionTypes.END_EDITING_COUNTRY });
    }
};

export const deleteCountry = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.START_DELETING_COUNTRY });
        await axios.delete(`${BaseURL}/countries/delete?Mlocale=${data.lan}&countryId=${data.countryId}`, {
            headers: { 'accept': '*/*', 'Content-Type': 'application/json' }
        });

        dispatch({
            type: actionTypes.DELETE_COUNTRY,
            countryId: data.countryId
        });
        dispatch({ type: actionTypes.END_DELETING_COUNTRY });
    } catch (e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
        dispatch({ type: actionTypes.END_DELETING_COUNTRY });
    }
};

export const searchCountries = (data) => async dispatch => {
    try {
        if (data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_COUNTRIES });
        const res = await axios.get(`${BaseURL}/countries/search?mLocale=${data.lan}&searchKey=${data.searchKey}&page=${data.page}`, {
            headers: { 'accept': '*/*', 'Content-Type': 'application/json' }
        });
        dispatch({
            type: actionTypes.SEARCH_COUNTRIES,
            searchResults: res.data.output,
            searchKey: data.searchKey,
            page: data.page
        });

        dispatch({ type: actionTypes.END_SEARCHING_COUNTRIES });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
};

export const openSearchCountries = () => {
    return { type: actionTypes.OPEN_SEARCH_COUNTRIES };
};

export const closeSearchCountries = () => {
    return { type: actionTypes.CLOSE_SEARCH_COUNTRIES };
};

export const fetchCountryById = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.START_FETCHING_COUNTRY_BY_ID });
        const res = await axios.get(`${BaseURL}/countries/get?mLocale=${data.lan}&countryId=${data.countryId}&localeId=1`);
        dispatch({ type: actionTypes.FETCH_COUNTRY_BY_ID, country: res.data.output });
        dispatch({ type: actionTypes.END_FETCHING_COUNTRY_BY_ID });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
};

export const searchForLocales = (data) => async dispatch => {
    try {
        if (data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_FOR_LOCALES });
        const res = await axios.get(`${BaseURL}/locales/search?mLocale=${data.lan}&searchKey=${data.searchKey}&page=${data.page}&sortType=NEWEST`);
        dispatch({ type: actionTypes.SEARCH_FOR_LOCALES, locales: res.data.output, page: data.page });
        dispatch({ type: actionTypes.END_SEARCHING_FOR_LOCALES });
    } catch (e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
};

export const changeSelectedLocale = (locale) => {
    return { type: actionTypes.CHANGE_SELECTED_LOCALE, locale };
};
