import axios from "axios";
import { BASE_URL } from "../../utls/assets";
import {logEvent, getAnalytics} from "firebase/analytics";

export const createOrder = (orderData) => async dispatch => {
    try {
        // const order = {
        //     "locale": "ar",
        //     "customerId": 5,
        //     "providerId": 1,
        //     "productId": 16,
        //     "acceptedTermsAndConditions": 1,
        //     "sort_index": 15,
        //     "status": "test status#",
        //     "statusDetails": "status details#",
        //     "price": 10088,
        //     "comments": "comment#"
        // }
        const analatycs = getAnalytics();
        const res = await axios.post(`${BASE_URL}endpoints/create-order`, orderData);
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
        console.log(res);
    } catch (e) {
        console.error(e.message);
    }
}