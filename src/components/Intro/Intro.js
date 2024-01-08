import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import './Intro.scss';
import logoImage from '../../assets/logo.jpg';

const Intro = ({assets}) => {
    useEffect(() => {
        window.scroll(0, 1);
    }, []);
    return (
        <div className={'Intro'}>
            <img className={'Intro__logo'} src={logoImage && logoImage} />
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
});

export default connect(mapStateToProps) (Intro);