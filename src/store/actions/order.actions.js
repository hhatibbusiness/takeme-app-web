import axios from "axios";
import { BASE_URL } from "../../utls/assets";

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
        const res = await axios.post(`${BASE_URL}endpoints/create-order?locale=ar`, orderData);
        console.log(res);
    } catch (e) {
        console.error(e.message);
    }
}