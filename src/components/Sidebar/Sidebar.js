import React from 'react';
import './Sidebar.scss';
import {connect} from "react-redux";

const Sidebar = ({assets, sidebar, setSidebar}) => {
    return (
        <div className={`Sidebar ${sidebar && 'Sidebar__active'}`}>
            <div className="Sidebar__container">
                <div className="Sidebar__logo">
                    <img src={assets.logoPath} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (Sidebar);