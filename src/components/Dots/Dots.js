import React, { useEffect, useState } from 'react';
import './Dots.css';
import DotsDropDown from '../DotsDropDown/DotsDropDown';

const Dots = ({ item, deleteFun, urls, isItem, deleting, deleteData, noUpdate, noDuplicate }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className='Dots'>
            <div id={'Dots__dots'} onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setOpen(true)
            }} className='Dots__container'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {
                open && <DotsDropDown noUpdate={noUpdate} noDuplicate={noDuplicate} deleteData={deleteData} urls={urls} isItem={isItem} deleting={deleting} deleteFun={deleteFun} open={open} setOpen={setOpen} item={item}  />
            }
            
            {
                open && <div onClick={e => setOpen(false)} className='DotsDropDown__backdrop'></div>
            }

        </div>
    )
}

export default Dots;