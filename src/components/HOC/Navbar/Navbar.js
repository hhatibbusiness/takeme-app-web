import React from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Search from "./Search/Search";
import Burger from "./Burger/Burger";
import Mid from "./Mid/Mid";
import BackBtn from "./BackBtn/BackBtn";

const Navbar = ({assets, setSidebar, backBtn, backUrl, midText}) => {
    return (
        <div className={'Navbar'}>
            <div className={'Navbar__container'}>
                <div className="Navbar__logo">
                    <img src={assets?.logoPath && assets.logoPath} alt="logo"/>
                </div>
                {
                    backBtn ? (
                        <>
                            <Mid midText={midText} />
                            <BackBtn />
                        </>
                    ) : (
                        <>
                            <Search />
                            <Burger setSidebar={setSidebar} />
                        </>
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (Navbar);