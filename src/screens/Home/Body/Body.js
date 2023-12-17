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

const Body = ({ fetchCategories, loadingCategories, lan, page, openPopup, closePopup}) => {
    const [sidebar, setSidebar] = useState(false);

    return (
        <div className={'Body'}>
            {
                loadingCategories ? (
                    <SpinnerComponent />
                ) : <CategoryError>
                    <Navbar search setSidebar={setSidebar} />
                    <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
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