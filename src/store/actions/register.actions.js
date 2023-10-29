import {
    EDIT_EMAIL_VALIDATION,
    END_REGISTERING_CUSTOMER,
    END_SENDING_CODE_EMAIL_TO_SERVER,
    END_SENDING_EMAIL_VERIFY_CODE_TO_CUSTOMER, LOGIN_ERROR, LOGIN_USER_IN, REGISTER_CUSTOMER, SEND_CODE_EMAIL_TO_SERVER,
    SEND_EMAIL_VERIFY_CODE_TO_CUSTOMER, START_REGISTERING_CUSTOMER, START_SENDING_CODE_EMAIL_TO_SERVER,
    START_SENDING_EMAIL_VERIFY_CODE_TO_CUSTOMER
} from "./action.types";
import axios from "axios";
import {BASE_URL} from "../../utls/assets";

export const startSendingEmailVerifyCodeToCustomer = {
    type: START_SENDING_EMAIL_VERIFY_CODE_TO_CUSTOMER
}
export const endSendingEmailVerifyCodeToCustomer = {
    type: END_SENDING_EMAIL_VERIFY_CODE_TO_CUSTOMER
}

export const registerError = message => ({
    type: LOGIN_ERROR,
    message
})

export const sendEmailVerifyCodeToCustomer = data => async dispatch => {
    try {
        dispatch({
            type: LOGIN_ERROR,
            message: ''
        })
        dispatch(startSendingEmailVerifyCodeToCustomer);
        const formData = {
            email: data.email
        };
        const res = await axios.post(`${BASE_URL}endpoints/email_verify?locale=${data.lan}`, data);
        if(res.status == 200 && res.data.status == true) {
            dispatch({
                type: SEND_EMAIL_VERIFY_CODE_TO_CUSTOMER
            });
        } else {
            data.setStep(1);
            dispatch({
                type: LOGIN_ERROR,
                message: res.data.message
            });
        }
        dispatch(endSendingEmailVerifyCodeToCustomer);
    } catch (e) {
        console.error(e.message);
    }
}

export const startSendingCodeToServer = {
    type: START_SENDING_CODE_EMAIL_TO_SERVER
}
export const endSendingCodeToServer = {
    type: END_SENDING_CODE_EMAIL_TO_SERVER
}

export const sendCodeToServer = data => async dispatch => {
    try {
        dispatch(startSendingCodeToServer);
        dispatch({
            type: LOGIN_ERROR,
            message: ''
        });
        const formData = {
            email: data.email.value,
            code: data.code
        };
        const res = await axios.post(`${BASE_URL}endpoints/code_verify?locale=${data.lan}`, formData);
        if(res.status == 200 && res.data.status == true) {
            dispatch({
                type: SEND_CODE_EMAIL_TO_SERVER,
                email: data.email.value
            });
            data.setStep(3);
        } else {
            data.setStep(2);
            dispatch({
                type: LOGIN_ERROR,
                message: res?.data?.message
            });
        }
        dispatch(endSendingCodeToServer);
    } catch (e) {
        console.error(e.message);
        dispatch(endSendingCodeToServer);
    }
}

export const startRegisteringCustomer = {
    type: START_REGISTERING_CUSTOMER
}

export const endRegisteringCustomer = {
    type: END_REGISTERING_CUSTOMER
}

export const registerCustomer = data => async disptch => {
    try {
        disptch(startRegisteringCustomer);
        disptch({
            type: LOGIN_ERROR,
            message: ''
        });
        const formData = {
            phone: data.phone,
            email: data.email,
            password: data.password,
            clientId: Math.floor(Math.random() * 1000000 ),
            uType: 'customer',
            roles: ['user'],
            name: data.name,
            country: data.city,
            city: data.city,
            phoneCountryCode: data.phoneCountryCode,
            statusDetails: 'test',
            activeStatus: 'active'
        };

        const res = await axios.post(`${BASE_URL}endpoints/register/customer?locale=ar`, formData);
        if(res.status == 200 && res.data.status == true) {
            disptch({
                type: LOGIN_USER_IN,
                data: res.data
            });
            data.navigate('/');
        }else {
            disptch({
                type: LOGIN_ERROR,
                message: res?.data?.message
            });
        }
        disptch(endRegisteringCustomer);
    } catch (e) {
        console.error(e);
        disptch(endRegisteringCustomer);
        disptch({
            type: LOGIN_ERROR,
            message: e?.response?.data?.message
        });
    }
}

// export const changeValidationEmail = email => ({
//     type: EDIT_EMAIL_VALIDATION,
//     email: action.email
// })