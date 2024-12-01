import React, { useEffect } from 'react';
import './DotsDropDown.css';
import { useNavigate } from 'react-router-dom';
import SpinnerSmall from '../SpinnerSmall/SpinnerSmall';
import { useLanguagesContext } from '../../context/languages.context';


const DotsDropDown = ({ urls, deleteData, isItem, sortType, changeSort, setOpen, deleteFun, deleting, sort, searchKey }) => {
    const navigate = useNavigate();

    return (
        <div className={`DotsDropDown ${sort ? 'DotsDropDown__sort' : ''}`}>
            <div className='DotsDropDown__container'>
                {
                    isItem && (
                        <>             
                            <div onClick={e => {
                                navigate(urls.editUrl);
                                setOpen(false)
                            }} className='DotsDropDown__element'>
                                <span>تعديل</span>
                            </div>
                            <div className='DotsDropDown__separator'></div>
                            {/* <div className='DotsDropDown__element'>
                                <span>نقل</span>
                            </div>
                            <div className='DotsDropDown__separator'></div> */}
                            <div onClick={e => {
                                navigate(urls.addUrl);
                                setOpen(false);
                            }} className='DotsDropDown__element'>
                                <span>تكرار</span>
                            </div>
                            <div className='DotsDropDown__separator'></div>
                            <div onClick={async e => {
                                await deleteFun(deleteData);
                                setOpen(false);
                            }} className='DotsDropDown__element DotsDropDown__delete'>
                                {
                                    deleting ? (
                                        <SpinnerSmall />
                                    ) : <span>حذف</span>
                                }
                            </div>
                        </>
                    )
                }
                {
                    sort && (
                        <>
                            <div onClick={e => {
                                const data = {
                                    sortType: 'ASCENDING',
                                    searchKey: searchKey
                                }
                                changeSort(data);
                                setOpen(false)
                            }} className={`DotsDropDown__element ${sortType == 'ASCENDING' ? 'SotsDropDown__element--active' : ''}`}>
                                <span>تصاعدي</span>
                            </div>
                            <div className='DotsDropDown__separator'></div>
                            <div onClick={e => {
                                const data = {
                                    sortType: 'DESCENDING',
                                    searchKey: searchKey

                                }
                                console.log(searchKey);
                                
                                changeSort(data);
                                setOpen(false)
                            }} className={`DotsDropDown__element ${sortType == 'DESCENDING' ? 'SotsDropDown__element--active' : ''}`}>
                                <span>تنازلي</span>
                            </div>
                            <div className='DotsDropDown__separator'></div>
                            <div onClick={e => {
                                const data = {
                                    sortType: 'NEWEST',
                                    searchKey: searchKey
                                }
                                changeSort(data);
                                setOpen(false)
                            }} className={`DotsDropDown__element ${sortType == 'NEWEST' ? 'SotsDropDown__element--active' : ''}`}>
                                <span>الاحدث</span>
                            </div>

                        </>
                    )
                }
            </div>
        </div>
    )
}

export default DotsDropDown;