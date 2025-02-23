import React, { useState, useEffect } from 'react';
import { useNavigationType, useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import useFocusReducer from './Controllers/FocusedController'
import ProfileImage from './ProfileImage/ImageImage';
import Gender from './Gender/Gender'
import Name from './Name/Name'
import DOT from '../../assets/images/profile/Dot.png'
import Age from './Age/Age'
import Location from './Location/Location';
import { connect } from 'react-redux';
import { fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation } from '../../store/actions/profile.action'
//import { ImageManagerWrapped } from '../../common/ImageManager'


function ProfileDetails({ ProfileData, fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation }) {
    const navigate = useNavigate()
    const { Focused, FocusedActions} = useFocusReducer();
    const [ openImageManager, setOpenImageManager ] = useState(false)
    const navigationType = useNavigationType();

    // init the Profile Data From API
    useEffect(() => {
        const TOKEN = localStorage.getItem("TAKEME_TOKEN")
        if (!TOKEN) navigate('/login')

        console.log(navigationType)
        fetchProfileData()
    }, []);

    // Remove the Overlay Layer
    const clearFoucse = () => {
        FocusedActions.setGenderFocus(false);
        FocusedActions.setNameFocus(false);
        FocusedActions.setLocationFocus(false)
    }

    // Handle Update Image 
    // const handleSaveImages = async (props)=> {
    //     const data = props[0]
    //     ProfileActions.updateProfileImage({id: null, path: data?.imageUrl, title: data?.id, comment: data?.id, type:"image"})
    // }

    // Force senario
    useEffect(() => {
        if (!ProfileData.isLoading) {
            if (!ProfileData.gender) FocusedActions.setGenderFocus(true)
            else if (!ProfileData.translations) FocusedActions.setNameFocus(true)
            else if (!ProfileData.dateOfBirth) FocusedActions.setAgeFocus(true)
        }
    },[ProfileData.isLoading, Focused])

    return (
        <>
            {FocusedActions.FocusedAny() ? <div className='overlay' onClick={()=> clearFoucse()}/> : null}
            {/** MainProfileImage */}
            <div dir='rtl' className='ProfileData__container'>
                <div className='firstRow__profileImage'>
                    <ProfileImage ProfileData={ProfileData} setOpenImageManager={setOpenImageManager} />
                </div>

                {/** Set Gender, Name and Age */}
                <div className='secondRow__Data'>
                    <Gender Focused={Focused.Gender} GenderFocused={FocusedActions.setGenderFocus} ProfileData={ProfileData} updateGender={updateGender} />
                    <Name Focused={Focused.Name} FocusHandle={FocusedActions.setNameFocus} ProfileData={ProfileData} updateName={updateName} />
                    <img src={DOT} alt='Dot' style={{ width:'2%' , marginTop: '10px' }} />
                    <Age Focused={Focused.Age} FocusHandle={FocusedActions.setAgeFocus} ProfileData={ProfileData} updateDateOfBirth={updateDateOfBirth} />
                </div>
                
                <div className='thirdRow__Data'>
                    <button className='Contact__button'>تواصل</button>
                </div>
                <Location Focused={Focused.Location} setFocused={FocusedActions.setLocationFocus} ProfileData={ProfileData} UpdateLocation={UpdateLocation} />
            </div>

            {/*openImageManager &&
                <div className='ImageManagerShow'>
                    <ImageManagerWrapped
                        DefFileDir= {'/resources/images/profile'}
                        DefLocale={'ar_SA'}
                        DefSelected={''}
                        setOpenImageManager={setOpenImageManager} 
                        handleSaveImages={handleSaveImages}
                    />
                </div>
            */}
        </>
    );
}

const mapStateToProps = state => ({
    ProfileData: state.profile
})

export default connect(mapStateToProps, {fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation}) (ProfileDetails)