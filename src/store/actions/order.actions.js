import axios from "axios";
import { BASE_URL } from "../../utls/assets";
import {logEvent, getAnalytics} from "firebase/analytics";
import {loadUser} from "./login.action";

export const createOrder = (orderData) => async dispatch => {
    try {
        const analatycs = getAnalytics();
        const config = {
            headers: { Authorization: `Bearer ${orderData.token}` }
        };

        console.log(orderData);

        const res = await axios.post(`${BASE_URL}endpoints/create-order`, orderData, config);
        if(res.status == 200) {
            logEvent(analatycs, 'create-order', {
                locale: orderData?.locale,
                customerId: orderData.customerId,
                providerId: orderData.providerId,
                productId: orderData.productId,
                acceptedTermsAndCondition: orderData.acceptedTermsAndCondition,
                status: orderData.status,
                invoiceLink: 'test',
                statusDetails: orderData.statusDetails,
                price: orderData.price,
                orderId: orderData.orderId
            });
        }
    } catch (e) {
        console.error(e.response.status);
        if(e?.response?.status == 400) {
            localStorage.removeItem('takemeUserData');
            localStorage.removeItem('takemeUserToken');

            dispatch(loadUser(orderData.navigate, orderData.lan));
        }
        if(e?.response?.status == 401) {
            localStorage.removeItem('takemeUserData');
            localStorage.removeItem('takemeUserToken');
            dispatch(loadUser(orderData.navigate, orderData.lan));
        }

    }
}