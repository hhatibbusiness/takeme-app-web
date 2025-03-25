import {
    CHANGE_PERSONAL_SORTTYPE,
    DELETE_PERSONAL_PROFILE, END_DELETING_PERSONAL_PROFILE,
    END_FETCHING_PERSONAL_PROFILES, END_SEARCHING_PROFILES,
    FETCH_PERSONAL_PROFILES, SEARCH_PROFILES, START_CHANGING_SORTTYPE, START_DELETING_PERSONAL_PROFILE,
    START_FETCHING_PERSONAL_PROFILES, START_SEARCHING_PROFILES
} from "./action.types";
import {BASE_URL} from "../../utls/assets";
import FetchAPI from "../../utilty/FetchAPI";
import {BaseURL} from "../../assets/constants/Base";
import * as actionTypes from "./action.types";

export const fetchPersonalProfiles = data => async dispatch => {
    dispatch({type: START_FETCHING_PERSONAL_PROFILES});
    const url = `${BASE_URL}endpoints/users/preview/list?mLocale=${data.locale}&localeId=${data.localeId}&sortType=${data.sortType}&page=${data.page}`;
    const options = {
        method: 'GET',
    }

    const res = await FetchAPI(url, options, dispatch);

    if(res.status == true) {
        dispatch({
            type: FETCH_PERSONAL_PROFILES,
            profiles: res.output
        });

        dispatch({type: END_FETCHING_PERSONAL_PROFILES});

        return res;
    }

    dispatch({type: END_FETCHING_PERSONAL_PROFILES});
}

export const searchPersonalProfiles = data => async dispatch => {
    if(data.page == 0) dispatch({type: START_SEARCHING_PROFILES});
    const url = `${BaseURL}/users/search?mLocale=${data.locale}&searchText=${data.searchKey}&page=${data.page}&localeId=${data.localeId}&sortType=${data.sortType}`;
    const options = {
        method: 'GET'
    }

    const res = await FetchAPI(url, options, dispatch);

    if(res.status == true) {
        dispatch({
            type: SEARCH_PROFILES,
            searchResults: res.output,
            searchKey: data.searchKey,
            page: data.page
        });
    }

    dispatch({type: END_SEARCHING_PROFILES});
}

export const openSearchPersonalProfiles = () => {
    return { type: actionTypes.OPEN_SEARCH_PROFILES };
};

export const closeSearchPersonalProfiles = () => {
    return { type: actionTypes.CLOSE_SEARCH_PROFILES };
};

export const deletePersonalProfiles = data => async dispatch => {
    dispatch({type: START_DELETING_PERSONAL_PROFILE});
    const url = `${BASE_URL}endpoints/users/delete?mLocale=${data.locale}&userId=${data.userId}`;
    const options = {
        method: 'DELETE'
    }

    const res = await FetchAPI(url, options, dispatch);

    if(res.status == true) {
        dispatch({
            type: DELETE_PERSONAL_PROFILE,
            userId: data.userId
        });
    }
    dispatch({type: END_DELETING_PERSONAL_PROFILE});
}

export const changeSortType = data => async dispatch => {
    const fetchingData = {
        locale: 'ar_SA',
        page: 0,
        sortType: data.sortType,
        searchKey: data.searchKey || '',
        localeId: 1
    };

    dispatch({
        type: CHANGE_PERSONAL_SORTTYPE,
        sortType: data.sortType
    });

    dispatch(fetchPersonalProfiles(fetchingData));
    dispatch(searchPersonalProfiles(fetchingData));
}