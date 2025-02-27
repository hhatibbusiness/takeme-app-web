import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Place.style.css";
import { useNavbarContext } from "../../../context/navbar.context";
import NameInput from './PlaceController/PlacesInput'
import DesireDescriptionText from './PlaceController/PlacesCommentText'
import SinglePopupAPI from './PlaceController/SelectLocalePop.js'
import SaveButton from '../../../components/SaveButton/SaveButton';
import CancelButton from '../../../components/CancelButton/CancelButton';
import { searchPlacesAPI, getPlaces, getCountries, searchCountriesAPI, getLocales, searchLocalesAPI } from '../model/managePlaces.js';
import PlaceType from './PlaceController/PlaceType/PlaceType.js'
import { editPlace, addPlace } from "../../../store/actions/places.actions.js";
import {changeBackBtnState} from "../../../store/actions/navbar.actions";

function AddEditPlace( { changeBackBtnState, mode, setBackBtn, setAdmin, locale, places, editPlace, addPlace } ) {
    const navigate = useNavigate()
    const { id } = useParams();
    const { changeSearchActive } = useNavbarContext();
    const [submitted, setSubmitted] = useState(false);
    const [namevalid, setNameValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    
    const [placeName, setPlaceName] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
    const [placeType, setPlaceType] = useState('');
    const [placePostalCode, setPlacePostalCode] = useState('');
    const [placeParentID, setPlaceParentID] = useState(null);
    const [placeCountryID, setPlaceCountryID] = useState(null);
    const [placeLocaleID, setPlaceLocaleID] = useState('');

    /// Get the Place Data
    useEffect(() => {
        if (mode === 'edit' || mode === 'duplicate') {
            const storedPlaces = places.places;
            const place = storedPlaces.find(item => item.id === parseInt(id));
            if (place) {
                setPlaceName(place?.translations?.fields?.find(field => field.key === 'name')?.value);
                setPlaceDescription(place.comments);
                setPlaceType(place.placeType);
                setPlacePostalCode(String(place.postalCode));
                setPlaceParentID(place.parentPlaceId);
                setPlaceCountryID(place?.country?.id);
            }
        }
        // eslint-disable-next-line
    }, [id]);


    /// Set up the initial state of the page
    useEffect(() => {
        window.scrollTo(0, 0);
        changeSearchActive(false);
        changeBackBtnState(true);
        setAdmin(true);
        return () => {
            changeSearchActive(true);
            changeBackBtnState(false);
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
    const handlePlaceParentChange = (value) => {
        setPlaceParentID(value.id);
    }
    const handleCountryChange = (value) => {
        setPlaceCountryID(value.id);
    }
    const handleLocaleChange = (value) => {
        setPlaceLocaleID(value.id);
    }


    /// Handle the Save Button Click
    const handleSave = async() => {
        setSubmitted(true);
        if (namevalid && descriptionValid) {
            const data = {
                "lan": "ar_SA",
                "id": null,	
                "localeId": 1,
                "placeType": placeType,
                "postalCode": placePostalCode,
                "parentPlaceId": placeParentID,
                "countryId": placeCountryID,
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
                const isDONE = await editPlace(data);
                if (isDONE) navigate(-1);
            } else {
                const isDONE = await addPlace(data);
                if (isDONE) navigate(-1);
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
                <NameInput 
                    placeholderText={'الرمز البريدي'} 
                    defaultValue={placePostalCode} 
                    submitted={submitted} 
                    setValid={setNameValid} 
                    onValueChange={onPostalCodeChange} 
                />

                {/** Places Pop up  */}
                <SinglePopupAPI 
                    placeHolderText={'اختر المكان'} 
                    displayName='translations.fields.value' 
                    SearchFunctionAPI={searchPlacesAPI} 
                    ListFunctionAPI={getPlaces} 
                    onSelectItem={handlePlaceParentChange}
                    selectedItems={{id: placeParentID}}
                />

                {/** Countries Pop up  */}
                <SinglePopupAPI
                    placeHolderText={'اختر الدوله'} 
                    displayName='translations.fields.value' 
                    SearchFunctionAPI={searchCountriesAPI} 
                    ListFunctionAPI={getCountries} 
                    onSelectItem={handleCountryChange}
                    selectedItems={{id: placeCountryID}}
                />

                {/** Locales Pop up  */}
                <SinglePopupAPI 
                    placeHolderText={'اختر اللهجه'} 
                    displayName='name' 
                    SearchFunctionAPI={searchLocalesAPI} 
                    ListFunctionAPI={getLocales} 
                    onSelectItem={handleLocaleChange}
                    selectedItems={{id: placeLocaleID}}
                />

                {/** Description Input */}
                <DesireDescriptionText defaultValue={placeDescription} submitted={submitted} setValid={setDescriptionValid} onValueChange={onDescriptionChange}/>

                {/* Save Or Cancel */}
                <div className='PlacesAdd__btns--container'>
                    <SaveButton saving={places.adding}  saveClickHanlder={handleSave} />
                    <CancelButton handleCancelClick={e => {navigate(-1)}} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    locale: state.categories.selectedLocale,
    places: state.places
})

export default connect(mapStateToProps, {changeBackBtnState, editPlace,addPlace})(AddEditPlace);