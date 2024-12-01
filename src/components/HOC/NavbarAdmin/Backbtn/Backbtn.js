import React from 'react';
import backBtn from '../../../../assets/defaults/Back button.png';
import { useNavigate } from 'react-router-dom';

const Backbtn = () => {
    const navigate = useNavigate();
    return (
        <div onClick={e => {
            navigate(-1);
        }} className='Backbtn'>
            <img src={backBtn} />
        </div>
    );
}

export default Backbtn;