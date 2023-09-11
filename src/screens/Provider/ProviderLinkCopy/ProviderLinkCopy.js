import React, {useEffect, useState} from 'react';
import './ProviderLinkCopy.scss';
import history from '../../../history/history';

const ProviderLinkCopy = () => {
    const [icon, setIcon] = useState(<i className="fa-solid fa-link"></i>);
    useEffect(() => {
        console.log(history.location.pathname);
    }, []);

    const copyLink = () => {
        console.log(window?.location?.href && window.location.href);
        // document.execCommand(window?.location?.href);
        navigator?.clipboard?.writeText(window?.location?.href && window.location.href).then(res => {
            setIcon(prevState => (
                <div className={'ProviderLinkCopy__container'}>
                    <i className="fa-solid fa-clipboard-list"></i>
                    <p><span><i className="fa-solid fa-caret-left"></i></span>link copied</p>
                </div>
            ));
            setTimeout(() => {
                setIcon(<i className="fa-solid fa-link"></i>)
            }, 1000);
        }).catch(err => {
            console.log('not secured!');
        })
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