import { BASE_URL } from "../../utls/assets";
import { AUTHENTICATE_USER, END_AUTHENTICATION_USER, END_FETCHING_USER_DATA, GET_USER_PROFILE, GET_USER_ROLE, LOG_PROFILE_OUT, START_AUTHENTICATION_USER, START_FETCHING_USER_DATA, START_LOGGING_USER_USING_GOOGLE } from "./action.types";
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

export const getUserRoles = (token) => ({
    type: GET_USER_ROLE,
    token
});

export const authenticateUser = data => async dispatch => {
    try {
        console.log('jfdlakjsflakjfs');
        dispatch(startAuthenticatingUser);
        const userData = {
            localeId: data.localeId,
            userAuthenticationRequestDto: {
                authType: data.authType,
                authValue: data.email,
                password: data.password,
                accessToken: data.accessToken
            }
        }

        console.log(userData);
        const res = await axios.post(`${BASE_URL}endpoints/users/login-register?mLocale=${data.locale}`, userData);

        if (res.status == 200) {
            const token = res.data.output.userToken.split('=')[1].split(';')[0];
            dispatch({
                type: AUTHENTICATE_USER,
                token,
                personalProfile: res.data.output.personalProfile
            });
            dispatch(getUserRoles(token));

            data.navigate(`/profile`);
        } else if (res.status == 202) {
            data.navigate(`/confirm/email/register/${data.email}/${data.password}`);
        }

        dispatch(endAuthenticatingUser);
        return res;
    } catch (e) {
        console.error(e.message);
        const data = {
            msg: e?.response?.data?.message || "حدث خطأ برجاء المحاولة مرة أخري",
            alertType: 'danger'
        };
        dispatch(addAlert(data));
        dispatch(endAuthenticatingUser);
        return e;
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

        dispatch(getUserRoles(token));

        if (token) {
            setToken(token);
            const res = await axios.get(`${BASE_URL}endpoints/users/personal/profile?mLocale=${data.locale}&localeId=${data.localeId}`);

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
    localStorage.clear();

    // Clean up axios headers
    import('../../utls/remove.axios.headers').then(module => {
        module.default();
    });

    dispatch({
        type: LOG_PROFILE_OUT
    });
}