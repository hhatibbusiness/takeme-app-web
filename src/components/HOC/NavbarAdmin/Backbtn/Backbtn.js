import React from 'react';
import backBtn from '../../../../assets/defaults/Back button.png';
import { useNavigate } from 'react-router-dom';

const Backbtn = ({backURL}) => {
    const navigate = useNavigate();
    return (
        <div onClick={e => {
            //This icon should direct you to the main page, don't change this before you ask hussein.
            navigate('/');
            // navigate(backURL);
        }} className='Backbtn'>
            <img src={backBtn} />
        </div>
    );
}

export default Backbtn;