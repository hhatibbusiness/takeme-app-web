import React, {useState} from 'react';
import './StoreItem.css';
import StoreRightView from "./StoreRightView/StoreRightView";
import StoreMiddleView from "./StoreMiddleView/StoreMiddleView";
import StoreLeftView from "./StoreLeftView/StoreLeftView";

const StoreItem = ({ store }) => {
    const [popup, setPopup] = useState(false);

    return (
        <div className={'StoreItem'}>
            <StoreRightView popup={popup} setPopup={setPopup} store={store} />
            <StoreMiddleView />
            <StoreLeftView store={store} />
            {
                popup && <div onClick={e => {
                    setPopup(false);
                }} className={'StoreItem__backdrop'}>

                </div>
            }
        </div>
    );
};

export default StoreItem;