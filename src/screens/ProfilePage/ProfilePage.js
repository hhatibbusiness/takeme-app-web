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
import Welcome from '../../assets/images/profile/Welcome.png'
import { connect } from 'react-redux';
import { fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation } from '../../store/actions/profile.action'
//import { ImageManagerWrapped } from '../../common/ImageManager'


function ProfilePage({ paddingTop, ProfileData, fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation }) {
    const navigate = useNavigate()
    const { Focused, FocusedActions} = useFocusReducer();
    const [ openImageManager, setOpenImageManager ] = useState(false)
    const navigationType = useNavigationType();
    console.log("PROFILE REDUX", ProfileData)

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
            else if (!ProfileData.location) FocusedActions.setLocationFocus(true)
        }
    },[ProfileData.isLoading, Focused])

    return (
        <>
            {FocusedActions.FocusedAny() ? <div className='overlay' onClick={()=> clearFoucse()}/> : null}
            <div className="ProfilePage__container" style={{ position: 'absolute', paddingTop: `${paddingTop}px`, left: 0, top: 0}}>

                {/** MainProfileImage */}
                <div dir='rtl' className='ProfileData'>
                    <div className='firstRow__profileImage'>
                        <ProfileImage ProfileData={ProfileData} setOpenImageManager={setOpenImageManager} />
                    </div>

                    {/** Set Gender, Name and Age */}
                    <div className='secondRow__Data'>
                        <Gender Focused={Focused.Gender} GenderFocused={FocusedActions.setGenderFocus} ProfileData={ProfileData} updateGender={updateGender} />
                        <Name Focused={Focused.Name} FocusHandle={FocusedActions.setNameFocus} ProfileData={ProfileData} updateName={updateName} />
                        <img src={DOT} alt='Dot' style={{ width: '5%', margin: '0 5px' }} />
                        <Age Focused={Focused.Age} FocusHandle={FocusedActions.setAgeFocus} ProfileData={ProfileData} updateDateOfBirth={updateDateOfBirth} />
                    </div>
                    <div className='thirdRow__Data'>
                        <button className='Contact__button'>تواصل</button>
                    </div>
                    <Location Focused={Focused.Location} setFocused={FocusedActions.setLocationFocus} ProfileData={ProfileData} UpdateLocation={UpdateLocation} />
                </div>
                        
                <div className='Welcome'>
                    <img src={Welcome} alt='Welcome' />
                    <div className='WelcomeMessage'>
                    اهلا بك بعالم تيكمي للسعادة, هنا منصتك للحصول على رغباتك وحاجياتك بسرعة و سهولة.
                    </div>
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
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    ProfileData: state.profile
})

export default connect(mapStateToProps, {fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation}) (ProfilePage)