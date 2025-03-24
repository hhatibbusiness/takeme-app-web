import { addAlert } from '../store/actions/alert.actions';
import axios from "axios";

async function FetchAPI(url, options = {}, dispatch, showSuccessAlert = false) {
    try {
        console.log('Initialize the role update!');
        const token = localStorage.getItem('TAKEME_TOKEN');

        // Axios request
        const response = await axios({
            url: url, // URL for the request
            method: options.method || 'GET', // Default to GET if no method is provided
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers, // Spread any additional headers
            },
            data: options.body || null, // Axios uses `data` instead of `body` for the request payload
        });

        const data = response.data; // Axios automatically parses the response JSON

        if (showSuccessAlert && dispatch) {
            dispatch(addAlert({
                alertType: 'success',
                msg: data?.data?.message || data?.message || 'تمت العملية بنجاح'
            }));
        }

        return data;
    } catch (error) {
        console.log("Error updating roles!", error);
        let alertMessage = error.response?.data?.message || error.message || 'حدث خطأ برجاء المحاولة مرة أخري';

        if (!navigator.onLine) {
            alertMessage = 'لا يوجد اتصال بالإنترنت. برجاء التحقق من الشبكة والمحاولة مرة أخرى.';
        }

        if (dispatch) {
            const alertData = {
                alertType: 'danger',
                msg: alertMessage
            };
            dispatch(addAlert(alertData));
        }

        return null;
    }
}

export default FetchAPI;