import React, {useEffect, useState} from 'react';
import './ProviderLinkCopy.scss';
import history from '../../../history/history';
import {text} from "@fortawesome/fontawesome-svg-core";
import copy from 'copy-to-clipboard';

const ProviderLinkCopy = () => {
    const [icon, setIcon] = useState(<i className="fa-solid fa-link"></i>);
    useEffect(() => {
        console.log(history.location.pathname);
    }, []);

    const copyLink = () => {
        console.log(window?.location?.href && window.location.href);
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
        // document?.execCommand(window?.location?.href && window.location.href);
        // document.execCommand(window?.location?.href);
        // <CopyToClipboard
        //     text={window?.location?.herf && window?.location?.href}
        //     onCopy={() => {
        //         setIcon(prevState => (
        //             <div className={'ProviderLinkCopy__container'}>
        //                 <i className="fa-solid fa-clipboard-list"></i>
        //                 <p><span><i className="fa-solid fa-caret-left"></i></span>link copied</p>
        //             </div>
        //         ));
        //         setTimeout(() => {
        //             setIcon(<i className="fa-solid fa-link"></i>)
        //         }, 1000);
        //
        //     }}
        // />
        // navigator?.clipboard?.writeText(window?.location?.href && window.location.href).then(res => {
        //     setIcon(prevState => (
        //         <div className={'ProviderLinkCopy__container'}>
        //             <i className="fa-solid fa-clipboard-list"></i>
        //             <p><span><i className="fa-solid fa-caret-left"></i></span>link copied</p>
        //         </div>
        //     ));
        //     setTimeout(() => {
        //         setIcon(<i className="fa-solid fa-link"></i>)
        //     }, 1000);
        // }).catch(err => {
        //     console.log('not secured!');
        // })
    }
    return (
        <div onClick={copyLink} className={'ProviderLinkCopy'}>
            {
                icon
            }
            {/*<CopyToClipboard*/}
            {/*    text={window?.location?.herf && window?.location?.href}*/}
            {/*    onCopy={(text) => {*/}
            {/*        console.log(window?.location?.herf && window?.location?.href);*/}
            {/*        setIcon(prevState => (*/}
            {/*            <div className={'ProviderLinkCopy__container'}>*/}
            {/*                <i className="fa-solid fa-clipboard-list"></i>*/}
            {/*                <p><span><i className="fa-solid fa-caret-left"></i></span>link copied</p>*/}
            {/*            </div>*/}
            {/*        ));*/}
            {/*        setTimeout(() => {*/}
            {/*            setIcon(<i className="fa-solid fa-link"></i>)*/}
            {/*        }, 1000);*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {*/}
            {/*        icon*/}
            {/*    }*/}
            {/*</CopyToClipboard>*/}
        </div>
    );
};

export default ProviderLinkCopy;