import React, {useEffect, useState} from 'react';
import {fetchCategories} from "../../../store/actions/categories.action";
import {connect} from "react-redux";
import SpinnerComponent from "../../../components/Spinner/Spinner.Component";
import BodyContainerComponent from "./BodyContainer/Body.Container.Component";
import Navbar from "../../../components/HOC/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Backdrop from "../../../components/Backdrop/Backdrop";
import Footer from "./Footer/Footer";
import CategoryError from "../../../components/CategoryError/CategoryError";
import './Body.scss'
import {Outlet} from "react-router-dom";
import BodySub from "./BodyContainer/BodySub/BodySub";
import SearchScreen from "../../SearchScreen/SearchScreen";
import {closePopup} from "../../../store/actions/ui.actions";
import {KeepAlive} from "react-activation";

const Body = ({ fetchCategories, loadingCategories, lan, page, openPopup, closePopup}) => {
    const [sidebar, setSidebar] = useState(false);

    return (
            <div className={'Body'}>
                {
                    loadingCategories ? (
                        <SpinnerComponent />
                    ) : <CategoryError>
                        {/*<KeepAlive cacheKey={'home-navbar'}>*/}
                            <Navbar search={true} searchPage={false} setSidebar={setSidebar} />
                        {/*</KeepAlive>*/}
                        {/*<KeepAlive cacheKey={'sidebar'}>*/}
                            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                        {/*</KeepAlive>*/}
                        <Backdrop sidebar={sidebar} setSidebar={setSidebar} />
                        <BodyContainerComponent />
                        {/*<Footer />*/}
                        <Outlet />
                    </CategoryError>
                }
            </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories,
    categoryError: state.categories.categoryError,
    lan: state.categories.lan,
    page: state.categories.page,
    openPopup: state.ui.openPopup
})

export default connect(mapStateToProps, {fetchCategories, closePopup}) (Body);