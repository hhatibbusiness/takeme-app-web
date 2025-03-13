import axios from "axios";
import {BASE_URL} from "../../utls/assets";
import {
    ADD_ROLE,
    CHANGE_SORT_ROLES, DELETE_ROLE, END_ADDING_ROLE, END_DELETING_ROLE,
    END_FETCHING_ROLES, END_UPDATING_ROLE,
    FETCH_ROLES, START_ADDING_ROLE, START_DELETING_ROLE,
    START_FETCHING_ROLES,
    START_SEARCHING_FOR_ROLE, START_UPDATING_ROLE, UPDATE_ROLE
} from "./action.types";

export const fetchRoles = data => async dispatch => {
    try {
        if(data.page == 0) dispatch({type: START_FETCHING_ROLES});
        const res = await axios.get(`${BASE_URL}endpoints/roles/list?mLocale=${data.locale}&sortType=${data.sortType}&page=${data.page}`);
        console.log(res);
        dispatch({type: FETCH_ROLES, roles: res.data.output});
        dispatch({type: END_FETCHING_ROLES});
    } catch(e) {
        console.error(e.message);
    }
}

export const searchForRole = data => async dispatch => {
    try {
        if(data.page == 0) dispatch({type: START_SEARCHING_FOR_ROLE});
        const res = await axios.get()
    } catch (e) {
        console.log(e.message);
    }
}

export const changeRolesSortType = data => async dispatch => {
    try {
        dispatch({type: CHANGE_SORT_ROLES, sortType: data.sortType});
        const fetchingData = {
            locale: 'ar_SA',
            page: 0,
            sortType: data.sortType,
            searchKey: data.searchKey || ''
        }

        dispatch(fetchRoles(fetchingData));
    } catch (e) {
        console.error(e.message);
    }
}

export const deleteRole = data => async dispatch => {
    try {
        dispatch({type: START_DELETING_ROLE});
        const res = await axios.delete(`${BASE_URL}endpoints/roles/delete?mLocale=${data.locale}&roleId=${data.roleId}`);

        if(res.status === 200) {
            dispatch({type: DELETE_ROLE, roleId: data.roleId});
        }

        dispatch({type: END_DELETING_ROLE});
    } catch (e) {
        console.error(e.message);
    }
}

export const addRole = data => async dispatch => {
    try {
        dispatch({type: START_ADDING_ROLE});
        const res = await axios.post(`${BASE_URL}endpoints/roles/add?mLocale=${data.locale}`, data);
        console.log(res)
        dispatch({type: ADD_ROLE, role: res.data.output});
        dispatch({type: END_ADDING_ROLE});
        return res;
    } catch (e) {
        console.error(e.message);
    }
}

export const updateRole = data => async dispatch => {
    try {
        dispatch({type: START_UPDATING_ROLE});
        const res = await axios.put(`${BASE_URL}endpoints/roles/update?mLocale=${data.locale}`, data);
        dispatch({type: UPDATE_ROLE, role: res.data.output});
        dispatch({type: END_UPDATING_ROLE});
        return res;
    } catch (e) {
        console.error(e.message);
    }
}