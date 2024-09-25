import * as actionTypes from '../actions/action.types';

const initialState = {
    sendingCodeToCustomer: false,
    sent: false,
    sendingCodeToServer: false,
    validation: {
        valid: false,
        email: null
    },
    registeringCustomer: false,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_SENDING_EMAIL_VERIFY_CODE_TO_CUSTOMER:
            return {
                ...state,
                sendingCodeToCustomer: true
            }
        case actionTypes.END_SENDING_EMAIL_VERIFY_CODE_TO_CUSTOMER:
            return {
                ...state,
                sendingCodeToCustomer: false
            }
        case actionTypes.SEND_EMAIL_VERIFY_CODE_TO_CUSTOMER:
            return {
                ...state,
                sent: true
            }
        case actionTypes.START_SENDING_CODE_EMAIL_TO_SERVER:
            return {
                ...state,
                sendingCodeToServer: true
            }
        case actionTypes.END_SENDING_CODE_EMAIL_TO_SERVER:
            return {
                ...state,
                sendingCodeToServer: false
            }
        case actionTypes.SEND_CODE_EMAIL_TO_SERVER:
            return {
                ...state,
                validation: {
                    valid: true,
                    email: action.email
                }
            }
        case actionTypes.START_REGISTERING_CUSTOMER:
            return {
                ...state,
                registeringCustomer: true
            }
        case actionTypes.END_REGISTERING_CUSTOMER:
            return {
                ...state,
                registeringCustomer: false
            }
        default:
            return state;
    }
}