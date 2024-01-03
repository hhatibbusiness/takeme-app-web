import React, {useEffect} from 'react';
import './DropDownListItem.css';
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import history from '../../../history/history';
import {Link} from 'react-scroll';

const DropDownListItem = ({result, term, setInputFocus, inputRef}) => {
    const {t} = useTranslation();

    const {hash} = useLocation();

    useEffect(() => {

    }, []);




    const renderName = () => {
        var innerHTML = result?.products[Object.keys(result?.products)[0]][0]?.name;
        var index = innerHTML.indexOf(term);
        if (index >= 0) {
            // innerHTML = <p onClick={() => setDetailed(!detailed)} className={'ProviderProduct__title'}>{innerHTML.substring(0,index)}<span class='highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            innerHTML = <p className={'DropDownListItem__header--text-text'}>{innerHTML.substring(0,index)}<span class='DropDownListItem__header--text-highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            return innerHTML;
        } else {
            return innerHTML;
        }
    }

    const getOffset = (parentPosition, elementPosition) => {
        if(parentPosition > 0) {
            return elementPosition + Math.abs(parentPosition) - 335;
        } else if(parentPosition < 0 && elementPosition > 0) {
            return elementPosition + Math.abs(parentPosition) ;
        }else if(parentPosition < 0 && elementPosition < 0) {
            console.log(Math.abs(parentPosition) + elementPosition)
            return Math.abs(parentPosition) + elementPosition;
        }
    }

    return (
        <div onClick={e => {
            e.stopPropagation()
            e.preventDefault();
            const element = document?.getElementById(result?.id);
            if(element) {
                const elementPosition = element.getBoundingClientRect().top;
                const parent = document.querySelector('.SearchScreen');
                const container = document.querySelector('.SearchScreen__container');
                const parentPosition = container.getBoundingClientRect().top;
                if(parent) {
                    console.log(elementPosition, element.getBoundingClientRect().top, parentPosition);
                    if(window) {
                        console.log('Heelo from the window');
                        setTimeout(() => {
                            parent.scrollTo(0, getOffset(parentPosition, elementPosition));
                        }, 10);
                    }
                }
            }
            setInputFocus(false);
            history.back();

        }} className={'DropDownListItem'}>
            <div className="DropDownListItem__images">
                <div className="DropDownListItem__images--product">
                    <img className={'DropDownListItem__images--product-img'} src={result?.products[Object.keys(result?.products)[0]][0]?.images[0]?.imagePath} alt=""/>
                    <div className="DropDownListItem__images--provider">
                        <img className={'DropDownListItem__images--provider-img'} src={result?.imagePath} alt=""/>
                    </div>
                </div>
            </div>
            <div className="DropDownListItem__container">
                <div className="DropDownListItem__header">
                    <h4 className="DropDownListItem__header--text">{renderName()}</h4>
                </div>
                <div className="DropDownListItem__prices">
                    {
                        result?.products[Object.keys(result?.products)[0]][0]?.saleDetails && (
                            <div className="DropDownListItem__prices--sale">
                                <p className="DropDownListItem__prices--sale-paragraph"><span className={'DropDownListItem__prices--sale-message'}>{t('salestartsfrom')}</span><span className={'Product__details--sale-starts'}>{result?.products[Object.keys(result?.products)[0]][0]?.saleDetails?.price}</span><span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span></p>
                            </div>
                        )
                    }
                    {
                        result?.products[Object.keys(result?.products)[0]][0]?.rentDetails && (
                            <div className="DropDownListItem__prices--sale">
                                <p className="DropDownListItem__prices--sale-paragraph"><span className={'DropDownListItem__prices--sale-message'}>{t('rentstartsfrom')}</span><span className={'Product__details--sale-starts'}>{result?.products[Object.keys(result?.products)[0]][0]?.rentDetails?.price}</span><span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span></p>
                            </div>
                        )
                    }
                </div>
                {
                    result?.products[Object.keys(result?.products)[0]][0]?.description?.text && (
                        <div className="DropDownListItem__desc">
                            <p>{result?.products[Object.keys(result?.products)[0]][0]?.description?.text.slice(0, 80)}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default DropDownListItem;