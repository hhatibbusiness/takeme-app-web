import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Place.style.css";

import { useNavbarContext } from "../../../context/navbar.context";
import { addPlace, EditPlace } from '../model/managePlaces.js';
import { useAlertContext } from "../../../context/alerts.context";
import DesireNameInput from './PlaceController/PlacesInput'
import DesireDescriptionText from './PlaceController/PlacesCommentText'
import MyComponent from './PlaceController/SelectLocalePop'
import PlaceType from './PlaceController/PlaceType/PlaceType.js'


export default function AddEditPlace( { mode, setBackBtn, setAdmin } ) {
    const navigate = useNavigate()
    const { id } = useParams();
    const { addAlert } = useAlertContext();
    const { changeSearchActive } = useNavbarContext();
    const [PlaceData, setPlaceData] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [namevalid, setNameValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [desireName, setDesireName] = useState('');
    const [desireDescription, setDesireDescription] = useState('');
    const [placeType, setPlaceType] = useState('');

    /// Set up the initial state of the page
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        changeSearchActive(false);
        setBackBtn(true);
        setAdmin(true);
        return () => {
            changeSearchActive(true);
            setBackBtn(false);
            setAdmin(false);
        }
        // eslint-disable-next-line
    }, []);

    const handlePlaceTypeChange = (value) => {
        setPlaceType(value);
    };

    const onNameChange = (value) => {
        setDesireName(value);
    }
    const onDescriptionChange = (value) => {
        setDesireDescription(value);
    }

    /// Handle the Local Data Changes
    const handleLocalData = (data) => {
        if (mode === 'edit') {
            const storedDesires = JSON.parse(sessionStorage.getItem('desires')) || [];
            const updatedDesires = storedDesires.map(desire => 
                desire.id === data.id ? { ...desire, ...data } : desire
            );
            sessionStorage.setItem('palces', JSON.stringify(updatedDesires));
        } else {
            const storedDesires = JSON.parse(sessionStorage.getItem('desires')) || [];
            storedDesires.unshift(data);
            sessionStorage.setItem('places', JSON.stringify(storedDesires));
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

            if(mode === 'edit'){
                const response = await EditPlace({ })
                handleResponse(response);
            } else {
                const response = await addPlace({ })
                handleResponse(response);
            }
    }}

    return (
        <div className='AddDesireBody' style={{paddingTop: 65}}>
            <div dir='rtl' className="add-place-container">
                {/**Name Input */}
                <DesireNameInput placeholderText={'اسم المكان'} defaultValue={PlaceData?.name}  submitted={submitted} setValid={setNameValid} onValueChange={onNameChange}/>

                {/**Place Type */}
                <PlaceType
                        options={['City', 'Village', 'Place']}
                        value={placeType}
                        onChange={handlePlaceTypeChange}
                        width="100%"
                        height="70px"
                        margin="10px auto"
                        placeholder="نوع المكان"
                />


                {/* PostCode */}
                <DesireNameInput placeholderText={'الرمز البريدي'} defaultValue={''}  submitted={submitted} setValid={setNameValid} onValueChange={onNameChange}/>

                {/*Single PopUp */}
                <MyComponent text={'اختار الدوله'}/>
                <MyComponent text={'اختار المكان'}/>
                <MyComponent text={'اختار اللهجه'}/>

                {/** Description Input */}
                <DesireDescriptionText defaultValue={PlaceData?.description} submitted={submitted} setValid={setDescriptionValid} onValueChange={onDescriptionChange}/>

                {/* Save Or Cancel */}
                <div dir="rtl" className="save-cancel-buttonsPlace-container"> 
                    <button className="save-cancel-button save" onClick={handleSave}>حفظ</button>
                    <button className="save-cancel-button cancel" onClick={()=> navigate(-1)}>الغاء</button>                        
                </div>
            </div>
        </div>
    );
}