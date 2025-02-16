import axios from 'axios';
import { BaseURL } from "../../assets/constants/Base";
import * as actionTypes from '../actions/action.types'
import { addAlert } from './alert.actions';


export const fetchLocales = (data) => async dispatch => {
    try {
        if(data.page == 0) dispatch({ type: actionTypes.START_FETCHING_LOCALES });
        const res = await axios.get(`${BaseURL}/locales/list?mLocale=${data.lan}&sortType=${data.sortType}&page=${data.page}`);
        dispatch({type: actionTypes.FETCH_LOCALES, locales: res.data.output})
        dispatch({ type: actionTypes.END_FETCHING_LOCALES });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
    }
};

export const addLocale = (data) => async dispatch => {
    try {
        const postData = {
            name: data.name,
            englishName: data.englishName,
            languageId: data.languageId,
            locale: data.locale,
            code: data.code,
            comments: data.comments
        };
        dispatch({ type: actionTypes.START_ADDING_LOCALE });
        const res = await axios.post(`${BaseURL}/locales/add?mLocale=${data.lan}`, postData, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });
        dispatch({type: actionTypes.ADD_LOCALE, locale: res.data.output});
        dispatch({ type: actionTypes.END_ADDING_LOCALE });
        return res;
    } catch (e) {
        console.error(e);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
        dispatch({ type: actionTypes.END_ADDING_LOCALE });
    }
};

export const editLocale = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.START_EDITING_LOCALE });
        const res = await axios.put(`${BaseURL}/locales/update?mLocale=${data.lan}`, data, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });
        dispatch({ type: actionTypes.EDIT_LOCALE, locale: res.data.output });
        dispatch({ type: actionTypes.END_EDITING_LOCALE });
        return res;
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
        dispatch({ type: actionTypes.END_EDITING_LOCALE });
    }
};

export const deleteLocale = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.START_DELETING_LOCALE });
        const res = await axios.delete(`${BaseURL}/locales/delete?Mlocale=${data.lan}&localeId=${data.localeId}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json' } });

        dispatch({type: actionTypes.DELETE_LOCALE, localeId: data.localeId});
        dispatch({ type: actionTypes.END_DELETING_LOCALE });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
        dispatch({ type: actionTypes.END_DELETING_LOCALE });
    }
};

export const changeLocalesSort = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.CHANGE_SORT_LOCALES, sortType: data.sortType });
        const fetchingData = {
            lan: 'ar_SA',
            page: 0,
            sortType: data.sortType,
            searchKey: data.searchKey || ''
        };
        await dispatch(fetchLocales(fetchingData));
        await dispatch(searchLocales(fetchingData));
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
    }
};

export const searchLocales = (data) => async dispatch => {
    try {
        if(data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_LOCALES });
        const res = await axios.get(`${BaseURL}/locales/search?mLocale=${data.lan}&searchKey=${data.searchKey}&sortType=${data.sortType}&page=${data.page}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json' } });
        dispatch({ type: actionTypes.SEARCH_LOCALES, searchResults: res.data.output, searchKey: data.searchKey, page: data.page });
        dispatch({ type: actionTypes.END_SEARCHING_LOCALES });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
    }
};

export const openLocalesSearch = () => async dispatch => {
    dispatch({type: actionTypes.OPEN_SEARCH});
};

export const closeLocalesSearch = () => async dispatch => {
    dispatch({type: actionTypes.CLOSE_SEARCH});
};

export const fetchLocaleById = (data) => async dispatch => {
    try {
        dispatch({ type: actionTypes.START_FETCHING_LOCALE_BY_ID });
        const res = await axios.get(`${BaseURL}/locales/get?mLocale=${data.lan}&localeId=${data.localeId}`);
        dispatch({ type: actionTypes.FETCH_LOCALE_BY_ID, locale: res.data.output });
        dispatch({type: actionTypes.CHANGE_SELECTED_LANGUAGE, language: res.data.output.languageEntity});
        dispatch({ type: actionTypes.END_FETCHING_LOCALE_BY_ID });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
    }
};

export const fetchLanguages = (data) => async dispatch => {
    try {
        if (data.page == 0) dispatch({ type: actionTypes.START_FETCHING_LANGUAGES });
        const res = await axios.get(`${BaseURL}/languages/list?mLocale=${data.lan}&sortType=${data.sortType}&page=${data.page}`);
        dispatch({ type: actionTypes.FETCH_LANGAUGES, languages: res.data.output });
        dispatch({ type: actionTypes.END_FETCHING_LANGUAGES });
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
    }
};

export const searchLanguagesLocales = (data) => async dispatch => {
    try {
        if (data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_LANGUAGES_LOCALES });
        const res = await axios.get(`${BaseURL}/languages/search?mLocale=${data.lan}&searchKey=${data.searchKey}&sortType=${data.sortType}&page=${data.page}`);
        console.log("FROM SEARCH RESULTS", res.data.output, data)
        dispatch({ type: actionTypes.SEARCH_LANGUAGES_LOCALES, languages: res.data.output, searchKey: data.searchKey, page: data.page });
        dispatch({ type: actionTypes.END_SEARCHING_LANGUAGES_LOCALES });
        return res;
    } catch (e) {
        console.error(e.message);
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        dispatch(addAlert(alertData));
    }
};

export const changeSelectedLanguage = (language) => async dispatch => {
    dispatch({type: actionTypes.CHANGE_SELECTED_LANGUAGE, language});
};
