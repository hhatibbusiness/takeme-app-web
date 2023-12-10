import React from 'react';
import './Burger.scss';

const Burger = ({setSidebar}) => {
    return (
        <div role={'burger'} onClick={() => setSidebar(true)} className={'Burger'}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Burger;