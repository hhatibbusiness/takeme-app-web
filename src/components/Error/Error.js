import React from 'react';
import './Error.css';
import ErrorImage from '../../assets/images/profile/ErrorImage.png';
import reloadButton from '../../assets/images/profile/reloadButton.png';

export default function Error() {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className='ErrorContainer'>
            <div className='ErrorImage__main'>
                <img src={ErrorImage} alt='ErrorImage' />
            </div>
            <div className='ErrorText__main'>
                <div className='TEXT_LINE'>نعتذر منك، يوجد العديد من الطلبات على السيرفر حالياً</div>
                <div className='TEXT_LINE'><u>تواصل مع تيكمي</u> او جرب لاحقا</div>
            </div>
            <div className='TryAgain_Button'>
                <div className='TryAgain_Button__button' onClick={handleReload}>
                    <div className='TryAgain_Button__button__text'>حاول مجددا</div>
                    <img src={reloadButton} alt='ErrorImage' className='TryAgain_Button__img'/>
                </div>
            </div>
        </div>
    );
}