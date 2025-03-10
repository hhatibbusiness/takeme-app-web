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
import { searchPlacesAPI, getPlaces, getCountries, searchCountriesAPI } from '../model/managePlaces.js';
import PlaceType from './PlaceController/PlaceType/PlaceType.js'
import { editPlace, addPlace } from "../../../store/actions/places.actions.js";


function AddEditPlace( { mode, setAdmin, locale, places, editPlace, addPlace } ) {
    const navigate = useNavigate()
    const { id } = useParams();
    const { changeSearchActive } = useNavbarContext();
    const [submitted, setSubmitted] = useState(false);
    const [namevalid, setNameValid] = useState(false);
    const [postalCodeValid, setPostalCodeValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [placeTypeValid, setPlaceTypeValid] = useState(false);
    const [countryValid, setCountryValid] = useState(false);
    
    const [placeName, setPlaceName] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
    const [placeType, setPlaceType] = useState('');
    const [placePostalCode, setPlacePostalCode] = useState('');
    const [placeParent, setPlaceParent] = useState({});
    const [placeCountry, setPlaceCountry] = useState({});

    /// Get the Place Data
    useEffect(() => {
        if (mode === 'edit' || mode === 'duplicate') {
            const storedPlaces = places.places;
            const place = storedPlaces.find(item => item.id === parseInt(id));
            if (place) {
                setPlaceName(place?.translations?.fields?.find(field => field.key === 'name')?.value);
                setPlaceDescription(place.comments);
                setPlaceType(place?.placeType);
                setPlacePostalCode(String(place.postalCode));
                setPlaceParent(place?.placesResponseDto);
                setPlaceCountry(place?.country);
                if (place?.country) setCountryValid(true);
                if (place?.placeType) setPlaceTypeValid(true);
            }
        }
        // eslint-disable-next-line
    }, [id]);


    /// Set up the initial state of the page
    useEffect(() => {
        window.scrollTo(0, 0);
        changeSearchActive(false);
        setAdmin(true);
        return () => {
            changeSearchActive(true);
            setAdmin(false);
        }
        // eslint-disable-next-line
    }, []);

    const handlePlaceTypeChange = (value) => {
        setPlaceType(value);
        setPlaceTypeValid(true);
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
        setPlaceParent(value);
    }
    const handleCountryChange = (value) => {
        setPlaceCountry(value);
        setCountryValid(true);
    }

    /// Handle the Save Button Click
    const handleSave = async() => {
        setSubmitted(true);
        if (namevalid && descriptionValid && postalCodeValid && placeTypeValid && countryValid) {
            const data = {
                "lan": "ar_SA",
                "id": null,	
                "localeId": locale?.id || 1,
                "placeType": placeType,
                "postalCode": placePostalCode,
                "parentPlaceId": placeParent?.id,
                "countryId": placeCountry.id,
                "initSource": "admin", 
                "initMethod": "manual",
                "comments": placeDescription,
                "translations": {
                  "localeId": locale?.id || 1,
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
                    value={Number(placeType) || ''}
                    onChange={handlePlaceTypeChange}
                    width="100%"
                    height="60px"
                    margin="10px auto"
                    placeholder="نوع المكان"
                    submitted={submitted}
                    valid={placeTypeValid}
                    setValid={setPlaceTypeValid}
                />

                {/* PostCode */}
                <NameInput 
                    placeholderText={'الرمز البريدي'} 
                    defaultValue={placePostalCode} 
                    submitted={submitted} 
                    setValid={setPostalCodeValid} 
                    onValueChange={onPostalCodeChange}
                    maxLength={8}
                    type={'number'}
                />

                {/** Places Pop up  */}
                <SinglePopupAPI 
                    placeHolderText={'اختر المكان'} 
                    displayName='translations.fields.value' 
                    SearchFunctionAPI={searchPlacesAPI} 
                    ListFunctionAPI={getPlaces} 
                    onSelectItem={handlePlaceParentChange}
                    selectedItems={placeParent}
                />

                {/** Countries Pop up  */}
                <SinglePopupAPI
                    placeHolderText={'اختر الدوله'} 
                    displayName='translations.fields.value' 
                    SearchFunctionAPI={searchCountriesAPI} 
                    ListFunctionAPI={getCountries} 
                    onSelectItem={handleCountryChange}
                    selectedItems={placeCountry}
                    sumitted={submitted}
                    valid={countryValid}
                />

                {/** Description Input */}
                <DesireDescriptionText 
                    defaultValue={placeDescription} 
                    submitted={submitted} 
                    setValid={setDescriptionValid}
                    onValueChange={onDescriptionChange}
                />

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

export default connect(mapStateToProps, {editPlace,addPlace})(AddEditPlace);
