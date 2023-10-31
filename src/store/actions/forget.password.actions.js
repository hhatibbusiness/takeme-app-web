import {
    END_CHANGING_PASSWORD,
    END_SENDING_CODE_PASSWORD_TO_EMAIL, END_SENDING_CODE_PASSWORD_TO_SERVER,
    END_SENDING_FORGET_PASSWORD_VERIFICATION_CODE,
    LOGIN_ERROR, SEND_CODE_PASSWORD_TO_SERVER,
    SEND_FORGET_PASSWORD_VERIFICATION_CODE, START_CHANGING_PASSWORD,
    START_SENDING_CODE_PASSWORD_TO_EMAIL, START_SENDING_CODE_PASSWORD_TO_SERVER,
    START_SENDING_FORGET_PASSWORD_VERIFICATION_CODE
} from "./action.types";
import axios from "axios";
import {BASE_URL} from "../../utls/assets";

export const startSendingForgetPasswordVerificationCode = {
    type: START_SENDING_FORGET_PASSWORD_VERIFICATION_CODE
}

export const endSendingForgetPasswordVerificationCode = {
    type: END_SENDING_FORGET_PASSWORD_VERIFICATION_CODE
}

export const sendForgetPasswordVerificationCode = data => async dispatch => {
    try {
        dispatch(startSendingForgetPasswordVerificationCode);
        const formData = {
            email: data.email
        }
        const res = await axios.post(`${BASE_URL}endpoints/email_verify_forget_password?locale=${data.lan}`, formData);
        if(res.status == 200 && res.data.status) {
            dispatch({
                type: SEND_FORGET_PASSWORD_VERIFICATION_CODE,
            });
        }
        dispatch(endSendingForgetPasswordVerificationCode);
    } catch (e) {
        console.error(e.message);
        data.navigate('/login');
        dispatch({
            type: LOGIN_ERROR,
            message: e.message
        });
        dispatch(endSendingForgetPasswordVerificationCode);
    }
}

export const startSendingPasswordCodeToServer = {
    type: START_SENDING_CODE_PASSWORD_TO_SERVER
}

export const endSendingPasswordCodeToServer = {
    type: END_SENDING_CODE_PASSWORD_TO_SERVER
}

export const sendCodePasswordToServer = data => async dispatch => {
    try {
        dispatch(startSendingPasswordCodeToServer);
        const formData = {
            email: data.email.value,
            code: data.code
        };
        const res = await axios.post(`${BASE_URL}endpoints/code_verify?locale=${data.lan}`, formData);
        if(res.status == 200 && res.data.status) {
            dispatch({
                type: SEND_CODE_PASSWORD_TO_SERVER,
                email: data.email.value
            });
            data.setStep(2);
        }
        dispatch(endSendingPasswordCodeToServer);
    } catch (e) {
        console.error(e.message);
        dispatch({
            type: LOGIN_ERROR,
            message: e.message
        });
        dispatch(endSendingPasswordCodeToServer);
    }
}

export const startChangingPassword = {
    type: START_CHANGING_PASSWORD
}

export const endChangingPassword = {
    type: END_CHANGING_PASSWORD
}

export const changePassword = data => async dispatch => {
    try {
        dispatch(startChangingPassword);
        const formData = {
            phoneOrEmail: data.email,
            password: data.password
        };
        const res = await axios.post(`${BASE_URL}endpoints/reset-password?locale=${data.lan}`, formData);
        if(res.status == 200 && res.data.status) {
            data.navigate('/login');
        }
        dispatch(endChangingPassword);
    } catch (e) {
        console.error(e.message);
        dispatch(endChangingPassword)
    }
}