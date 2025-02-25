import { addAlert } from '../store/actions/alert.actions';

async function FetchAPI(url, options = {}, dispatch) {
    const Token = localStorage.getItem('TAKEME_TOKEN');

    try {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`,
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : null,
        });

        const data = await response.json();
        
        if (!data.status) {
            throw new Error(data.message || 'حدث خطأ برجاء المحاولة مرة أخري');
        }

        return data;
    } catch (error) {
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
