import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import './Intro.scss';
import logoImage from '../../assets/logo.png';

const Intro = ({assets}) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    const checkKeyboardStatus = () => {
        const focusedElement = document.activeElement;
        const isInteractiveElement =
            focusedElement.tagName === 'INPUT' ||
            focusedElement.tagName === 'TEXTAREA' ||
            focusedElement.isContentEditable;

        setIsKeyboardOpen(isInteractiveElement);
        console.log('Is keyboard open?', isInteractiveElement);
    };

    useEffect(() => {
        // Attach event listeners when the component mounts
        document.addEventListener('focusin', checkKeyboardStatus);
        document.addEventListener('focusout', checkKeyboardStatus);

        // Detach event listeners when the component unmounts
        return () => {
            document.removeEventListener('focusin', checkKeyboardStatus);
            document.removeEventListener('focusout', checkKeyboardStatus);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    useEffect(() => {
        const mainContent = document.querySelector('body');
        mainContent.style.height = `${window.innerHeight}px`;

    }, [isKeyboardOpen]);

    return (
        <div className={'Intro'}>
            <div className="Intro__container">
                <img className={'Intro__logo'} src={logoImage && logoImage} />
                {/*<p>for your needs</p>*/}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
});

export default connect(mapStateToProps) (Intro);