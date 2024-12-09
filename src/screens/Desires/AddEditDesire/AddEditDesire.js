import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useNavbarContext} from "../../context/navbar.context";
import "./Desire.style.css";
import { addDesire, EditDesire, getDesireWithNeeds } from '../../modals/manageDesires';
import { useAlertContext } from "../../context/alerts.context";
import ImageLoader from "../../utilty/ImageLoader";
import PopUp from "../../components/PopUp/PopUp";
import CircleImageLabel from "../../components/CircleImageLabel/CircleImageLabel";
import DesireNameInput from './DesiresController/DesireNameInput'
import DesireDescriptionText from './DesiresController/DesireDescriptionText'
import Shimmer from './shimmer/shimmer'


export default function AddEditDesire( { mode } ) {
    const navigate = useNavigate()
    const { id } = useParams();
    const { alerts, addAlert } = useAlertContext();
    const { changeSearchActive } = useNavbarContext();
    const [desireData, setDesireData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [itemNeedsData, setItemNeedsData] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [namevalid, setNameValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [desireName, setDesireName] = useState('');
    const [desireDescription, setDesireDescription] = useState('');
    
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        changeSearchActive(false);
        return () => {
            changeSearchActive(true);
        }
    }, []);


    //// Fetch desire Element data if in edit or duplicate mode
    useEffect(() => {
        if (mode === "edit" || mode === 'duplicate') {
            const fetchItem = async () => {
                setIsLoading(true);
                const data = await getDesireWithNeeds({ id });
                setDesireData(data);
                setIsLoading(false);
            };
            fetchItem();
        }
    }, [mode, id]);


    const onNameChange = (value) => {
        setDesireName(value);
    }
    const onDescriptionChange = (value) => {
        setDesireDescription(value);
    }

    useEffect(() => {
        if(!isLoading){
            setItemNeedsData(desireData?.productTypeCategories || []);
        }
    }, [isLoading]);

    /// Handle the Local Data Changes
    const handleLocalData = (data) => {
        if (mode === 'edit') {
            const storedDesires = JSON.parse(sessionStorage.getItem('desires')) || [];
            const updatedDesires = storedDesires.map(desire => 
                desire.id === data.id ? { ...desire, ...data } : desire
            );
            sessionStorage.setItem('desires', JSON.stringify(updatedDesires));
        } else {
            const storedDesires = JSON.parse(sessionStorage.getItem('desires')) || [];
            storedDesires.unshift(data);
            sessionStorage.setItem('desires', JSON.stringify(storedDesires));
        }
    };

    /// Handle the Response from the API
    const handleResponse = (response) => {
        if (response?.status) {
            handleLocalData(response.output);
            navigate(-1)
        } else {
            const alertData = {
                alertType: 'danger',
                msg: response?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };
            addAlert(alertData);
        }
    }
    
    /// Handle the Save Button Click
    const handleSave = async() => {
        setSubmitted(true);
        if (namevalid && descriptionValid) {

            const needs = itemNeedsData.map((need) => need.id);
            if(mode === 'edit'){
                const response = await EditDesire({ id: desireData.productType.id, 
                                                    name: desireName,
                                                    description: desireDescription,
                                                    needs: needs, 
                                                    imagePath: null, 
                                                    sortIndex: desireData.productType.sortIndex })
                handleResponse(response);
            } else {
                const response = await addDesire({ name:desireName, 
                                                    description: desireDescription, 
                                                    needs: needs, 
                                                    imagePath: "", 
                                                    sortIndex: 0 })
                handleResponse(response);
            }
    }}

    return (
        <div className={`AddDesireBody ${isOpen? 'no-scroll': ''}`}>
            <div dir='rtl' className="add-desire-container">
                
                {isLoading ? 
                    <Shimmer />
                :
                <>
                    {/**Name Input */}
                    <DesireNameInput defaultValue={desireData?.productType?.name}  submitted={submitted} setValid={setNameValid} onValueChange={onNameChange}/>

                    {/** Description Input */}
                    <DesireDescriptionText defaultValue={desireData?.productType?.description} submitted={submitted} setValid={setDescriptionValid} onValueChange={onDescriptionChange}/>
                </>
                }

                {/***** Add Needs *****/}
                <div dir='rtl' className="add-needs">
                    <div className="needs-title">
                        <p style={{margin: '0 5px'}}>الحاجيات</p>
                        <button className="needs-button" onClick={()=> setIsOpen(!isOpen)}>
                            <ImageLoader src='plus.png' height='100%'/>
                        </button>
                    </div>
                    
                    <div className="needs-list">
                        {itemNeedsData.length ? 
                            itemNeedsData.map((need) => (
                                <CircleImageLabel key={need.id} need={need} />
                            ))
                        : <p className="noNeeds-label">لا يوجد حاجيات</p>
                        }
                    </div>
                </div>

                {/* Save Or Cancel */}
                <div dir="rtl" className="save-cancel-container"> 
                    <button className="save-cancel-button save" onClick={handleSave}>حفظ</button>
                    <button className="save-cancel-button cancel" onClick={()=> navigate(-1)}>الغاء</button>                        
                </div>
            </div>

            {isOpen && 
                <PopUp  
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen} 
                    itemNeedsData={itemNeedsData} 
                    setItemNeedsData={setItemNeedsData}
                />}
        </div>
    );
}