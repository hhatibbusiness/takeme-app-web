import React from 'react';
import './Sidebar.scss';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const Sidebar = ({assets, sidebar, setSidebar}) => {
    return (
        <div className={`Sidebar ${sidebar && 'Sidebar__active'}`}>
            <div className="Sidebar__container">
                <div className="Sidebar__logo">
                    <img src={assets.logoPath} />
                </div>
                <div className="Sidebar__links">
                    <Link to={'#'} className="Sidebar__link">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <p>من نحن؟</p>
                    </Link>
                    <div className="Sidebar__link">
                        <i className="fa-solid fa-globe"></i>
                        <p style={{direction: 'rtl'}}>اللغة-English</p>

                    </div>
                    <Link to={'#'} className="Sidebar__link">
                        <i className="fa-regular fa-images"></i>
                        <p>فلتر</p>
                    </Link>
                    <Link to={'#'} className="Sidebar__link">
                        <i className="fa-solid fa-handshake"></i>
                        <p>انضم كصاحب منتج أو خدمة</p>
                    </Link>
                    <Link to={'#'} className="Sidebar__link">
                        <i className="fa-regular fa-copyright"></i>
                        <p>العقد و شروط الاستخدام</p>
                    </Link>
                    <Link className={'Sidebar__link Sidebar__register'} to={'#'}>تسجيل الدخول</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (Sidebar);