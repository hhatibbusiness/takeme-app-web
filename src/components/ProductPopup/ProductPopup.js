import React, {useEffect, useRef, useState} from 'react';
import './ProductPopup.scss';
import {connect} from "react-redux";
import {togglePopup, openPopup as Opopup, closePopup} from "../../store/actions/ui.actions";
import {useTranslation} from "react-i18next";
import ProviderProductListItem
    from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProductListItem/ProviderProductListItem";
import ProviderProductVariables
    from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProductVariables/ProviderProductVariables";
import ProviderProductTags
    from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProductTags/ProviderProductTags";
import ProviderProductComments
    from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProductComments/ProviderProductComments";
import history from '../../history/history';
const ProductPopup = ({togglePopup, currentProduct, openPopup, term, Opopup, closePopup}) => {
    const [short, setShort] = useState(true);

    const {t} = useTranslation();
    useEffect(() => {
        //
        // window.addEventListener('popstate', e => history.go(1));
        if(openPopup) {
            window.history.pushState(null, null, window.location.href);
            window.addEventListener('popstate', e => {
                e.preventDefault();
                closePopup();
            });
        }
    }, [openPopup]);

    // useEffect(() => {
    //     console.log(window);
    //     if(!window || !document) return;
    //     setTimeout(() => {
    //         window.history.forward();
    //     }, 0);
    //     window.onpopstate = e => {
    //         console.log(e);
    //         // if(openPopup) {
    //         //     // togglePopup();
    //         //     return window.history.pushState(null, document.title, window.location.href);
    //         // }
    //         return window.history.pushState(-1, null);
    //     }
    // }, [window]);

    // const onBackButtonEvent = (e) => {
    //
    //     e.preventDefault();var currentLocation = window.location.pathname;
    //
    //     window.history.pushState(`${currentLocation}/mypage/new`)};
    //
    // useEffect(() => {
    //     window.addEventListener('popstate', onBackButtonEvent);return () => {window.removeEventListener('popstate', onBackButtonEvent);
    //
    // };}, [])

    //
    // useEffect(() => {
    //     if(!window) return;
    //     console.log('hello event!');

    //     // window.history.pushState({}, null, window?.location?.href);
    //     window.addEventListener('unload', e => {
    //         // e.preventDefault();
    //         console.log('hello back button!');
    //         togglePopup();
    //         function preventBack() {
    //             window?.history?.forward();
    //         }
    //         setTimeout(preventBack(), 0);
    //         window?.history?.forward();
    //     });
    // }, [window]);

    // const currentProduct = {
    //     "id": 6,
    //     "name": "جولات لففرد والعائلة",
    //     "description": {
    //         "text": "هذة الجولات مناسبة للافراد و العائلات او الكبار او الصغار او الشباب او البنات",
    //         "list": [
    //             {
    //                 "imagePath": "https://images.unsplash.com/photo-1589092073238-d7cc7fd602fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
    //                 "item": "رحلات"
    //             },
    //             {
    //                 "imagePath": "https://images.unsplash.com/photo-1575907794679-016b6bd90285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGlycHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60",
    //                 "item": "جولات"
    //             },
    //             {
    //                 "imagePath": "https://images.unsplash.com/photo-1558536289-b647067c08e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlycHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1000&q=60",
    //                 "item": "سياحية"
    //             }
    //         ],
    //         "variables": [
    //             {
    //                 "iconPath": "https://images.unsplash.com/photo-1682687982141-0143020ed57a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60",
    //                 "key": "المدة",
    //                 "value": "يوم"
    //             },
    //             {
    //                 "iconPath": "https://plus.unsplash.com/premium_photo-1694074422763-9ddc6d3ae085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60",
    //                 "key": "العدد",
    //                 "value": "خمسة"
    //             },
    //             {
    //                 "iconPath": "https://images.unsplash.com/photo-1694309984301-60e69e095ae7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1000&q=60",
    //                 "key": "المواصلات",
    //                 "value": "عجل"
    //             }
    //         ],
    //         "tags": [
    //             "اضفال",
    //             "الجولان",
    //             "القدس"
    //         ],
    //         "comments": [
    //             "ممتازة للعائلات",
    //             "جيدة جدا للعائلات والاطفال",
    //             "مناسبة للشباب و كبار السن"
    //         ]
    //     },
    //     "saleDetails": {
    //         "title": "تفاصيل البيع",
    //         "price": 400,
    //         "status": null,
    //         "priceMsg": "السعر 400 شيكل",
    //         "statusMsg": "حالة المنتج null"
    //     },
    //     "rentDetails": {
    //         "title": "تفاصيل البيع",
    //         "price": 400,
    //         "status": null,
    //         "priceMsg": "السعر 400 شيكل",
    //         "statusMsg": "حالة المنتج null"
    //     },
    //     "navigateLink": "null",
    //     "productTypeId": 1,
    //     "providerId": 8,
    //     "action": "SALE",
    //     "rentPrice": null,
    //     "minTimeForRent": 1,
    //     "rentUnit": "hours",
    //     "salePrice": 150,
    //     "productStatusForSale": "NEW",
    //     "comments": "טעימות כולל הדרכה והסברים על הכפר: 200 שח לבן אדם (המחירים הם לבן אדם)",
    //     "sortIndex": 1,
    //     "createdDate": "2023-08-23T18:39:34.000+00:00",
    //     "updatedDate": "2023-08-23T18:39:34.000+00:00",
    //     "images": [],
    //     "latitude": 0.0,
    //     "longitude": 0.0,
    //     "googleMapLink": "https://maps.google.com/maps?q=0.0%2C0.0",
    //     "wazeMapLink": "https://www.waze.com/ul?ll=0.0%2C0.0&navigate=yes"
    // };

    const renderName = () => {
        console.log(currentProduct?.name);
        var innerHTML = currentProduct?.name;
        var index = innerHTML?.indexOf(term);
        if (index >= 0) {
            // innerHTML = <p onClick={() => setDetailed(!detailed)} className={'ProviderProduct__title'}>{innerHTML.substring(0,index)}<span class='highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            innerHTML = <p >{innerHTML?.substring(0,index)}<span class='highlight'>{innerHTML?.substring(index,index+term.length) }</span>{innerHTML?.substring(index + term.length)}</p>;
            return innerHTML;
        } else {
            return <p >{innerHTML}</p>;
        }
    }

    const contRef = useRef();
    const fullHeight = () => {
        if(!contRef.current) return;
        const ele = contRef.current;
        console.log(ele.className);
        if(!ele.className.includes('ProductPopup__product--fullwidth')) {
            ele.className = ele.className + ' ProductPopup__product--fullwidth';
        }
        // ele.classList.add('ProductPopup__product--fullwidth');
    }


    const notFullHeight = () => {
        if(!contRef.current) return;
        const ele = contRef.current;
        console.log(ele.className);
        if(ele.className.includes('ProductPopup__product--fullwidth')) {
            console.log('hello');
            ele.className = ele.className.replace(' ProductPopup__product--fullwidth', '');
        }

    }
    return (
        <div className={`ProductPopup ${openPopup ? 'ProductPopup__open' : 'ProductPopup__close'}`}>
            <div ref={contRef} className={`ProductPopup__product ${openPopup && 'ProductPopup__product--open'}`}>
                <div onScroll={e => {
                    fullHeight()
                }} className="ProductPopup__product--container">
                    <div onClick={e => {
                        notFullHeight()
                        togglePopup()
                    }} className="ProductPopup__product--close">
                        <span><i className="fa-solid fa-xmark"></i></span>
                    </div>
                    <div className="ProductPopup__product--title">
                        {
                            renderName()
                        }
                    </div>
                    <div className="ProviderProduct__details--prices">
                        {
                            currentProduct?.saleDetails && (
                                <div className={'ProviderProduct__details--sale'}>
                                    {
                                        currentProduct?.saleDetails?.comment && (
                                            <div className="ProviderProduct__details--sale-icon">
                                                <i className="fa-solid fa-circle-exclamation"></i>
                                            </div>
                                        )
                                    }
                                    <div className="ProviderProduct__details--sale-price">
                                        {t('price')}
                                    </div>
                                    <div className="ProviderProduct__details--sale-pricenum">
                                        {
                                            currentProduct?.saleDetails?.price && <span>{currentProduct?.saleDetails?.price}</span>
                                        }
                                    </div>
                                    <div className="ProviderProduct__details--sale-shekel">
                                        <i className="fa-solid fa-shekel-sign"></i>
                                    </div>
                                </div>
                            )
                        }
                        {
                            currentProduct?.rentDetails && (
                                <div className={'ProviderProduct__details--rent'}>
                                    {
                                        currentProduct?.rentDetails?.comment && (
                                            <div className="ProviderProduct__details--sale-icon">
                                                <i className="fa-solid fa-circle-exclamation"></i>
                                            </div>
                                        )
                                    }
                                    <div className="ProviderProduct__details--rent-price">
                                        {t('rentPrice')}
                                    </div>
                                    <div className="ProviderProduct__details--rent-pricenum">
                                        {
                                            currentProduct?.rentDetails?.price && <span>{currentProduct?.rentDetails?.price}</span>
                                        }
                                    </div>
                                    <div className="ProviderProduct__details--rent-shekel">
                                        <i className="fa-solid fa-shekel-sign"></i>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {
                        currentProduct?.description && (
                            <div className="ProviderProduct__details--desc">
                                {
                                    currentProduct?.description?.text && <p className={'ProviderProduct__details--text'}>{currentProduct?.description?.text}</p>
                                }
                                {/*{currentProduct?.description?.text && <p className="ProviderProduct__details--text">{currentProduct?.description?.text && ((short ? `${currentProduct?.description?.text.substr(0, 50)}` : currentProduct?.description?.text))}  <span onClick={e => setShort(!short)} className={'ProviderProduct__details--text-short'}>{currentProduct?.description?.text && (short ? `...${t('more')}` : t('less'))}</span></p>}*/}
                            </div>
                        )
                    }

                    <div className={`ProviderProduct__details-dropdown`} >
                        {/*{currentProduct?.description?.text && <p className="ProviderProduct__details--text">{currentProduct?.description?.text && ((short ? `${currentProduct?.description?.text.substr(0, 50)}` : currentProduct?.description?.text))}  <span onClick={e => setShort(!short)} className={'ProviderProduct__details--text-short'}>{currentProduct?.description?.text && currentProduct?.description?.text.length > 50 && (short ? `...${t('more')}` : t('less'))}</span></p>}*/}
                        <div className="ProviderProduct__details--list">
                            {
                                currentProduct?.description?.list && currentProduct?.description?.list.map((item, i) => (
                                    <ProviderProductListItem item={item} />
                                ))
                            }
                        </div>
                        {
                            currentProduct?.description?.variables?.length > 0 && (currentProduct?.description?.variables?.length === 1 ? (
                                currentProduct?.description?.variables[0]?.value && currentProduct?.description?.variables[0]?.key && <ProviderProductVariables variables={currentProduct?.description?.variables && currentProduct?.description?.variables} />
                            ) : <ProviderProductVariables variables={currentProduct?.description?.variables && currentProduct?.description?.variables} />)
                        }

                        {
                            currentProduct?.description?.comments?.length > 0 && <ProviderProductComments comments={currentProduct?.description?.comments && currentProduct?.description?.comments} />
                        }

                        {
                            currentProduct?.description?.tags?.length > 0 && <ProviderProductTags tags={currentProduct?.description?.tags}  />
                        }
                    </div>
                </div>

            </div>
            <div className={`ProductPopup__backdrop ${openPopup && 'ProductPopup__backdrop--open'}`} onClick={e => {
                console.log('Hello');
                togglePopup();
                notFullHeight()
            }}></div>
        </div>
    );
};

const mapStateToProps = state => ({
    openPopup: state.ui.openPopup,
    currentProduct: state.ui.currentProduct
})

export default connect(mapStateToProps, {togglePopup, Opopup, closePopup}) (ProductPopup);