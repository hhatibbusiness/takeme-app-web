// import React, {useEffect, useRef, useState} from 'react';
// import ProviderProduct from "../../Product/Provider/ProviderProducts/ProviderProduct/ProviderProduct";
// import './ProviderProductType.css';
// import SocialsNew from "../../Product/Provider/SocialsNew/SocialsNew";
// import Loader from "../../../components/Loader/Loader";
// import {connect} from "react-redux";
// import InfiniteScroll from "react-infinite-scroller";
// import {useNavigate, useParams} from "react-router-dom";
// import {fetchProviderProductsTypes} from '../../../store/actions/provider.actions';
//
// const ProviderProductType = ({
//     productType,
//     // isScrollingUp,
//     // setIsScrollingUp,
//     // isScrollingDown,
//     // setIsScrollingDown,
//     enableSwipingUp,
//     setEnableSwipingUp,
//     enableSwipingDown,
//     setEnableSwipingDown,
//     curId,
//     openGallery,
//     url,
//     active,
//     fetchProviderProductsTypes,
//     lan,
//     provider,
//     filter,
//     loadingProductTypes,
//     enableSwiping,
//     setEnableSwiping,
//     containerRef,
//     index,
//     productTypes,
//     takemeUserToken,
//     takemeProviderToken,
//     takemeProviderData,
//     currentUser,
//     hidden
// }) => {
//     const [moreLoading, setMoreLoading] = useState(false);
//     const [gallery, setGallery] = useState(false);
//     const providerRef = useRef();
//     const imgRef = useRef();
//     const imgContainer = useRef();
//     const lastScrollTop = useRef(0);
//     const [pageY, setPageY] = useState(null);
//     const [isScrollingUp, setIsScrollingUP] = useState(false);
//     const [isAtTop, setIsAtTop] = useState(false);
//     const [isScrollingDown, setIsScrollingDown] = useState(false);
//     const [isAtBottom, setIsAtBottom] = useState(false);
//
//     const params = useParams();
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         setMoreLoading(productType?.more);
//     }, [productType?.more]);
//
//     useEffect(() => {
//         const container = containerRef?.current;
//         if(container) {
//             // const currentScrollTop = container.scrollTop;
//             // const containerAtBottom = container.scrollHeight - Math.ceil(currentScrollTop) === container.clientHeight || Math.abs((container.scrollHeight - Math.ceil(currentScrollTop)) -  (container.clientHeight)) == 1;
//             // console.log(containerAtBottom)
//             // if(!containerAtBottom) {
//             //     return setEnableSwiping(false);
//             // }
//
//             if(productType?.products?.length == 1) return setEnableSwiping(true);
//             console.log('hello');
//             if(isScrollingDown && !productType?.more) {
//                 // setEnableSwipingDown(false);
//                 // setEnableSwipingUp(false);
//                 // setEnableSwipingDown(isAtBottom);
//                 setEnableSwiping(isAtBottom);
//                 // console.log('down!', isAtBottom);
//             } else if(isScrollingUp) {
//                 // setEnableSwipingUp(false);
//                 // setEnableSwipingDown(false);
//                 // setEnableSwipingUp(isAtTop);
//                 if(index == 0 && isAtTop) {
//                     return setEnableSwiping(false);
//                 }
//                 setEnableSwiping(isAtTop);
//                 // console.log('up!', isAtTop);
//             }
//         }
//     }, [isScrollingUp, isScrollingDown, isAtTop, isAtBottom]);
//
//
//     useEffect(() => {
//         const productTypeContainer = imgContainer?.current;
//         // console.log(productType?.products?.length, active, productType?.id);
//         setIsAtTop(true);
//         setIsAtBottom(false);
//         const container = containerRef?.current;
//         if(container) {
//             const currentScrollTop = container.scrollTop;
//             const containerAtBottom = container.scrollHeight - Math.ceil(currentScrollTop) === container.clientHeight || Math.abs((container.scrollHeight - Math.ceil(currentScrollTop)) -  (container.clientHeight)) == 1;
//             console.log(containerAtBottom)
//             if(!containerAtBottom) {
//                 const content = imgContainer.current;
//                 if(content) {
//                     content.style.overflowY = 'hidden';
//                 }
//
//                 return setEnableSwiping(false);
//             }
//         }
//
//         if(productType?.products?.length == 1 && active == productType?.id) {
//             // console.log('Hello there!');
//             // setEnableSwipingDown(true);
//             // setEnableSwipingUp(true);
//             setEnableSwiping(true);
//             setIsAtBottom(true);
//         } else {
//             if(productTypeContainer) {
//                 productTypeContainer.addEventListener('scroll', e => {
//                     const container = containerRef?.current;
//                     if(container) {
//                         const currentScrollTop = container.scrollTop;
//                         const containerAtBottom = container.scrollHeight - Math.ceil(currentScrollTop) === container.clientHeight || Math.abs((container.scrollHeight - Math.ceil(currentScrollTop)) -  (container.clientHeight)) == 1;
//                         console.log(containerAtBottom)
//                         if(!containerAtBottom) {
//                             const content = imgContainer.current;
//                             if(content) {
//                                 content.style.overflowY = 'hidden';
//                             }
//
//                             return setEnableSwiping(false);
//                         } else {
//                             const content = imgContainer.current;
//                             if(content) {
//                                 content.style.overflowY = 'auto';
//                             }
//
//                             checkScrollDirection();
//                         }
//                     }
//
//                 });
//             }
//         }
//
//         return () => {
//             productTypeContainer.removeEventListener('scroll', checkScrollDirection);
//         }
//     }, [imgContainer?.current, active, containerRef?.current]);
//
//     useEffect(() => {
//         const container = containerRef?.current;
//         if(container) {
//             container.addEventListener('scroll', e => {
//                 const currentScrollTop = container.scrollTop;
//                 const containerAtBottom = container.scrollHeight - Math.ceil(currentScrollTop) === container.clientHeight || Math.abs((container.scrollHeight - Math.ceil(currentScrollTop)) -  (container.clientHeight)) == 1;
//                 if(!containerAtBottom) {
//                     const content = imgContainer.current;
//                     if(content) {
//                         content.style.overflowY = 'hidden';
//                     }
//
//                     return setEnableSwiping(false);
//                 }else {
//                     console.log('at bottom', productType?.products?.length, active, productTypes?.indexOf(p => p.id == productType?.id), productType?.id);
//                     if(productType?.products?.length == 1 && active == productType?.id) {
//                         console.log('Hello there!');
//
//                         // setEnableSwipingDown(true);
//                         // setEnableSwipingUp(true);
//                         setEnableSwiping(true);
//                         setIsAtBottom(true);
//                     }else {
//                         const content = imgContainer.current;
//                         if(content) {
//                             content.style.overflowY = 'auto';
//                         }
//
//                     }
//                 }
//             });
//         }
//         return () => {
//             container.addEventListener('scroll', e => {
//                 console.log('dlfjalksf')
//             });
//         }
//     }, [containerRef?.current, active]);
//
//     return (
//         <div
//              ref={imgContainer}
//              className={'ProviderProductType'} id={'ProviderProductType'}
//              style={{overflowY: `${!hidden ? 'hidden': 'auto'}`}}
//
//              onTouchStart={e => {
//                  // const container = containerRef?.current;
//                  // if(container) {
//                  //     const currentScrollTop = container.scrollTop;
//                  //     const containerAtBottom = container.scrollHeight - Math.ceil(currentScrollTop) === container.clientHeight || Math.abs((container.scrollHeight - Math.ceil(currentScrollTop)) -  (container.clientHeight)) == 1;
//                  //     console.log(containerAtBottom)
//                  //     if(!containerAtBottom) {
//                  //         return setEnableSwiping(false);
//                  //     }
//                  // }
//
//                  // console.log('Starting!', e.targetTouches[0]);
//                  // if(isScrollingUp && )
//                  setPageY(e.targetTouches[0].clientY);
//                  // if(productType?.products?.length == 1 && active == productType?.id) {
//                  //    // setEnableSwipingDown(true);
//                  //    // setEnableSwipingUp(true);
//                  //     return setEnableSwiping(true);
//                  // }
//                  // console.log(e.targetTouches[0].clientY);
//                  // setEnableSwipingDown(false);
//                  // setEnableSwipingUp(false);
//                  // checkScrollDirection();
//              }}
//
//              onTouchMove={e => {
//                  // checkScrollDirection();
//                  // console.log(e.targetTouches[0], pageY);
//                  if(e.targetTouches[0].clientY < pageY) {
//                      // console.log('work', e.targetTouches[0].clientY < pageY);
//                      setIsScrollingUP(false);
//                      setIsScrollingDown(true);
//
//                      // const container = containerRef?.current;
//                      // if(container) {
//                      //     const currentScrollTop = container.scrollTop;
//                      //     const containerAtBottom = container.scrollHeight - Math.ceil(currentScrollTop) === container.clientHeight || Math.abs((container.scrollHeight - Math.ceil(currentScrollTop)) -  (container.clientHeight)) == 1;
//                      //
//                      //     if(!containerAtBottom) {
//                      //         const content = imgContainer.current;
//                      //         if(content) {
//                      //            content.style.overflowY = 'hidden';
//                      //         }
//                      //         return setEnableSwiping(false);
//                      //     }else if(isAtBottom) {
//                      //         return setEnableSwiping(true);
//                      //     }else if(!isAtBottom) {
//                      //         const content = imgContainer.current;
//                      //         if(content) {
//                      //             content.style.overflowY = 'auto';
//                      //         }
//                      //     }
//                      // }
//                      // console.log(e.targetTouches[0].clientY < pageY);
//
//                      const content = imgContainer.current;
//                      // console.log(isAtTop, isAtBottom);
//
//                      if (content) {
//                          const currentScrollTop = Math.ceil(content.scrollTop);
//
//                          // Enable swiping if the user is at the top or bottom of the content
//                          setIsAtTop(currentScrollTop === 0);
//                          setIsAtBottom(content.scrollHeight - currentScrollTop === content.clientHeight || Math.abs((content.scrollHeight - currentScrollTop) -  (content.clientHeight)) == 1 );
//
//                          setEnableSwiping(isAtBottom && !productType?.more);
//                          lastScrollTop.current = currentScrollTop;
//                      }
//
//                      if(!isAtBottom) {
//                         setEnableSwiping(false);
//                      }
//
//
//                      // if(isAtBottom) {
//                      //     console.log('work11')
//                      //    setEnableSwiping(true);
//                      // } else {
//                      //     console.log('work12')
//                      //     setEnableSwiping(false);
//                      //     // checkScrollDirection();
//                      // }
//                  } else {
//                      // console.log('work2')
//                      setIsScrollingDown(false);
//                      setIsScrollingUP(true);
//
//                      const container = containerRef?.current;
//
//                      if(container) {
//
//                      }
//
//                      const content = imgContainer.current;
//
//                      if (content) {
//                          const container = containerRef?.current;
//                          const currentScrollTop = Math.ceil(content.scrollTop);
//                          // Enable swiping if the user is at the top or bottom of the content
//                          setIsAtTop(currentScrollTop === 0);
//                          setIsAtBottom(content.scrollHeight - currentScrollTop === content.clientHeight || Math.abs((content.scrollHeight - currentScrollTop) -  (content.clientHeight)) == 1 );
//
//                          lastScrollTop.current = currentScrollTop;
//                          console.log(currentScrollTop == 0, index == 0);
//                          if(currentScrollTop == 0 && index == 0) {
//                              return setEnableSwiping(false);
//                          }
//                      }
//
//                      if(!isAtTop) {
//                         setEnableSwiping(false);
//                      }
//                  }
//              }}
//              onTouchEnd={e => {
//                  // console.log('Stopped!')
//                  if( isScrollingDown ) {
//                      if(isAtBottom) {
//                          // console.log('work11')
//                          setEnableSwiping(true);
//                      }
//                  } else if(isScrollingUp) {
//                      if(isAtTop) {
//                          setEnableSwiping(true);
//                      }
//                  }
//              }}
//         >
//             <InfiniteScroll
//                 dataLength={productType?.products?.length}
//                 pageStart={productType?.page}
//                 loadMore={() => {
//                     // console.log('step 1!');
//                     if(productType?.products?.length === 0 && productType?.page === 0) return;
//                     // console.log('step 2!');
//                     if(!moreLoading) return;
//                     // console.log('step 3!');
//                     if(!productType?.more) return setMoreLoading(false);
//                     // console.log('step 4!');
//                     if(loadingProductTypes) return;
//                     // console.log('step 5!');
//                     const data = {
//                         providerId: params.providerId,
//                         categoryListIds: !curId ? null : [curId],
//                         productTypeId: productType.id,
//                         page: productType.page,
//                         lan,
//                         filter,
//                         navigate
//                     };
//
//                     fetchProviderProductsTypes(data);
//                 }}
//                 hasMore={moreLoading}
//                 loader={<Loader />}
//                 useWindow={false}
//             >
//                 <div className={'ProviderProductType__container'}>
//                     {
//                         productType?.products?.map((product, i) => (
//                             <div className={'ProviderProductType__container--product'}>
//                                 <ProviderProduct takemeProviderToken={takemeProviderToken}  url={url} arrayRef={imgContainer} setGallery={setGallery}  providerOrNot={true} providerRef={providerRef} imgRef={imgRef} product={product} openGallery={openGallery} />
//                                 <hr />
//                                 <SocialsNew currentUser={currentUser} takemeUserToken={takemeUserToken} provider={provider} activeProduct={product} />
//                                 <hr className={'ProviderProductType__hr'} id={'ProviderProductType__hr'}/>
//                             </div>
//                         ))
//                     }
//
//                 </div>
//             </InfiniteScroll>
//         </div>
//     );
// };
//
// const mapStateToProps = state => ({
//     loadingProductTypes: state.provider.loadingProductTypes,
//     filter: state.categories.filter,
//     lan: state.categories.lan,
//     curId: state.provider.curId,
//     galleryProduct: state.product.galleryProduct
// });
//
// export default connect(mapStateToProps, {fetchProviderProductsTypes}) (ProviderProductType);
//
// // import React, {useEffect, useRef, useState} from 'react';
// // import ProviderProduct from "../../Product/Provider/ProviderProducts/ProviderProduct/ProviderProduct";
// // import './ProviderProductType.css';
// // import SocialsNew from "../../Product/Provider/SocialsNew/SocialsNew";
// // import Loader from "../../../components/Loader/Loader";
// // import {connect} from "react-redux";
// // import InfiniteScroll from "react-infinite-scroller";
// // import {useNavigate, useParams} from "react-router-dom";
// // import {fetchProviderProductsTypes} from '../../../store/actions/provider.actions';
// // import {setCurrentClient} from "@sentry/react";
// //
// // const ProviderProductType = ({
// //      productType,
// //      // isScrollingUp,
// //      // setIsScrollingUp,
// //      // isScrollingDown,
// //      // setIsScrollingDown,
// //      enableSwipingUp,
// //      setEnableSwipingUp,
// //      enableSwipingDown,
// //      setEnableSwipingDown,
// //      curId,
// //      openGallery,
// //      url,
// //      active,
// //      fetchProviderProductsTypes,
// //      lan,
// //      provider,
// //      filter,
// //      loadingProductTypes,
// //      enableSwiping,
// //      setEnableSwiping,
// //      containerRef,
// //      index,
// //      productTypes,
// //      takemeUserToken,
// //      takemeProviderToken,
// //      takemeProviderData,
// //      currentUser,
// //      hidden,
// //      containerScroll,
// //     setContainerScroll,
// //     currentProductType,
// //     setCurrentProductType,
// //     productTypeContainer
// //  }) => {
// //     const [moreLoading, setMoreLoading] = useState(false);
// //     const [gallery, setGallery] = useState(false);
// //     const providerRef = useRef();
// //     const imgRef = useRef();
// //     const imgContainer = useRef();
// //     const lastScrollTop = useRef(0);
// //     const [pageY, setPageY] = useState(null);
// //     const [isScrollingUp, setIsScrollingUP] = useState(false);
// //     const [isAtTop, setIsAtTop] = useState(false);
// //     const [isScrollingDown, setIsScrollingDown] = useState(false);
// //     const [isAtBottom, setIsAtBottom] = useState(false);
// //
// //     const params = useParams();
// //     const navigate = useNavigate();
// //
// //     useEffect(() => {
// //         setMoreLoading(productType?.more);
// //     }, [productType?.more]);
// //
// //     // useEffect(() => {
// //     //     if(!productType.more) {
// //     //         setContainerScroll(true);
// //     //     }
// //     // }, []);
// //
// //     useEffect(() => {
// //         const productType = imgContainer?.current;
// //         const productTypeContainerRef = productTypeContainer?.current
// //         if(productType && productTypeContainerRef) {
// //             const {top, left, bottom, right} = productType.getBoundingClientRect();
// //             const {innerHeight, innerWidth} = window;
// //             if(top >= 0 ) {
// //                 setCurrentProductType(productType?.id);
// //                 if(!productType?.more && hidden) {
// //                     productTypeContainerRef.style.overflowY = 'auto';
// //                 } else {
// //                     productTypeContainerRef.style.overflowY = 'hidden';
// //                 }
// //             }
// //         }
// //     }, [imgContainer?.current, productTypeContainer?.current]);
// //
// //
// //
// //     return (
// //         <div
// //             style={{overflowY: `${!hidden ? 'hidden': 'auto'}`}}
// //             ref={imgContainer}
// //             className={'ProviderProductType'} id={'ProviderProductType'}
// //             onScroll={e => {
// //                 console.log(e.target.scrollTop, e);
// //             }}
// //         >
// //             <InfiniteScroll
// //                 dataLength={productType?.products?.length}
// //                 pageStart={productType?.page}
// //                 loadMore={() => {
// //                     // console.log('step 1!');
// //                     if(productType?.products?.length === 0 && productType?.page === 0) return;
// //                     // console.log('step 2!');
// //                     if(!moreLoading) return;
// //                     // console.log('step 3!');
// //                     if(!productType?.more) return setMoreLoading(false);
// //                     // console.log('step 4!');
// //                     if(loadingProductTypes) return;
// //                     // console.log('step 5!');
// //                     const data = {
// //                         providerId: params.providerId,
// //                         categoryListIds: !curId ? null : [curId],
// //                         productTypeId: productType.id,
// //                         page: productType.page,
// //                         lan,
// //                         filter,
// //                         navigate
// //                     };
// //
// //                     fetchProviderProductsTypes(data);
// //                 }}
// //                 hasMore={moreLoading}
// //                 loader={<Loader />}
// //                 useWindow={false}
// //             >
// //                 <div className={'ProviderProductType__container'}>
// //                     {
// //                         productType?.products?.map((product, i) => (
// //                             <div className={'ProviderProductType__container--product'}>
// //                                 <ProviderProduct takemeProviderToken={takemeProviderToken}  url={url} arrayRef={imgContainer} setGallery={setGallery}  providerOrNot={true} providerRef={providerRef} imgRef={imgRef} product={product} openGallery={openGallery} />
// //                                 <hr />
// //                                 <SocialsNew currentUser={currentUser} takemeUserToken={takemeUserToken} provider={provider} activeProduct={product} />
// //                                 <hr className={'ProviderProductType__hr'} id={'ProviderProductType__hr'}/>
// //                             </div>
// //                         ))
// //                     }
// //
// //                 </div>
// //             </InfiniteScroll>
// //         </div>
// //     );
// // };
// //
// // const mapStateToProps = state => ({
// //     loadingProductTypes: state.provider.loadingProductTypes,
// //     filter: state.categories.filter,
// //     lan: state.categories.lan,
// //     curId: state.provider.curId,
// //     galleryProduct: state.product.galleryProduct
// // });
// //
// // export default connect(mapStateToProps, {fetchProviderProductsTypes}) (ProviderProductType);

import React, {useEffect, useRef, useState} from 'react';
import ProviderProduct from "../../Product/Provider/ProviderProducts/ProviderProduct/ProviderProduct";
import './ProviderProductType.css';
import SocialsNew from "../../Product/Provider/SocialsNew/SocialsNew";
import Loader from "../../../components/Loader/Loader";
import {connect} from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import {useNavigate, useParams} from "react-router-dom";
import {fetchProviderProductsTypes} from '../../../store/actions/provider.actions';
import SpinnerComponent from "../../../components/Spinner/Spinner.Component";

const ProviderProductType = ({
    setActive,
    array,
     containerHeight,
     productType,
     curId,
     openGallery,
     url,
     active,
     fetchProviderProductsTypes,
     lan,
     provider,
     filter,
     loadingProductTypes,
     setEnableSwiping,
     containerRef,
     takemeUserToken,
     takemeProviderToken,
     currentUser,
     swiperInstance,
     hidden,
     index,
    transformValue,
    setTransformValue,
    scrollValue,
    setScrollValue
 }) => {
    const [moreLoading, setMoreLoading] = useState(false);
    const [gallery, setGallery] = useState(false);
    const [isScrollingUp, setIsScrollingUP] = useState(false);
    const [isAtTop, setIsAtTop] = useState(false);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const [pageY, setPageY] = useState(null);
    const [startY, setStartY] = useState(0);

    const providerRef = useRef();
    const imgRef = useRef();
    const imgContainer = useRef();
    const lastScrollTop = useRef(0);

    const params = useParams();
    const navigate = useNavigate();
    const [transformed, setTransformed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(isScrollingUp, isScrollingDown, swiperInstance);
        if(pageY && active == productType?.id) {
            if(productType?.products?.length == 1) return setEnableSwiping(true);

            if(isAtBottom && isScrollingDown) return setEnableSwiping(true);
            if(!isAtBottom && isScrollingDown) return setEnableSwiping(false);
            if(isAtTop && isScrollingUp) return setEnableSwiping(true);
            if(!isAtTop && isScrollingUp) return setEnableSwiping(false);
        }
    }, [pageY, containerRef.current, hidden]);

    const productTypeScrollHandler = async e => {
        const element = imgContainer.current;
        if(element) {
            const { scrollTop, scrollHeight, clientHeight } = element;
            console.log(Math.ceil(scrollTop + clientHeight), scrollHeight);
            if(Math.ceil(scrollTop + clientHeight) == scrollHeight) {
                console.log('User Scrolled to the bottom!', productType?.products?.length === 0 && productType?.page === 0, !moreLoading);
                if(productType?.products?.length === 0 && productType?.page === 0) return;
                if(!moreLoading) return;
                if(!productType?.more) return setMoreLoading(false);
                if(loadingProductTypes) return;
                if(loading) return;
                const data = {
                    providerId: params.providerId,
                    categoryListIds: !curId ? null : [curId],
                    productTypeId: productType.id,
                    page: productType.page,
                    lan,
                    filter,
                    navigate
                };

                setLoading(true);

                await fetchProviderProductsTypes(data);
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        setMoreLoading(productType?.more);
    }, [productType?.more]);

    return (
        <div
            style={{ overflowY: `${!hidden ? 'hidden' : 'auto'}`, height: `${containerHeight}px`}}
             ref={imgContainer}
             className={'ProviderProductType'} id={'ProviderProductType'}
             // onScroll={e => {
             //     const content = imgContainer.current;
             //     setPageY(e.target.scrollTop);
             //
             //     if (isAtTop) {
             //         setTransformValue(transformValue - containerHeight)
             //     }
             //
             //     if(e.target.scrollTop > pageY) {
             //         setIsScrollingDown(true);
             //         setIsScrollingUP(false);
             //
             //         const content = imgContainer.current;
             //
             //         if(content) {
             //             const currentScrollTop = Math.ceil(content.scrollTop);
             //             setIsAtTop(currentScrollTop == 0);
             //             setIsAtBottom(content.scrollHeight - currentScrollTop === content.clientHeight || Math.abs((content.scrollHeight - currentScrollTop) -  (content.clientHeight)) == 1 );
             //             lastScrollTop.current = currentScrollTop;
             //             if (content.scrollHeight - currentScrollTop === content.clientHeight || Math.abs((content.scrollHeight - currentScrollTop) -  (content.clientHeight)) == 1 ) {
             //                setTransformValue(transformValue - containerHeight);
             //             }
             //         }
             //     } else {
             //         setIsScrollingDown(false);
             //         setIsScrollingUP(true);
             //         if(content) {
             //             const currentScrollTop = Math.ceil(content.scrollTop);
             //             console.log(currentScrollTop == 0);
             //             setIsAtTop(currentScrollTop == 0);
             //             setIsAtBottom(content.scrollHeight - currentScrollTop === content.clientHeight || Math.abs((content.scrollHeight - currentScrollTop) -  (content.clientHeight)) == 1 );
             //             lastScrollTop.current = currentScrollTop;
             //         }
             //     }
             // }}

            onScroll={productTypeScrollHandler}
             onTouchStart={e => {
                 setPageY(e.targetTouches[0].clientY);
                 setEnableSwiping(false);
                 setStartY(e.targetTouches[0].clientY);
             }}
             onTouchMove={e => {
                 const content = imgContainer.current;
                 setPageY(e.targetTouches[0].clientY);
                 // console.log(e.targetTouches[0].clientY, pageY);

                 // if(productType?.products?.length == 1) {
                 //     return setEnableSwiping(true);
                 // }

                 if(content) {
                     const currentScrollTop = Math.ceil(content.scrollTop);
                     setIsAtTop(currentScrollTop == 0);
                     setIsAtBottom(content.scrollHeight - currentScrollTop === content.clientHeight || Math.abs((content.scrollHeight - currentScrollTop) -  (content.clientHeight)) == 1 );
                     lastScrollTop.current = currentScrollTop;
                     if(e.targetTouches[0].clientY < pageY) {

                         if (content.scrollHeight - currentScrollTop === content.clientHeight || Math.abs((content.scrollHeight - currentScrollTop) -  (content.clientHeight)) == 1 ) {
                             setScrollValue(e.targetTouches[0].clientY);
                             if(Math.abs(e.targetTouches[0].clientY - startY) > containerHeight / 3 && !transformed && array.length != index + 1) {
                                 setTransformValue(transformValue - containerHeight);
                                 setTransformed(true);
                                 // e.preventDefault();
                                 setActive(array[index + 1].id);
                             } else {
                                // setTransformValue(e.targetTouches[0].clientY - startY);
                                containerRef.current.style.transform = `translateY(${e.targetTouches[0].clientY - startY + transformValue}px)`
                             }
                         }

                         setIsScrollingDown(true);
                         setIsScrollingUP(false);
                     } else {
                         if (currentScrollTop == 0) {
                             if(Math.abs(e.targetTouches[0].clientY - startY) > containerHeight / 3 && !transformed && index != 0) {
                                setTransformValue(transformValue + containerHeight);
                                setTransformed(true);
                                setActive(array[index -1 ].id);
                             } else {
                                 containerRef.current.style.transform = `translateY(${transformValue + (e.targetTouches[0].clientY - startY)}px)`
                             }
                             // setTransformValue(transformValue + containerHeight > 0 ? 0 : transformValue + containerHeight)
                         }

                         setIsScrollingDown(false);
                         setIsScrollingUP(true);
                     }
                 }
                 setPageY(e.targetTouches[0].clientY);
             }}
            onTouchEnd={e => {
                setTransformed(false);
                containerRef.current.style.transform = `translateY(${transformValue}px)`;
            }}
        >
            {/*<InfiniteScroll*/}
            {/*    dataLength={productType?.products?.length}*/}
            {/*    pageStart={productType?.page}*/}
            {/*    getScrollParent={() => imgContainer.current}*/}
            {/*    loadMore={() => {*/}
            {/*        console.log('Triggered!', productType?.products?.length === 0 && productType?.page === 0);*/}
            {/*        if(productType?.products?.length === 0 && productType?.page === 0) return;*/}
            {/*        if(!moreLoading) return;*/}
            {/*        if(!productType?.more) return setMoreLoading(false);*/}
            {/*        if(loadingProductTypes) return;*/}
            {/*        const data = {*/}
            {/*            providerId: params.providerId,*/}
            {/*            categoryListIds: !curId ? null : [curId],*/}
            {/*            productTypeId: productType.id,*/}
            {/*            page: productType.page,*/}
            {/*            lan,*/}
            {/*            filter,*/}
            {/*            navigate*/}
            {/*        };*/}

            {/*        fetchProviderProductsTypes(data);*/}
            {/*    }}*/}
            {/*    hasMore={moreLoading}*/}
            {/*    loader={<Loader />}*/}
            {/*    useWindow={false}*/}

            {/*>*/}
                <div onScroll={e => {
                    console.log('Hello')
                }} className={'ProviderProductType__container'} style={{paddingBottom: '50px'}}>
                    {
                        productType?.products?.map((product, i) => (
                            <div className={'ProviderProductType__container--product'}>
                                <ProviderProduct takemeProviderToken={takemeProviderToken}  url={url} arrayRef={imgContainer} setGallery={setGallery}  providerOrNot={true} providerRef={providerRef} imgRef={imgRef} product={product} openGallery={openGallery} />
                                <hr />
                                <SocialsNew currentUser={currentUser} takemeUserToken={takemeUserToken} provider={provider} activeProduct={product} />
                                <hr className={'ProviderProductType__hr'} id={'ProviderProductType__hr'}/>
                            </div>
                        ))
                    }
                    {
                        loading && <div className={'ProductType__spinner'}>
                            <i className="fa-solid fa-circle-notch"></i>
                        </div>
                    }

                </div>
            {/*</InfiniteScroll>*/}
        </div>
    );
};

const mapStateToProps = state => ({
    loadingProductTypes: state.provider.loadingProductTypes,
    filter: state.categories.filter,
    lan: state.categories.lan,
    curId: state.provider.curId,
    galleryProduct: state.product.galleryProduct
});

export default connect(mapStateToProps, {fetchProviderProductsTypes}) (React.memo(ProviderProductType));