import React, { useEffect, useState } from 'react';
import './Dots.css';
import DotsDropDown from '../DotsDropDown/DotsDropDown';

const Dots = ({ item, deleteFun, urls, isItem, deleting, deleteData }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='Dots'>
            <div onClick={e => setOpen(true)} className='Dots__container'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {
                open && <DotsDropDown deleteData={deleteData} urls={urls} isItem={isItem} deleting={deleting} deleteFun={deleteFun} open={open} setOpen={setOpen} item={item}  />
            }
            
            {
                open && <div onClick={e => setOpen(false)} className='DotsDropDown__backdrop'></div>
            }

        </div>
    )
}

export default Dots;