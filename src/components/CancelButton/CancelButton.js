import React from 'react';
import './CancelButton.css';

const CancelButton = ({handleCancelClick}) => {
    return (
        <div onClick={e => handleCancelClick(e)} className='CancelButton'>
            <p>الغاء</p>
        </div>
    )
}

export default CancelButton;