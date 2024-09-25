import * as actionTypes from '../actions/action.types';

const initialState = {
    sendingCode: false,
    code: null,
    sendingCodeToServer: false,
    validation: {
        valid: false,
        email: null
    },
    changingPassword: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_SENDING_FORGET_PASSWORD_VERIFICATION_CODE:
            return {
                ...state,
                sendingCode: true
            }
        case actionTypes.END_SENDING_FORGET_PASSWORD_VERIFICATION_CODE:
            return {
                ...state,
                sendingCode: false
            }
        case actionTypes.START_SENDING_CODE_PASSWORD_TO_SERVER:
            return {
                ...state,
                sendingCodeToServer: true
            }
        case actionTypes.END_SENDING_CODE_PASSWORD_TO_SERVER:
            return {
                ...state,
                sendingCodeToServer: false
            }
        case actionTypes.SEND_CODE_PASSWORD_TO_SERVER:
            return {
                ...state,
                validation: {
                    valid: true,
                    email: action.email
                }
            }
        case actionTypes.START_CHANGING_PASSWORD:
            return {
                ...state,
                changingPassword: true
            }
        case actionTypes.END_CHANGING_PASSWORD:
            return {
                ...state,
                changingPassword: false
            }
        default:
            return state;
    }
}