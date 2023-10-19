import axios from 'axios';
import {CHANGE_PLATFORM, FETCH_TAKE_ME_ASSETS} from "./action.types";
import {BASE_URL} from "../../utls/assets";
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";

export const fetchAssets = (navigate) => async dispatch => {
    try {
        const res = await axios.get(`${BASE_URL}endpoints/details?locale=ar`);
        dispatch({
            type: FETCH_TAKE_ME_ASSETS,
            assets: res.data
        });
    } catch (err) {
        if(err?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login')
        }
        console.error(err?.message);
    }
}

// export const fetchAssets = (navigate) => async dispatch => {
//     const res = JSON.parse(JSON.stringify({"id":1,"sortIndex":0,"name":"TakeMe","phoneCountryCode":"972","phone":"0509648444","email":"takeme.center@gmail.com","languageId":1,"logoPath":"https://takeme-all.com/app/resources/images/profile/logo.png","coverPath":"https://takeme-all.com/app/resources/images/profile/cover.jpg","footerText":"TakeMe","copyRightYear":2022,"facebookLink":"https://www.facebook.com/ghajar.takeme","instagramLink":"https://www.instagram.com/ghajar.takeme","whatsappLink":"https://wa.me/9720509648444","tiktokLink":null,"backendApiPrefix":"https://takeme-all.com/app/endpoints"}));
//     console.log(res);
//         dispatch({
//             type: FETCH_TAKE_ME_ASSETS,
//             assets: res
//         });
// }

export const changePlatform = platform => ({
    type: CHANGE_PLATFORM,
    platform
});