import React, {useEffect, useRef, useState} from 'react';
import {connect} from "react-redux";
import './Intro.scss';
import logoImage from '../../assets/logo.jpg';

const Intro = ({assets}) => {
    const introRef = useRef();
    useEffect(() => {
        if(introRef.current) {
            introRef.current.style.height = `${window.innerHeight}px`;
        }
    }, []);

    return (
        <div ref={introRef} className={'Intro'}>
            <img className={'Intro__logo'} src={logoImage && logoImage} />
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
});

export default connect(mapStateToProps) (Intro);