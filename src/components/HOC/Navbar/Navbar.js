import React from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Search from "./Search/Search";
import Burger from "./Burger/Burger";

const Navbar = ({assets, setSidebar}) => {
    return (
        <div className={'Navbar'}>
            <div className={'Navbar__container'}>
                <div className="Navbar__logo">
                    <img src={assets.logoPath} alt="logo"/>
                </div>
                <Search />
                <Burger setSidebar={setSidebar} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (Navbar);