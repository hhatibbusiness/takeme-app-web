import React from 'react';
import backBtn from '../../../../assets/defaults/Back button.png';
import { useNavigate } from 'react-router-dom';

const Backbtn = ({backURL}) => {
    const navigate = useNavigate();
    return (
        <div onClick={e => {
            navigate(backURL);
        }} className='Backbtn'>
            <img src={backBtn} />
        </div>
    );
}

export default Backbtn;