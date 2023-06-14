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
const Body = ({ fetchCategories, loadingCategories, categoryError, lan}) => {
    const [sidebar, setSidebar] = useState(false);

    useEffect(() => {
        fetchCategories(lan);
    }, []);
    return (
        <div className={'Body'}>
            {
                loadingCategories ? (
                    <SpinnerComponent />
                ) : <CategoryError>
                    <Navbar setSidebar={setSidebar} />
                    <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                    <Backdrop sidebar={sidebar} setSidebar={setSidebar} />
                    <BodyContainerComponent />
                    <Footer />
                </CategoryError>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    loadingCategories: state.categories.loadingCategories,
    categoryError: state.categories.categoryError,
    lan: state.categories.lan
})

export default connect(mapStateToProps, {fetchCategories}) (Body);