import React, {useEffect, useRef, useState} from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Search from "./Search/Search";
import Burger from "./Burger/Burger";
import Mid from "./Mid/Mid";
import BackBtn from "./BackBtn/BackBtn";
import {useLocation, useNavigate} from "react-router-dom";
import logo from '../../../assets/images/defaults/logo-default-image.svg';
import Img from "../../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import marketGray from '../../../assets/images/market-gray.svg';
import marketGreen from '../../../assets/images/market-green.svg';
import storeGray from '../../../assets/images/store-gray.svg';
import storeGreen from '../../../assets/images/store-green.svg';
import mapGray from '../../../assets/images/map-gray.svg';
import {switchMarketStore} from "../../../store/actions/categories.action";
import IconsBar from "./IconsBar/IconsBar";
import Categories from "../../../screens/Home/Body/BodyContainer/CategoriesBar/Categories";
import ProductsTypesLabel from "../../../screens/Provider/ProductsTypesLabel/ProductsTypesLabel";
import ItemTypesShimmer from "../../ItemTypesShimmer/ItemTypesShimmer";
import SliderComponent from "../../../screens/Home/Body/BodyContainer/ProductList/Slider/Slider";
import {fetchCategoryProducts, fetchItemTypes, changeCurItemTypeId, fetchCategories, fetchProductsMarket} from "../../../store/actions/categories.action";

const Navbar = ({data, store, backupFilters, setBackupFilters, topValue, setTopValue, setFixedNav, fixedNav, showSlider, setShowSlider, bodyContainerRef, showMidText, itemTypes, itemTypesPage, itemTypesMore, curItemTypeId, fetchItemTypes, changeCurItemTypeId, considerNav, fetchProductsMarket, fetchingItemTypes,  id, loadingCategories, categories, backBtn, showEye, searchShow, showIcons, assets, navShow, setNavShow, ui, filtersActive, setFiltersActive, navHeight, setNavHeight, switchMarketStore, searching, setSearching, sidebar, setSidebar}) => {
    const [inputFocus, setInputFocus] = useState(false);
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [viewOpen, setViewOpen] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false);
    const [separatorActive, setSeparatorActive] = useState(false);
    const [active, setActive] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const navRef=useRef()
    const imgRefDub = useRef(null);
    // const bodyContainerRef = useRef();

    useEffect(() => {
        if(viewOpen || filtersActive) {
            setSeparatorActive(true);
        } else {
            setSeparatorActive(false);
        }
    }, [viewOpen, filtersActive]);

    useEffect(() => {
        if(location.pathname.split('/').filter(item => item).length == 0) {
            setEyeOpen(true);
            console.log(location.pathname.replace(/\s+/g, '').split('/').length);
            console.log(location.pathname.split('/').filter(item => item));
        }else {
            setViewOpen(false);
            setEyeOpen(false);
        }
    }, [location]);

    const navContainerExtracted = navRef?.current?.getBoundingClientRect().height;

    useEffect(() => {
        const navContainer = navRef?.current;
        console.log('Hello from navBar!')
        if(navContainer) {
            setNavHeight(navContainer.getBoundingClientRect().height);
        }
    }, [navRef?.current?.getBoundingClientRect().height, showIcons, filtersActive, store]);

    return (
        <div ref={navRef} className={`Navbar`} style={{top: `${topValue}px`}}>
            <div className={'Navbar__container'}>
                <div onClick={() =>  navigate('/')} style={{cursor: `${data?.backBtn && 'pointer'}`}} className="Navbar__logo">
                    <Img logo={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(assets?.logoPath && assets.logoPath) || logo}/>
                </div>
                {
                    searchShow && <Search searching={searchShow} setSearching={setSearching} inputFocus={inputFocus} setInputFocus={setInputFocus} loadingSearchResults={data?.loadingSearchResults} searchResults={data?.searchResults} term={data?.term} search={data?.search} searchPage={data?.searchPage} />
                }
                {
                    showMidText && <Mid midText={data?.midText} />
                }
                {
                    backBtn ? (
                        <>
                            <BackBtn step={data?.step} setStep={data?.setStep} />
                        </>
                    ) : (
                        <>
                            <Burger setSidebar={setSidebar} />
                        </>
                    )
                }
                {
                    viewOpen && <div onClick={e => setViewOpen(false)} className={'Navbar__view--backdrop'}></div>
                }
            </div>
            {
                showIcons &&
                    <div className="IconsBar__container" style={{boxShadow: `${!separatorActive ? '0 1px 3px rgba(0, 0, 0, 0.15)' : '0 1px 3px #07ab83'}`}}>
                        <IconsBar backupFilter={backupFilters} setBackupFilters={setBackupFilters} showEye={showEye} filtersActive={filtersActive} setFiltersActive={setFiltersActive} eyeOpen={eyeOpen} setEyeOpen={setEyeOpen} viewOpen={viewOpen} setViewOpen={setViewOpen} />
                    </div>
            }
            <div className="Navbar__view--contianer">
                {
                    viewOpen && (
                        <div className={'Navbar__view'}>
                            <div className="Navbar__view--triangle"></div>
                            <div className="Navbar__view--container">
                                <div onClick={e => {
                                    switchMarketStore(false);
                                    setViewOpen(false)
                                }} className="Navbar__view--house">
                                    {
                                        store ? (
                                            <img src={marketGray}/>
                                        ) : (
                                            <img src={marketGreen} alt=""/>
                                        )
                                    }
                                    <p style={{color: `${store ? '#D0D0D0' : "#03ac84"}`}}>عرض الحاجيات</p>
                                </div>
                                <div className={'Navbar__view--ver'}></div>
                                <div onClick={e => {
                                    switchMarketStore(true);
                                    setViewOpen(false);
                                }} className="Navbar__view--house">
                                    {
                                        store ? (
                                            <img src={storeGreen} />
                                        ) : (
                                            <img src={storeGray} alt=""/>
                                        )
                                    }
                                    <p style={{color: `${!store ? '#D0D0D0' : "#03ac84"}`}}>عرض المتاجر</p>
                                </div>
                            </div>
                            {/*<div className={'Navbar__view--ver'}></div>*/}
                            {/*<div className="Navbar__view--house">*/}
                            {/*    <img src={mapGray} />*/}
                            {/*    <p>عرض الخريطة</p>*/}
                            {/*</div>*/}
                        </div>
                    )
                }
            </div>
            {
                <div ref={bodyContainerRef} className={`BodyContainer__wrapper ${(filtersActive) ? 'BodyContainer__wrapper--active' : 'BodyContainer__wrapper--hidden'}`} style={{top: `${navHeight}px`}}>
                    {/*{ true && <div ref={bodyContainerRef} className={`BodyContainer__wrapper ${isSticky ? 'sticky' : ''}`}>*/}
                    <Categories loadingCategories={loadingCategories} categories={categories} curId={id} home />
                    {
                        !store && showSlider && (
                            <>
                                {
                                    !fetchingItemTypes ? (
                                        <ProductsTypesLabel changeCurItemTypeId={changeCurItemTypeId} fetchItems={fetchProductsMarket} curItemTypeId={curItemTypeId} fetchProviderProductsTypes={fetchItemTypes} market={true} more={itemTypesMore} curId={id} page={itemTypesPage} loadingProductTypes={fetchingItemTypes} active={active} setActive={setActive} productTypes={itemTypes} />
                                    ) : (
                                        <ItemTypesShimmer />
                                    )
                                }
                                {
                                    showSlider && (
                                        <SliderComponent />
                                    )
                                }
                            </>
                        )
                    }
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    ui: state.ui,
    store: state.categories.store,
    data: state.ui.navbar,
    categories: state.categories.categories,
    loadingCategories: state.categories.loadingCategories,
    id: state.categories.curId,
    fetchingItemTypes: state.categories.fetchingItemTypes,
    curItemTypeId: state.categories.curItemTypeId,
    itemTypesMore: state.categories.itemTypesMore,
    itemTypesPage: state.categories.itemTypesPage,
    itemTypes: state.categories.itemTypes,

});

export default connect(mapStateToProps, {switchMarketStore, changeCurItemTypeId, fetchProductsMarket}) (Navbar);