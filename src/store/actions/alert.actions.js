import { v4 as uuid } from 'uuid';
import { ADD_ALERT, REMOVE_ALERT } from './action.types';

export const addAlert = data => dispatch => {
    const id = uuid();
    console.log(id);
    dispatch({
        type: ADD_ALERT,
        alert: {
            msg: data.msg,
            alertType: data.alertType,
            id
        }
    })
    setTimeout(() => {
        dispatch(removeAlert());
    }, 10000);
}

export const removeAlert = () => {
    return {
        type: REMOVE_ALERT
    }
}