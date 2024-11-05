import { BASE_URL } from "../../utls/assets";
import { AUTHENTICATE_USER, END_AUTHENTICATION_USER, START_AUTHENTICATION_USER } from "./action.types";
import axios from 'axios';

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
            localeId: data.localeId,
            userAuthentication: {
                authType: 'email',
                authValue: data.email,
                authPassword: data.password
            }
        }
        const res = await axios.post(`${BASE_URL}endpoints/users/login-register?locale=${data.lan}`, userData);
        dispatch({
            type: AUTHENTICATE_USER,
            profile: res.data.output
        })
        dispatch(endAuthenticatingUser);
    } catch (e) {
        console.error(e.message);
    }
}