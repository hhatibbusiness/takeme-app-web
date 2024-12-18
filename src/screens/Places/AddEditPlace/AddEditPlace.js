import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Place.style.css";

import { useNavbarContext } from "../../../context/navbar.context";
import { addPlace, EditPlace } from '../model/managePlaces.js';
import { useAlertContext } from "../../../context/alerts.context";
import NameInput from './PlaceController/PlacesInput'
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
    
    const [placeName, setPlaceName] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
    const [placeType, setPlaceType] = useState('');
    const [placePostalCode, setPlacePostalCode] = useState('');

    /// Get the Place Data
    useEffect(() => {
        if (mode === 'edit' || mode === 'duplicate') {
            const storedPlaces = JSON.parse(sessionStorage.getItem('places')) || [];
            const place = storedPlaces.find(item => item.id === parseInt(id));
            if (place) {
                setPlaceData(place);
                setPlaceName(place?.translations?.fields?.find(field => field.key === 'name')?.value);
                setPlaceDescription(place.comments);
                setPlaceType(place.placeType);
                setPlacePostalCode(String(place.postalCode));
            }
        }
        // eslint-disable-next-line
    }, [id]);


    /// Set up the initial state of the page
    useEffect(() => {
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
        setPlaceName(value);
    }
    const onDescriptionChange = (value) => {
        setPlaceDescription(value);
    }
    const onPostalCodeChange = (value) => {
        setPlacePostalCode(value);
    }

    /// Handle the Local Data Changes
    const handleLocalData = (data) => {
        if (mode === 'edit') {
            const storedDesires = JSON.parse(sessionStorage.getItem('places')) || [];
            const updatedDesires = storedDesires.map(desire => 
                desire.id === data.id ? { ...desire, ...data } : desire
            );
            sessionStorage.setItem('palces', JSON.stringify(updatedDesires));
        } else {
            const storedDesires = JSON.parse(sessionStorage.getItem('places')) || [];
            storedDesires.unshift(data);
            sessionStorage.setItem('places', JSON.stringify(storedDesires));
        }
    };

    /// Handle the Response from the API
    const handleResponse = (response) => {
        if (response?.status) {
            console.log("Response", response)
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
            const data = {
                "id": null,	
                "localeId": 1,
                "placeType": placeType,
                "postalCode": placePostalCode,
                "parentPlaceId": null,
                "countryId": 5,
                "initSource": "admin", 
                "initMethod": "manual",
                "comments": placeDescription,
                "translations": {
                  "localeId": 1,
                  "fields": [
                    {
                      "key": "name",
                      "value": placeName
                    }
                  ]
                }
            }

            if (mode === 'edit') {
                data.id = id;
                const response = await EditPlace(data);
                handleResponse(response);
            } else {
                const response = await addPlace(data);
                handleResponse(response);
            }
        }
    }

    return (
        <div className='AddDesireBody' style={{paddingTop: 65}}>
            <div dir='rtl' className="add-place-container">
                {/**Name Input */}
                <NameInput placeholderText={'اسم المكان'} defaultValue={placeName}  submitted={submitted} setValid={setNameValid} onValueChange={onNameChange}/>

                {/**Place Type */}
                <PlaceType
                    options={['City', 'Village', 'Place']}
                    value={placeType}
                    onChange={handlePlaceTypeChange}
                    width="100%"
                    height="60px"
                    margin="10px auto"
                    placeholder="نوع المكان"
                />

                {/* PostCode */}
                <NameInput placeholderText={'الرمز البريدي'} defaultValue={placePostalCode} submitted={submitted} setValid={setNameValid} onValueChange={onPostalCodeChange}/>

                {/** Places Pop up  */}
                <MyComponent text={'اختر المكان'} />

        
                {/** Description Input */}
                <DesireDescriptionText defaultValue={placeDescription} submitted={submitted} setValid={setDescriptionValid} onValueChange={onDescriptionChange}/>

                {/* Save Or Cancel */}
                <div dir="rtl" className="save-cancel-buttonsPlace-container"> 
                    <button className="save-cancel-button save" onClick={handleSave}>حفظ</button>
                    <button className="save-cancel-button cancel" onClick={()=> navigate(-1)}>الغاء</button>                        
                </div>
            </div>
        </div>
    );
}