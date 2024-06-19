import axios from "axios";
import {
    END_LOGGING_USER_IN, LOAD_PROVIDER_DATA,
    LOAD_USER_DATA, LOG_PROVIDER_IN,
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
        console.log(data);
        let res;
        if(data) {
            res = await axios.post(`${BASE_URL}endpoints/signin/customer?locale=${lan}`, data);
        } else {
            res = await axios.post(`${BASE_URL}endpoints/signin/customer?locale=${lan}`, {

            });
        }
        if(res.status == 200 && res.data.status === true) {
            dispatch({
                type: LOGIN_USER_IN,
                data: res.data,
            });

            const equal = res.data.message.indexOf('=') + 1;
            const colne = res.data.message.indexOf(';');
            const token = res.data.message.slice(equal, colne);

            localStorage.removeItem('takemeUserToken');
            localStorage.removeItem('takemeUserData');
            localStorage.setItem('takemeUserToken', token);
            localStorage.setItem('takemeUserData', JSON.stringify(res.data.output));
            setAxiosHeaders(token);

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

export const loginProvider = (data, navigate, lan, history) => async dispatch => {
    try {
        dispatch(startLogin);
        dispatch({
            type: LOGIN_ERROR,
            message: ''
        });
        let res;
        if(data) {
            res = await axios.post(`${BASE_URL}endpoints/signin/provider?locale=${lan}&type=provider`, data);
        } else {
            res = await axios.post(`${BASE_URL}endpoints/signin/provider?locale=${lan}`, {

            });
        }
        if(res.status == 200 && res?.data?.status === true) {
            dispatch({
                type: LOG_PROVIDER_IN,
                data: res.data,
            });

            const equal = res.data.message.indexOf('=') + 1;
            const colne = res.data.message.indexOf(';');
            const token = res.data.message.slice(equal, colne);
            console.log(token);
            localStorage.removeItem('takemeProviderToken');
            localStorage.removeItem('takemeProviderData');
            localStorage.setItem('takemeProviderToken', token);
            localStorage.setItem('takemeProviderData', JSON.stringify(res.data.output));
            setAxiosHeaders(token);
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
    const takemeUserData = JSON.parse(localStorage.getItem('takemeUserData'));
    console.log(takemeUserData);
    const takemeUserToken = localStorage.getItem('takemeUserToken');
    if (!takemeUserData) {
        const data = {
            phoneOrEmail:"anonymous@gmail.com",
            password:"123456"
        };

        await dispatch(login(data, navigate, lan));
    }else {
        dispatch({
            type: LOAD_USER_DATA,
            takemeUserData,
            takemeUserToken
        });

    }
}

export const loadProvider = data => async dispatch => {
    const provider = JSON.parse(localStorage.getItem('takemeProviderData'));
    const providerToken = localStorage.getItem('takemeProviderToken');
    if(!provider) return;
    dispatch({
        type: LOAD_PROVIDER_DATA,
        provider,
        providerToken
    });
}

export const logout = (navigate, lan) => async dispatch => {
    localStorage.removeItem('takemeProviderToken');
    localStorage.removeItem('takemeProviderData');
    dispatch({
        type: LOG_USER_OUT
    });
}

export const startLogin =  {
    type: START_LOGGING_USER_IN
}

export const endLogin = {
    type: END_LOGGING_USER_IN
}
