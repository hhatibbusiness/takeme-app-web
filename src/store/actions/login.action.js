import axios from "axios";
import {
    END_LOGGING_USER_IN,
    LOAD_USER_DATA,
    LOG_USER_OUT,
    LOGIN_ERROR,
    LOGIN_USER_IN,
    START_LOGGING_USER_IN
} from "./action.types";
import setAxiosHeaders from "../../utls/set.axios.headers";
import { BASE_URL } from "../../utls/assets";
import {logEvent} from "firebase/analytics";
import {getAnalytics} from "firebase/analytics";

export const login = (data, navigate, lan, history) => async dispatch => {
    try {
        dispatch(startLogin);
        dispatch({
            type: LOGIN_ERROR,
            message: ''
        });
        let res;
        if(data) {
            res = await axios.post(`${BASE_URL}endpoints/signin/customer?locale=${lan}`, data);
            // res = await axios.post(`${BASE_URL}endpoints/signin/provider?locale=${lan}`, data);
        } else {
            // res = await axios.post(`${BASE_URL}endpoints/signin/provider?locale=${lan}`, {
            res = await axios.post(`${BASE_URL}endpoints/signin/customer?locale=${lan}`, {

            });
        }
        if(res.status == 200 && res.data.status === true) {
            dispatch({
                type: LOGIN_USER_IN,
                data: res.data,
            });

            // navigate('/');
            // console.log(history.state);
            if(history?.state?.previousLocation && history?.state?.previousLocation != 'register') {
                navigate(`${history?.state?.previousLocation}`, {state: {currentProduct: history?.state?.currentProduct}});
            } else {
                navigate('/');
            }
            const analytics = getAnalytics();
            logEvent(analytics, 'login_website', {UserId: res.data?.output?.id, Username: res.data?.output?.name, UserPhone: res.data?.output?.phone});
        } else{
            dispatch({
                type: LOGIN_ERROR,
                message: res.data.message
            });
        }
        dispatch(endLogin);
        return res;
    } catch (err) {
        console.error(err?.response?.data?.message);
        dispatch({
            type: LOGIN_ERROR,
            message: err?.response?.data?.message
        });
        dispatch(endLogin);
    }
}

export const loadUser = (navigate, lan) => async dispatch => {
    const provider = JSON.parse(localStorage.getItem('takemeproviderdata'));
    const providertoken = JSON.parse(localStorage.getItem('takemeprovidertoken'));
    if (!provider?.id && !providertoken) {
        // console.log('Not found!')
        const userData = JSON.parse(localStorage.getItem('takemeuser'));
        const token = localStorage.getItem('takemetoken');
        if (userData?.id && token) {
            // const otherToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi8wNTA5NjQ4NDQ1IiwiaWF0IjoxNjkwMTI4NDE1LCJyb2xlIjoiUk9MRV9BZG1pbiIsImV4cCI6MTY5MDIxNDgxNX0.kfFfiWafNFFww0zYotG4sd-7CEDkmxIugzoJMVJ2_tgZ-hEBswAxOZgf5bYjVjHxzAsk34sc_iQq8K2l2wELHg';
            const otherToken = localStorage.getItem('takemetoken')
            setAxiosHeaders(otherToken);
            dispatch({
                type: LOAD_USER_DATA,
                userData,
                token
            });
        } else {
            const data = {
                phoneOrEmail: 'ahmedgomaaofficial97@gmail.com',
                password: '123456'
            }
            await dispatch(login(data, navigate, lan));
        }
    }else {
        // console.log('Preparing!')
        setAxiosHeaders(providertoken);
        dispatch({
            type: LOAD_USER_DATA,
            userData: provider,
            token: providertoken
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
