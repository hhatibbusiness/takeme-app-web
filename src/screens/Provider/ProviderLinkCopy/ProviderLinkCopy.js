import React, {useEffect, useState} from 'react';
import './ProviderLinkCopy.scss';
import history from '../../../history/history';
import {text} from "@fortawesome/fontawesome-svg-core";
import copy from 'copy-to-clipboard';

const ProviderLinkCopy = () => {
    const [icon, setIcon] = useState(<i className="fa-solid fa-link"></i>);
    useEffect(() => {
    }, []);

    const copyLink = () => {
        copy(window?.location?.href && window.location.href);
        setIcon(prevState => (
            <div className={'ProviderLinkCopy__container'}>
                <i className="fa-solid fa-clipboard-list"></i>
                <p><span><i className="fa-solid fa-caret-left"></i></span>link copied</p>
            </div>
        ));
        setTimeout(() => {
            setIcon(<i className="fa-solid fa-link"></i>)
        }, 1000);
    }
    return (
        <div onClick={copyLink} className={'ProviderLinkCopy'}>
            {
                icon
            }
        </div>
    );
};

export default ProviderLinkCopy;