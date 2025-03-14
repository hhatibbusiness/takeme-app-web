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
import Welcome from '../../assets/images/profile/welcome.gif'
import { connect } from 'react-redux';
import { fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation, updateProfileImage } from '../../store/actions/profile.action'
//import { ImageManagerWrapped } from '../../common/ImageManager';
import {changeNavbarIcons} from "../../store/actions/navbar.actions";
import InfoActive from '../../assets/images/InfoActive.png'
import InfoDisable from '../../assets/images/InfoDisable.png'


function ProfilePage({ paddingTop, isAuthenticated, ProfileData, fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation, updateProfileImage, changeNavbarIcons }) {
    const navigate = useNavigate()
    const { Focused, FocusedActions} = useFocusReducer();
    const [ openImageManager, setOpenImageManager ] = useState(false)
    const navigationType = useNavigationType();
    const [profileActive, setProfileActive] = useState(true)

    // NavBar Init
    useEffect(() => {
        const navbarIconsData = {
            showIcons: true,
            icons: [
                {
                    icon: (
                        <img src={profileActive? InfoActive : InfoDisable} />
                    ),
                    iconClickHandler: () => {
                        setProfileActive(prev => !prev);
                        clearFoucse()
                    },
                    active: profileActive
                },
                {
                    icon: <i className="fa-solid fa-filter"></i>,
                    iconClickHandler: () => {
                        console.log("CLIKED FILTER")
                    },
                    disabled: true
                },
                {
                    icon: <i className="fa-solid fa-eye"></i>,
                    iconClickHandler: () => {
                        console.log("CLIKED EYE")
                    },
                    disabled: true
                },
                {
                    icon: <i className="fa-solid fa-magnifying-glass"></i>,
                    iconClickHandler: () => {
                        console.log("CLIKED ****")
                    },
                    disabled: true
                },
                {
                    icon: <i className="fa-solid fa-cart-shopping"></i>,
                    disabled: true,
                }
            ]
        }

        changeNavbarIcons(navbarIconsData);

        return () => {
            changeNavbarIcons({});
        }
    }, [profileActive]);


    // init the Profile Data From API
    useEffect(() => {
        if (!isAuthenticated) navigate('/login')

        if (navigationType === "POP" || !ProfileData?.id)
            fetchProfileData()
    }, []);

    // Remove the Overlay Layer
    const clearFoucse = () => {
        FocusedActions.setGenderFocus(false);
        FocusedActions.setNameFocus(false);
        FocusedActions.setLocationFocus(false)
    }

    // Handle Update Image 
    const handleSaveImages = async (props)=> {
        const data = props[0]
        updateProfileImage(ProfileData?.id, {id: null, path: data?.imageUrl, title: data?.id, comment: data?.id, type:"image"})
    }

    // Force senario
    useEffect(() => {
        if (!ProfileData.isLoading) {
            if (!ProfileData.gender) FocusedActions.setGenderFocus(true)
            else if (!ProfileData.translations) FocusedActions.setNameFocus(true)
            else if (!ProfileData.dateOfBirth) FocusedActions.setAgeFocus(true)
            //else if (!ProfileData.location) FocusedActions.setLocationFocus(true)
        }
    },[ProfileData.isLoading, Focused])

    return (
        <>
            {FocusedActions.FocusedAny() ? <div className='overlay' onClick={()=> clearFoucse()}/> : null}
            <div className="ProfilePage__container" style={{ position: 'absolute', paddingTop: `${paddingTop}px`, left: 0, top: 0}}>

                {/** MainProfileImage */}
                <div dir='rtl' className={`ProfileData ${profileActive ? '' : 'hidden'}`}>
                    <div className='firstRow__profileImage'>
                        <ProfileImage ProfileData={ProfileData} setOpenImageManager={setOpenImageManager} />
                    </div>

                    {/** Set Gender, Name and Age */}
                    <div className='secondRow__Data'>
                        <Gender Focused={Focused.Gender} GenderFocused={FocusedActions.setGenderFocus} ProfileData={ProfileData} updateGender={updateGender} />
                        <Name Focused={Focused.Name} FocusHandle={FocusedActions.setNameFocus} ProfileData={ProfileData} updateName={updateName} />
                        <img src={DOT} alt='Dot' style={{ width: '8px', marginTop: '9px' }} />
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
    ProfileData: state.profile,
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {fetchProfileData, updateGender, updateName, updateDateOfBirth, UpdateLocation, updateProfileImage, changeNavbarIcons}) (ProfilePage)