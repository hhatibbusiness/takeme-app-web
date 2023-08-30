import axios from "axios";
import {
    END_LOGGING_USER_IN, LOAD_USER_DATA, LOG_USER_OUT, LOGIN_ERROR,
    LOGIN_USER_IN,
    START_LOGGING_USER_IN
} from "./action.types";
import setAxiosHeaders from "../../utls/set.axios.headers";
import { BASE_URL } from "../../utls/assets";

export const login = (data, navigate, lan) => async dispatch => {
    try {
        dispatch(startLogin);
        dispatch({
            type: LOGIN_ERROR,
            message: ''
        })
        const res = await axios.post(`${BASE_URL}endpoints/signin/customer?locale=${lan}`, data);
        if(res.status == 200 &&res.data.status === true) {
            dispatch({
                type: LOGIN_USER_IN,
                data: res.data,
            });
            navigate('/');
        } else {
            dispatch({
                type: LOGIN_ERROR,
                message: res.data.message
            });
        }
        dispatch(endLogin);
    } catch (err) {
        console.error(err.response.data.message);
        dispatch({
            type: LOGIN_ERROR,
            message: err.message
        });
        dispatch(endLogin);
    }
}

export const loadUser = () => async dispatch => {
    const userData = JSON.parse(localStorage.getItem('takemeuser'));
    const token = localStorage.getItem('takemetoken');
    console.log(userData);
    if (userData?.id && token) {
        // const otherToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi8wNTA5NjQ4NDQ1IiwiaWF0IjoxNjkwMTI4NDE1LCJyb2xlIjoiUk9MRV9BZG1pbiIsImV4cCI6MTY5MDIxNDgxNX0.kfFfiWafNFFww0zYotG4sd-7CEDkmxIugzoJMVJ2_tgZ-hEBswAxOZgf5bYjVjHxzAsk34sc_iQq8K2l2wELHg';
        const otherToken = localStorage.getItem('takemetoken')
        setAxiosHeaders(otherToken);
        dispatch({
            type: LOAD_USER_DATA,
            userData,
            token
        });
    }
}

export const logout = () => {
    localStorage.removeItem('takemeuser');
    localStorage.removeItem('takemetoken');
    return {
        type: LOG_USER_OUT
    }
}

export const startLogin = {
    type: START_LOGGING_USER_IN
}

export const endLogin = {
    type: END_LOGGING_USER_IN
}