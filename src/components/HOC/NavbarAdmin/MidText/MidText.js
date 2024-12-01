import React, { useContext } from 'react';
import './MidText.css';
import { useNavbarContext } from '../../../../context/navbar.context';

const MidText = ({ midText }) => {
    const { state } = useNavbarContext();
    return (
        <div className='MidText'>
            {
                state.MidText
            }
        </div>
    );
}

export default MidText;