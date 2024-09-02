import React, {useEffect, useRef} from 'react';
import './Item.css';
import ItemProfile from "./ItemProfile/ItemProfile";
import ItemLocation from "./ItemLocation/ItemLocation";
import ItemImage from "./ItemImage/ItemImage";
import ItemDesc from "./ItemDesc/ItemDesc";
import ItemSocial from "./ItemSocial/ItemSocial";
import SocialsNew from "../../../../../Product/Provider/SocialsNew/SocialsNew";

const Item = ({item, value, store, setCurrentProduct}) => {
    const itemRef = useRef();

    const syncHeight = () => {
        const itemEle = itemRef?.current;
        if(value < 100) {
            itemEle.style.height = `${itemEle.getBoundingClientRect().width}px`;
        } else {
            itemEle.style.height = 'auto';
        }
    }

    useEffect(() => {
        const itemEle = itemRef?.current
        if(itemEle) {
            syncHeight();
        }

        return () => {
            console.log('Hello from the sync height function');
        }
    }, [value, itemRef?.current]);
    return (
        <div ref={itemRef} className={'Item'} style={{marginBottom: `${value == 100 ? '10px' : '0px'}`}}>
            {
                !store && (
                    <div className={`Item__top ${value < 100 && 'Item__disappear'}`}>
                        <ItemProfile item={item} />
                        <ItemLocation item={item} />
                    </div>
                )
            }
            <div className="Item__middle">
                <ItemImage value={value} item={item} />
                <ItemDesc value={value} setCurrentProduct={setCurrentProduct} item={item} />
            </div>
            <div className={`Item__separator ${value < 100 && 'Item__disappear'}`}></div>
            <div className={`Item__bottom ${value < 100 && 'Item__disappear'}`}>
                <SocialsNew right={false} activeProduct={item} provider={item?.storeDetails}/>
            </div>
        </div>
    );
};

export default Item;