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
import ProviderProfile from "../../../screens/Product/Provider/ProviderProfile/ProviderProfile";
import phoneImage from "../../../assets/images/Phone.svg";
import whatsImage from "../../../assets/images/whatsapp.svg";
import locationImage from "../../../assets/images/location.svg";
import {changeCurrentProductTypeId} from "../../../store/actions/product.actions";
import {changeStoreCurrentItemType, fetchStoreItemTypes, fetchStoreItems} from "../../../store/actions/provider.actions";
import Install from "./Install/Install";
import NavbarTop from "./NavbarTop/NavbarTop";

const Navbar = ({data, store, currentParams, providerId, fetchingItems, showItemTypes, showMItemTypes, showSItemTypes, fetchingItemTypesStore, changeStoreCurrentItemType, curIdStore, more, page, fetchStoreItems, itemTypesStore, fetchStoreItemTypes, currentItemTypeId, showMCategories, showSCategories, curId, categoriesStore, loadingCategoriesStore, storeDetailsRef, personActive, loadingProvider, setPersonActive, personAva, takemeUserToken, eyeDis, currentUser, provider, searchActive, setSearchActive, backupFilters, setBackupFilters, topValue, setTopValue, setFixedNav, fixedNav, showSlider, setShowSlider, bodyContainerRef, showMidText, itemTypes, itemTypesPage, itemTypesMore, curItemTypeId, fetchItemTypes, changeCurItemTypeId, considerNav, fetchProductsMarket, fetchingItemTypes,  id, loadingCategories, categories, backBtn, showEye, searchShow, showIcons, assets, navShow, setNavShow, ui, filtersActive, setFiltersActive, navHeight, setNavHeight, switchMarketStore, searching, setSearching, sidebar, setSidebar}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [active, setActive] = useState(0);
    const [activeStore, setActiveStore] = useState(0);
    const [transformValue, setTransformValue] = useState(0);
    const [separatorActive, setSeparatorActive] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const navigate = useNavigate();
    const navRef=useRef()

    const navContainerExtracted = navRef?.current?.getBoundingClientRect().height;

    useEffect(() => {
        const navContainer = navRef?.current;
        if(navContainer) {
            setNavHeight(navContainer.getBoundingClientRect().height);
        }
    }, [navRef?.current?.getBoundingClientRect().height, showIcons, filtersActive, store, personActive, loadingProvider, loadingCategories, provider]);

    useEffect(() => {
        if(navRef?.current) {
            setNavHeight(navRef?.current?.getBoundingClientRect().height);
        }
    });

    return (
        <div ref={navRef} className={`NavbarWebsite`} style={{top: `${topValue}px`}}>
            <div ref={bodyContainerRef}>
                <NavbarTop
                    personActive={personActive}
                    filtersActive={filtersActive}
                    setSidebar={setSidebar}
                    currentParams={currentParams}
                    data={data}
                    searchShow={searchShow}
                    setSearching={setSearching}
                    setSeparatorActive={setSeparatorActive}
                    setEyeOpen={setEyeOpen}
                    setViewOpen={setViewOpen}
                    viewOpen={viewOpen}
                    navHeight={navHeight}
                    sidebar={sidebar}
                />
                {
                    showIcons &&
                        <div className="IconsBar__container">
                            <IconsBar currentParams={currentParams} switchMarketStore={switchMarketStore} personActive={personActive} setPersonActive={setPersonActive} pseronAva={personAva} separatorActive={separatorActive} searchActive={searchActive} eyeDis={eyeDis} backupFilter={backupFilters} setBackupFilters={setBackupFilters} showEye={showEye} filtersActive={filtersActive} setFiltersActive={setFiltersActive} eyeOpen={eyeOpen} setEyeOpen={setEyeOpen} viewOpen={viewOpen} setViewOpen={setViewOpen} />
                        </div>
                }
            </div>
                {/*<div className="Navbar__view--contianer">*/}
                {/*    {*/}
                {/*        viewOpen && (*/}
                {/*            <div className={'Navbar__view'}>*/}
                {/*                <div className="Navbar__view--triangle"></div>*/}
                {/*                <div className="Navbar__view--container">*/}
                {/*                    <div onClick={e => {*/}
                {/*                        switchMarketStore(false);*/}
                {/*                        setViewOpen(false)*/}
                {/*                    }} className="Navbar__view--house">*/}
                {/*                        {*/}
                {/*                            store ? (*/}
                {/*                                <img src={marketGray}/>*/}
                {/*                            ) : (*/}
                {/*                                <img src={marketGreen} alt=""/>*/}
                {/*                            )*/}
                {/*                        }*/}
                {/*                        <p style={{color: `${store ? '#D0D0D0' : "#03ac84"}`}}>عرض الحاجيات</p>*/}
                {/*                    </div>*/}
                {/*                    <div className={'Navbar__view--ver'}></div>*/}
                {/*                    <div onClick={e => {*/}
                {/*                        switchMarketStore(true);*/}
                {/*                        setViewOpen(false);*/}
                {/*                    }} className="Navbar__view--house">*/}
                {/*                        {*/}
                {/*                            store ? (*/}
                {/*                                <img src={storeGreen} />*/}
                {/*                            ) : (*/}
                {/*                                <img src={storeGray} alt=""/>*/}
                {/*                            )*/}
                {/*                        }*/}
                {/*                        <p style={{color: `${!store ? '#D0D0D0' : "#03ac84"}`}}>عرض المتاجر</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                /!*<div className={'Navbar__view--ver'}></div>*!/*/}
                {/*                /!*<div className="Navbar__view--house">*!/*/}
                {/*                /!*    <img src={mapGray} />*!/*/}
                {/*                /!*    <p>عرض الخريطة</p>*!/*/}
                {/*                /!*</div>*!/*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    }*/}
                {/*</div>*/}
                {/*{*/}
                {/*    true && (*/}
                {/*        <div ref={storeDetailsRef} className={`ProviderScreen__profile--container ${personActive ? '' : 'BodyContainer__wrapper--hidden'}`}>*/}
                {/*            {*/}
                {/*                !loadingProvider ? (*/}
                {/*                    <ProviderProfile currentUser={currentUser} takemeUserToken={takemeUserToken} prov={true} socials={false} link={false} provider={provider} />*/}
                {/*                ) : (*/}
                {/*                    <div className="StorePageShimmer__profile">*/}
                {/*                        <div className="StorePageShimmer__profile--avatar"></div>*/}
                {/*                        <div className="StorePageShimmer__profile--name"></div>*/}
                {/*                        <div className="StorePageShimmer__profile--count"></div>*/}
                {/*                        <div className="StorePageShimmer__profile--socials">*/}
                {/*                            <div className="StorePageShimmer__profile--image">*/}
                {/*                                <img src={phoneImage} alt=""/>*/}
                {/*                            </div>*/}
                {/*                            <div className="StorePageShimmer__profile--image">*/}
                {/*                                <img src={whatsImage} alt=""/>*/}
                {/*                            </div>*/}
                {/*                            <div className="StorePageShimmer__profile--image">*/}
                {/*                                <img src={locationImage} alt=""/>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                )*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*}*/}
                {/*{*/}
                {/*    <div ref={bodyContainerRef} className={`BodyContainer__wrapper ${(filtersActive) ? 'BodyContainer__wrapper--active' : 'BodyContainer__wrapper--hidden'}`} style={{top: `${navHeight}px`}}>*/}
                {/*        /!*{ true && <div ref={bodyContainerRef} className={`BodyContainer__wrapper ${isSticky ? 'sticky' : ''}`}>*!/*/}
                {/*        <div className={`BodyContianer__market ${!showMCategories || currentParams.storeId ? 'BodyContainer__wrapper--hidden' : ''}`}>*/}
                {/*            <Categories loadingCategories={loadingCategories} categories={categories} curId={id} home />*/}
                {/*        </div>*/}
                {/*        <div className={`BodyContainer__store ${(!showSCategories && !currentParams.storeId) ? 'BodyContainer__wrapper--hidden' : ''}`}>*/}
                {/*            <Categories providerId={providerId} loadingCategories={loadingCategoriesStore} categories={categoriesStore} provider={true} curId={curId} />*/}
                {/*        </div>*/}
                {/*        <div className="BodyContainer__seprator--margin"></div>*/}
                {/*        {*/}
                {/*            !store && (*/}
                {/*                <>*/}
                {/*                    <div className={`BodyContainer__market--types ${showMItemTypes ? '' : 'BodyContainer__wrapper--hidden'}`}>*/}
                {/*                        {*/}
                {/*                            showItemTypes && (*/}
                {/*                                // false ? (*/}
                {/*                                !fetchingItemTypes ? (*/}
                {/*                                    <ProductsTypesLabel changeCurItemTypeId={changeCurItemTypeId} fetchItems={fetchProductsMarket} curItemTypeId={curItemTypeId} fetchProviderProductsTypes={fetchItemTypes} market={true} more={itemTypesMore} curId={id} page={itemTypesPage} loadingProductTypes={fetchingItemTypes} active={active} setActive={setActive} productTypes={itemTypes} />*/}
                {/*                                ) : (*/}
                {/*                                    <ItemTypesShimmer />*/}
                {/*                                )*/}
                {/*                            )*/}
                {/*                        }*/}
                {/*                    </div>*/}

                {/*                    <div className={`BodyContainer__store--types ${showSItemTypes ? '' : 'BodyContainer__wrapper--hidden'}`}>*/}
                {/*                        {*/}
                {/*                            showItemTypes && (*/}
                {/*                                !fetchingItemTypesStore ? (*/}
                {/*                                    <ProductsTypesLabel providerId={providerId} changeCurItemTypeId={changeStoreCurrentItemType} fetchItems={fetchStoreItems} fetchProviderProductsTypes={fetchStoreItemTypes} market={false} more={more} transFormValue={transformValue} setTransformValue={setTransformValue} page={page} curId={curIdStore} loadingProductTypes={fetchingItemTypesStore} active={activeStore} setActive={setActiveStore} productTypes={itemTypesStore} />*/}
                {/*                                ) : (*/}
                {/*                                    <ItemTypesShimmer />*/}
                {/*                                )*/}
                {/*                            )*/}
                {/*                        }*/}
                {/*                    </div>*/}

                {/*                    <div className="BodyContainer__wrapper--seprator"></div>*/}
                {/*                    {*/}
                {/*                        showSlider && (*/}
                {/*                            <SliderComponent />*/}
                {/*                        )*/}
                {/*                    }*/}
                {/*                </>*/}
                {/*            )*/}
                {/*        }*/}
                {/*        /!*<div className="BodyContainer__wrapper--seprator"></div>*!/*/}
                {/*    </div>*/}
                {/*}*/}
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
    provider: state.provider.provider,
    currentUser: state.login.takemeUserData,
    takemeUserToken: state.login.takemeUserToken,
    loadingProvider: state.provider.loadingProvider,
    curId: state.provider.curId,
    loadingCategoriesStore: state.provider.loadingCategories,
    categoriesStore: state.provider.categories,
    currentItemTypeId: state.provider.currentItemTypeId,
    more: state.provider.more,
    page: state.provider.page,
    itemTypesStore: state.provider.itemTypes,
    curIdStore: state.provider.curId,
    fetchingItems: state.provider.fetchingItems,
    fetchingItemTypesStore: state.provider.fetchingItemTypes,
    showIcons: state.navbar.showIcons,
});

export default connect(mapStateToProps, {switchMarketStore, fetchStoreItemTypes, changeStoreCurrentItemType,  changeCurrentProductTypeId, changeCurItemTypeId, fetchStoreItems, fetchProductsMarket}) (Navbar);