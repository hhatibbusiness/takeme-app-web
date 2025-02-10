import axios from "axios";
import {BASE_URL} from "../../utls/assets";
import * as actionTypes from "../actions/action.types";
import {addAlert} from "./alert.actions";

export const changeSortType = (data) => async dispatch => {
    try{
        dispatch({ type: actionTypes.CHANGE_SORT, sortType: data.sortType });
        console.log('this is working!')
        const fetchingData = {
            lan: 'ar',
            page: 0,
            sortType: data.sortType,
            searchKey: data.searchKey || ''
        };
        dispatch(fetchLanguages(fetchingData));
        dispatch(searchLanguages(fetchingData));
    } catch (e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
}

export const fetchLanguages = data => async dispatch => {
    try{
        // if(data.page == 0) dispatch({ type: actionTypes.START_FETCHING_LANGUAGES });
        const res = await axios.get(`${BASE_URL}endpoints/languages/list?mLocale=${data.lan}&sortType=${data.sortType}&page=${data.page}`);
        dispatch({type: actionTypes.FETCH_LANGUAGES, languages: res.data.output})
        dispatch({ type: actionTypes.END_FETCHING_LANGUAGES });
    } catch(e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
}

export const addLanguage = data => async dispatch => {
    try{
        dispatch({ type: actionTypes.START_ADDING_LANGUAGE });
        const res = await axios.post(`${BASE_URL}endpoints/languages/add?mLocale=${data.lan}`, data, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });
        dispatch({type: actionTypes.ADD_LANGUAGE, language: res.data.output})
        dispatch({ type: actionTypes.END_ADDING_LANGUAGE });
        return res;
    } catch(e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
        dispatch({ type: actionTypes.END_ADDING_LANGUAGE });
    }
}

export const editLanguage = data => async dispatch => {
    try{
        dispatch({ type: actionTypes.START_EDITING_LANGUAGE });
        const editData = {
            id: data.id,
            name: data.name,
            englishName: data.englishName,
            code: data.code,
            comments: data.comments
        };
        const res = await axios.put(`${BASE_URL}endpoints/languages/update?mLocale=${data.lan}`, editData, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });
        dispatch({ type: actionTypes.EDIT_LANGUAGE, language: res.data.output });
        dispatch({ type: actionTypes.END_EDITING_LANGUAGE });

        return res;
    } catch(e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
        dispatch({ type: actionTypes.END_EDITING_LANGUAGE });
    }
}

export const deleteLanguage = data => async dispatch => {
    try{
        dispatch({ type: actionTypes.START_DELETING_LANGUAGE });
        const res = await axios.delete(`${BASE_URL}endpoints/languages/delete?Mlocale=${data.lan}&languageId=${data.languageId}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });

        dispatch({type: actionTypes.DELETE_LANGUAGE, languageId: data.languageId})
        dispatch({ type: actionTypes.END_DELETING_LANGUAGE });
    } catch(e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
        dispatch({ type: actionTypes.END_DELETING_LANGUAGE });
    }
}

export const searchLanguages = data => async dispatch => {
    try{
        console.log(data);
        if(data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_LANGUAGES });
        const res = await axios.get(`${BASE_URL}endpoints/languages/search?mLocale=${data.lan}&searchKey=${data.searchKey}&sortType=${data.sortType}&page=${data.page}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });
        dispatch({ type: actionTypes.SEARCH_LANGUAGES, searchResults: res.data.output, searchKey: data.searchKey, page: data.page });

        dispatch({ type: actionTypes.END_SEARCHING_LANGUAGES });
    } catch (e) {
        const alertData = {
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        };

        addAlert(alertData);
    }
}

export const openSearch = () => {
    return {type: actionTypes.OPEN_SEARCH}
}

export const closeSearch = () => {
    return {type: actionTypes.CLOSE_SEARCH}
}