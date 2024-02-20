import axios from "axios";
import {
    CHANGE_SEARCH_CURRENT_CATEGORY_ID, CHANGE_SEARCH_TERM, CLOSE_SCREEN_GALLERY, END_FETCHING_SEARCH_RESULTS,
    FETCH_SEARCH_RESULTS, INCREASE_SEARCH_PAGE, OPEN_SCREEN_GALLERY, RESET_ALL_SEARCH_DATA,
    RESET_SEARCH_DATA,
    START_FETCHING_SEARCH_RESULTS
} from "./action.types";
import { BASE_URL } from "../../utls/assets";
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";
import {getAnalytics, logEvent} from "firebase/analytics";

const providersArray = [
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 2,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 3,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 4,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 5,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 6,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 7,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 8,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 9,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 10,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
    {
        "id": 1,
        "name": "Ameen Taher",
        "phoneCountryCode": null,
        "phone": "0506331658",
        "whatsappLink": "https://wa.me/9720506331658",
        "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
        "imagePath": "https://takeme-all.com/app/resources/providers/images/default_profile_image.png",
        "workDaysAndHours": "Sun-Fri, 16:00 - 18:00",
        "orderMinDuration": null,
        "country": "israel",
        "city": "Ghajar",
        "email": null,
        "activeStatus": "Active",
        "statusDetails": "",
        "ratingsScore": null,
        "ratingsCount": 0,
        "infoMessage": "سيتم فتح محادثة واتساب مع صاحب المنتج أو الخدمة. \n اسأل صاحب المنتج أو الخدمة أي سؤال تريده عن منتجاته او خدماته. \n حدد معه موعدًا لاستلام المنتج او الخدمة وقم بالدفع له عند استلام المنتج او الخدمة. \n \n إذا واجهت أي مشكلة مع صاحب المنتج أو الخدمة أخبرنا بذلك، كما يمكنك أيضًا تقييمه في هذا التطبيق.",
        "productTypeId": 1,
        "productTypeTitle": "جولات شرح",
        "totalProducts": 2,
        "totalProductsOfTypeId": 2,
        "localtionMsg": "Ghajar",
        "productsCountMsg": "يوجد لدي 2 جولات شرح و 0 منتجات اخرى",
        "ratingMsg": "ارسل تقييم",
        "products": {
            "1": [
                {
                    "id": 1,
                    "name": "جولة للفرد والزوج",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر لكل المجموعة",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 400,
                        "status": null,
                        "priceMsg": "السعر 400 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 1,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 2,
                            "productId": 1,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/1/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "جولة لساعة",
                    "description": "<section>\n<p>جولة للفرد والزوج جميلة جدا</p>\n<ul-list>\n<li>التقابل مع شخص من القرية</li>\n<li>تذوق بالدوخان</li>\n<li>تذوق بمحطات البيوت</li>\n<li>تذوق حلويات مختلفة</li>\n</ul-list>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/time.png</img-key>\n<span-key>مدة الجولة :</span-key>\n<span>ساعتين</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/group.png</img-key>\n<span-key>منيموم مشتركين :</span-key>\n<span>7</span>\n</div>\n<div>\n<img-key>https://eusopht.com/muneeb_icons/user.png</img-key>\n<span-key>مكسيموم مشتركين :</span-key>\n<span>20</span>\n</div>\n<p-comment>الجولة ملائمه ل 18 سنه وفوق فقط</p-comment></section>",
                    "navigateLink": "https://goo.gl/maps/JGRvdZJfEPbfkbAV7",
                    "comments": "السعر يشمل هدرخا فقط",
                    "productTypeId": 1,
                    "providerId": 1,
                    "rentDetails": null,
                    "saleDetails": {
                        "title": "تفاصيل البيع",
                        "price": 350,
                        "status": null,
                        "priceMsg": "السعر 350 شيكل",
                        "statusMsg": "حالة المنتج null"
                    },
                    "images": [
                        {
                            "id": 3,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/1.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        },
                        {
                            "id": 4,
                            "productId": 2,
                            "imagePath": "http://194.31.150.116:8080/app/resources/providers/0506544232/products/images/2/2.jpg",
                            "comments": "",
                            "createdDate": null,
                            "updatedDate": null
                        }
                    ]
                }
            ]
        }
    },
]


export const startFetchingSearchResults = {
    type: START_FETCHING_SEARCH_RESULTS
}

export const endFetchingSearchResults = {
    type: END_FETCHING_SEARCH_RESULTS
}

export const fetchSearchResults = (lan, categoryId, filter, term, page, navigate) => async dispatch => {
    try {
        if(page == 0){
            dispatch(startFetchingSearchResults);
            dispatch(resetSearchData());
        }
        // const providers = providersArray.slice((page + 1) * 10 - 10, (page + 1) * 10);
        // const res = await axios.post(`${BASE_URL}endpoints/products/search-web?locale=${lan}&categoryId=${categoryId}&filterByAction=${filter}&searchText=${term}&page=${page}`);
        const res = await axios.get(`${BASE_URL}endpoints/search-products?locale=${lan}&categoryId=${categoryId}&filterByAction=${filter}&searchText=${term}&page=${page}`)
        // console.log(res);
        dispatch({
            type: FETCH_SEARCH_RESULTS,
            // results: providers
            results: res.data
        });
        if(page > 0 && res.data.length > 0) {
            const analytics = getAnalytics();
            logEvent(analytics, 'pagination', {
                paginationName: 'search-providers'
            });
        }
        dispatch(endFetchingSearchResults);
        dispatch(increaseSearchPage());
    } catch (e) {
        console.error(e.message);
        dispatch(endFetchingSearchResults);
        if(e?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login');
        }
    }
}

export const changeSearchCategoryId = id => ({
    type: CHANGE_SEARCH_CURRENT_CATEGORY_ID,
    id
});

export const resetSearchData = () => ({
    type: RESET_SEARCH_DATA
});

export const openSearchGallery = product => ({
    type: OPEN_SCREEN_GALLERY,
    product
});

export const closeSearchGallery = () => ({
    type: CLOSE_SCREEN_GALLERY
});

export const changeSearchTerm = term => async dispatch => {
    try {
        dispatch({
            type: CHANGE_SEARCH_TERM,
            term
        });

    } catch (e) {
        console.error(e.message);
    }
}

export const resetAllSearchData = () => ({
    type: RESET_ALL_SEARCH_DATA
})

export const increaseSearchPage = () => ({
    type: INCREASE_SEARCH_PAGE
})