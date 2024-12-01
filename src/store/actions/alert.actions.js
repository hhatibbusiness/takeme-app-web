import { v4 as uuid } from 'uuid';
import { ADD_ALERT, REMOVE_ALERT } from './action.types';

export const addAlert = data => {
    const id = uuid();
    return {
        type: ADD_ALERT,
        alert: {
            msg: data.msg,
            alertType: data.alertType,
            id
        }
    }
}

export const removeAlert = data => {
    return {
        type: REMOVE_ALERT,
        id: data.id
    }
}