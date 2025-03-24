import axios from "axios";
import {BASE_URL} from "../../utls/assets";
import {
    ADD_ROLE,
    CHANGE_SORT_ROLES, DELETE_ROLE, END_ADDING_ROLE, END_CHANGING_PASSWORD, END_DELETING_ROLE,
    END_FETCHING_ROLES, END_UPDATING_ROLE,
    FETCH_ROLES, START_ADDING_ROLE, START_DELETING_ROLE,
    START_FETCHING_ROLES,
    START_SEARCHING_FOR_ROLE, START_UPDATING_ROLE, UPDATE_ROLE
} from "./action.types";
import {addAlert} from "./alert.actions";
import FetchAPI from "../../utilty/FetchAPI";

export const fetchRoles = data => async dispatch => {
    // try {
    //     if(data.page == 0) dispatch({type: START_FETCHING_ROLES});
    //     const res = await axios.get(`${BASE_URL}endpoints/roles/list?mLocale=${data.locale}&sortType=${data.sortType}&page=${data.page}`);
    //     console.log(res);
    //     dispatch({type: FETCH_ROLES, roles: res.data.output});
    //     dispatch({type: END_FETCHING_ROLES});
    // } catch(e) {
    //     console.error(e.message);
    //     dispatch(addAlert({
    //         alertType: 'danger',
    //         msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
    //     }))
    //     dispatch({type: END_FETCHING_ROLES});
    //
    // }

    if(data.page == 0) dispatch({type: START_FETCHING_ROLES});

    const url = `${BASE_URL}endpoints/roles/list?mLocale=${data.locale}&sortType=${data.sortType}&page=${data.page}`;
    const options = {
        method: "GET",
    }
    const res = await FetchAPI(url, options, dispatch);

    console.log(res);

    if(res.status == true) {
        dispatch({type: FETCH_ROLES, roles: res.output});
    }
    dispatch({type: END_FETCHING_ROLES});

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
        dispatch(addAlert({
            alertType: 'danger',
            msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
        }))


    }
}

export const deleteRole = data => async dispatch => {
    dispatch({type: START_DELETING_ROLE});
    const url = `${BASE_URL}endpoints/roles/delete?mLocale=${data.locale}&roleId=${data.roleId}`;
    const options = {
        method: "DELETE",
    }

    const res  = await FetchAPI(url, options, dispatch);

    console.log(res);

    if(res.status == true) {
        dispatch({type: DELETE_ROLE, roleId: data.roleId});
    }
    dispatch({type: END_DELETING_ROLE});
}

export const addRole = data => async dispatch => {
    dispatch({type: START_ADDING_ROLE});
    const url = `${BASE_URL}endpoints/roles/add?mLocale=${data.locale}`;
    const options = {
        method: "POST",
        body: data
    }
    const res = await FetchAPI(url, options, dispatch);

    if(res.status == true) {
        dispatch({type: ADD_ROLE, role: res.output});
        res.status = 200;
        return res;
    }

    dispatch({type: END_ADDING_ROLE});

}

export const updateRole = data => async dispatch => {
    dispatch({type: START_UPDATING_ROLE});
    const url = `${BASE_URL}endpoints/roles/update?mLocale=${data.locale}`;
    const options = {
        method: "PUT",
        body: data
    }

    const res = await FetchAPI(url, options, dispatch);
    if(res?.status == true) {
        dispatch({type: UPDATE_ROLE, role: res.output});
        res.status = 200;
        return res;
    }
    dispatch({type: END_UPDATING_ROLE});
}