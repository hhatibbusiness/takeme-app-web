import React, {useEffect, useRef, useState} from 'react';
import './ItemDesc.css';
import itemImage from '../../../../../../../assets/images/items/item.png';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {changePopupProduct, openPopup, changeDestination} from "../../../../../../../store/actions/ui.actions";
import {connect} from "react-redux";

const ItemDesc = ({item, value, changePopupProduct, changeDestination, openPopup, setCurrentProduct}) => {
    const [charCount, setCharCount] = useState(0);
    const productRef = useRef();
    const descRef = useRef();
    const [more, setMore] = useState(false);
    const navigate = useNavigate();

    const {t} = useTranslation();

    const checkLineCount = (ele) => {
        const productWidth = productRef?.current?.getBoundingClientRect().width - 80;
        const lines = 2.5;
        const charWidth = 6;
        const descLength = (productWidth * lines) / (charWidth);

        if(descLength < item?.description?.text?.length) {
            setMore(true);
            console.log(descLength);
            setCharCount(Math.floor(descLength));
        }else {
            console.log(descLength)
            setMore(false);
            setCharCount(item?.description?.length);
        }
    }


    const formateMinDuration = (duration, unit) => {
        switch (unit) {
            case "Days":
                if(duration == 0) return;
                if(duration == 1) return t("rentDurationDay");
                if(duration == 2) return t("twoDays");
                if(duration > 10) return `${duration}${t("rentDurationDay")}`;
                else return `${duration}${t("multipleDays")}`;
                break;
            case "Hours":
                if(duration == 0) return;
                if(duration == 1) return t("rentDurationHour");
                if(duration == 2) return t("twoHours");
                if(duration > 10) return `${duration} ${t("rentDurationHour")}`;
                else return `${duration} ${t("MultipleHours")}`;
                break;
        }
    }

    useEffect(() => {
        const ele = descRef?.current;
        if(ele && productRef?.current) {
            const resizeEvent = window.addEventListener('resize', (e) => {
                checkLineCount(ele);
            })
        }
    }, [descRef, productRef]);

    useEffect(() => {
        const ele = descRef?.current;
        if(ele && productRef?.current) {
            checkLineCount(ele);
        }
    }, [descRef, productRef]);

    return (
        <div ref={productRef} className={`ItemDesc ${value < 100 && 'Item__disappear'}`}>
            <div className="ItemDesc__name">
                <img src={itemImage} alt=""/>
                <p>{item?.name}</p>
            </div>
            {
                item?.saleDetails && (
                    <div className="ItemDesc__pricing">
                        <span className={'ItemDesc__pricing--label'}>{t("priceSale")}</span>
                        <span className={'ItemDesc__pricing--value'}>{item?.saleDetails?.price}</span>
                        <span><i className="fa-solid fa-shekel-sign"></i></span>
                    </div>
                )
            }
            {
                item?.rentDetails && (
                    <div className={'ItemDesc__rent'}>
                        <span className={'ItemDesc__rent--label'}>{t("rentPrice")}</span>
                        <span className="ItemDesc__rent--value">{item?.rentDetails?.price}</span>
                        <span><i className="fa-solid fa-shekel-sign"></i></span>
                        <span className="ItemDesc__rent--dur">(
                            <span>{t("minRentTimeMessage")}</span>
                            <span>{formateMinDuration(item?.rentDetails?.minTimForRent, item?.rentDetails?.rentUnit)}</span>)
                        </span>
                    </div>
                )
            }
            {
                item?.description?.text && (
                    <div ref={descRef} className={'ItemDesc__desc'}>
                        <p>{item?.description?.text?.slice(0, charCount)}<span>{more && "..."}</span><span onClick={e => {
                            changePopupProduct(item);
                            openPopup();
                            changeDestination();
                            navigate(`${window?.location?.hash.replace('#', '')}/product/popup/${item?.id}`);
                        }} style={{color: "#D9D9D9", fontSize: "12px", cursor: "pointer"}}>{more && t("more")}</span></p>
                    </div>
                )
            }
        </div>
    );
};

export default connect(null, {changeDestination, changePopupProduct, openPopup}) (ItemDesc);