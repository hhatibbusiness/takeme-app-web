import axios from "axios";
import {
    CLOSE_PROVIDER_GALLERY, END_FETCHING_PROVIDER,
    FETCH_PROVIDER_DATA,
    OPEN_PROVIDER_GALLERY,
    START_FETCHING_PROVIDER
} from "./action.types";
import { BASE_URL } from "../../utls/assets";
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";

// export const fetchProviderData = (lan, id, filter, navigate) => async dispatch => {
//     try {
//         dispatch(startFetchingProvider);
//         const res = await axios.get(`${BASE_URL}endpoints/provider-details?locale=${lan}&providerId=${id}&filterByAction=${filter}`);
//         if(res.status == 200 && res.data.status == true && Object.keys(res.data.output).length != 0 && res.data.output != null) {
//             dispatch({
//                 type: FETCH_PROVIDER_DATA,
//                 provider: res.data.output
//             });
//         }
//         if(res?.data?.output == null) {
//
//         }
//         console.log(res);
//         dispatch(endFetchingProvider);
//     } catch (e) {
//         if(e?.response?.status == 401) {
//             tokenUnautharizedMiddleware(navigate, '/login');
//         }
//         console.error(e.message);
//         dispatch(endFetchingProvider);
//     }
// }

export const fetchProviderData = (lan, id, filter, navigate) => async dispatch => {
    const res = JSON.parse(
        JSON.stringify(
    {
        "status": true,
        "message": "تم الحصول على أصحاب منتجات أو خدمات بنجاح",
        "output": {
        "id": 29,
            "providerId": 15,
            "name": "Mo Ziko12",
            "phoneCountryCode": "972",
            "phone": "0506331703",
            "whatsappLink": "https://wa.me/9720506331658",
            "navigateLink": "test",
            "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
            "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
            "orderMinDuration": "24 hours",
            "country": "israel",
            "city": "Ghajar",
            "email": null,
            "activeStatus": "active",
            "statusDetails": "ssss",
            "ratingsScore": null,
            "ratingsCount": 0,
            "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
            "productTypeId": null,
            "productTypeTitle": null,
            "totalProducts": 1,
            "totalProductsOfTypeId": 0,
            "localtionMsg": "Ghajar",
            "productsCountMsg": "يوجد لدي 1 منتجات",
            "ratingMsg": "ارسل تقييم",
            "products": {
            "23": [
                {
                    "id": 13,
                    "name": "ddddupdateVIP update",
                    "description": {
                        "text": "text",
                        "list": [
                            {
                                "imagePath": "string",
                                "item": "string"
                            },
                            {
                                "imagePath": "string",
                                "item": "string"
                            },
                            {
                                "imagePath": "string",
                                "item": "string"
                            }
                        ],
                        "variables": [
                            {
                                "iconPath": "string",
                                "key": "key",
                                "value": "value"
                            },
                            {
                                "iconPath": "string",
                                "key": "key",
                                "value": "value"
                            },
                            {
                                "iconPath": "string",
                                "key": "key",
                                "value": "value"
                            }
                        ],
                        "tags": [
                            "string",
                            "string",
                            "string"
                        ],
                        "comments": [
                            "string",
                            "string",
                            "string"
                        ]
                    },
                    "navigateLink": "http://kfgjgjhhfg",
                    "comments": "טעימות כולל הדרכה והסברים על הכפר: 200 שח לבן אדם (המחירים הם לבן אדם)",
                    "productTypeId": 23,
                    "providerId": 15,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 150,
                        "status": "NEW",
                        "priceMsg": "السعر 150 شيكل",
                        "statusMsg": "حالة المنتج NEW"
                    },
                    "images": []
                }
            ]
        }
    }
    }
        )
    )

            dispatch({
                type: FETCH_PROVIDER_DATA,
                provider: res.output
            });
            dispatch(endFetchingProvider);

}

export const openProviderGallery = product => ({
    type: OPEN_PROVIDER_GALLERY,
    product: product
});

export const closeProviderGallery = product => ({
    type: CLOSE_PROVIDER_GALLERY,
});

export const startFetchingProvider = {
    type: START_FETCHING_PROVIDER
}

export const endFetchingProvider = {
    type: END_FETCHING_PROVIDER
}