import { BASE_URL } from "../../utls/assets";
import { AUTHENTICATE_USER, END_AUTHENTICATION_USER, END_FETCHING_USER_DATA, GET_USER_PROFILE, LOG_PROFILE_OUT, START_AUTHENTICATION_USER, START_FETCHING_USER_DATA, START_LOGGING_USER_USING_GOOGLE } from "./action.types";
import axios from 'axios';
import { addAlert } from "./alert.actions";
import { useGoogleLogin } from "@react-oauth/google";
import setToken from '../../utls/set.axios.headers';

export const startAuthenticatingUser = {
    type: START_AUTHENTICATION_USER
}

export const endAuthenticatingUser = {
    type: END_AUTHENTICATION_USER
}

export const authenticateUser = data => async dispatch => {
    try {
        dispatch(startAuthenticatingUser);
        const userData = {
            authType: data.authType,
            authValue: data.email,
            authPassword: data.password
        }

        const res = await axios.post(`${BASE_URL}endpoints/users/login-register?locale=${data.locale}`, userData);
        if (res.status == 200) {
            dispatch({
                type: AUTHENTICATE_USER,
                token: res.data.output.authToken
            });
            data.navigate(`/profile`);
        } else if (res.status == 202) {
            data.navigate(`/confirm/email/${data.email}/${data.password}`);
        }

        dispatch(endAuthenticatingUser);
    } catch (e) {
        console.error(e.message);
        const data = {
            msg: e?.response?.data?.message || "حدث خطأ برجاء المحاولة مرة أخري",
            alertType: 'danger'
        };
        dispatch(addAlert(data));
        dispatch(endAuthenticatingUser);
    }
}

export const startFetchingUserData = {
    type: START_FETCHING_USER_DATA
}

export const endFetchingUserData = {
    type: END_FETCHING_USER_DATA
}

export const getUserProfile = data => async dispatch => {
    try {
        dispatch(startFetchingUserData);
        const token = localStorage.getItem('TAKEME_TOKEN');
        if (token) {
            setToken(token);
            const res = await axios.get(`${BASE_URL}endpoints/users/get-profile?Mlocale=${data.locale}`);
            
            if (res.status == 200 && res.data.status) {
                dispatch({
                    type: GET_USER_PROFILE,
                    profile: res.data.output
                });
            } else if (res.status == 200 && !res.data.status) {
                const data = {
                    msg: res.data.message || "حدث خطأ برجاء المحاولة مرة أخري",
                    alertType: 'danger'
                };
                dispatch(addAlert(data));
            }
        } else {
            return;
        }
        dispatch(endFetchingUserData);
    } catch (e) {
        if (e.response?.status == 401) {
            dispatch({
                type: LOG_PROFILE_OUT
            });
        }

        const data = {
            msg: e?.response?.data?.message || "حدث خطأ برجاء المحاولة مرة أخري",
            alertType: 'danger'
        };
        dispatch(addAlert(data));
        dispatch(endFetchingUserData);
    }
}

export const logUserOut = () => dispatch => {
    dispatch({
        type: LOG_PROFILE_OUT
    });
}