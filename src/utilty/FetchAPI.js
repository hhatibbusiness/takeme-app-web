import { addAlert } from '../store/actions/alert.actions';

async function FetchAPI(url, options = {}, dispatch, showSuccessAlert = false) {
    try {
        const token = localStorage.getItem('TAKEME_TOKEN');
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : null,
        });

        const data = await response.json();
        
        if (showSuccessAlert && dispatch) {
            dispatch(addAlert({
                alertType: 'success',
                msg: 'تمت العملية بنجاح'
            }));
        }
        
        return data;
    } catch (error) {
        let alertMessage = error.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري';

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
