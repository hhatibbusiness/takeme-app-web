import React, { useState, useEffect, useRef } from 'react';
import './ProfilePage.css';
import useProfileController from './Controllers/ProfileController';
import useFocusReducer from './Controllers/FocusedController'
import ProfileImage from './ProfileImage/ImageImage';
import Gender from './Gender/Gender'
import Name from './Name/Name'
import DOT from '../../assets/images/profile/Dot.png'
import Age from './Age/Age'
//import Location from './Location/Location';
import Welcome from '../../assets/images/profile/Welcome.png'
//import { GetProfileData } from './models/manageProfile'
//import { ImageManager } from '../../common/ImageManager'


export default function ProfilePage({ paddingTop, admin, setAdmin }) {
    const { ProfileData, ProfileActions } = useProfileController()
    const { Focused, FocusedActions} = useFocusReducer();

    // init the Profile Data From API
    useEffect(()=>{
        ProfileActions.fetchProfileData()
    }, [])

    return (
        <>
            {FocusedActions.FocusedAny() ? <div className='overlay'/> : null}
            <div className="ProfilePage__container" style={{ position: 'absolute', paddingTop: `${paddingTop}px`, left: 0, top: 0}}>

                {/** MainProfileImage */}
                <div dir='rtl' className='ProfileData'>
                    <div className='firstRow__profileImage'>
                        <ProfileImage ProfileData={ProfileData} setOpenImageManager={()=>{}} />
                    </div>

                    {/** Set Gender, Name and Age */}
                    <div className='secondRow__Data'>
                        <Gender Focused={Focused.Gender} GenderFocused={FocusedActions.setGenderFocus} ProfileData={ProfileData} ProfileActions={ProfileActions} />
                        <Name Focused={Focused.Name} FocusHandle={FocusedActions.setNameFocus} ProfileData={ProfileData} ProfileActions={ProfileActions} />
                        <img src={DOT} alt='Dot' style={{ width: '5%', margin: '0 5px' }} />
                        <Age Focused={Focused.Age} FocusHandle={FocusedActions.setAgeFocus} ProfileData={ProfileData} ProfileActions={ProfileActions} />
                    </div>
                    <div className='thirdRow__Data'>
                        <button className='Contact__button'>تواصل</button>
                    </div>

                </div>
                        
                <div className='Welcome'>
                    <img src={Welcome} alt='Welcome' />
                    <div className='WelcomeMessage'>
                    اهلا بك بعالم تيكمي للسعادة, هنا منصتك للحصول على رغباتك وحاجياتك بسرعة و سهولة.
                    </div>
                </div>
                {/*openImageManager &&
                    <div className='ImageManagerShow'>
                        <ImageManager setOpenImageManager={setOpenImageManager} handleSaveImages={handleSaveImages}/>
                    </div>
                */}
            </div>
        </>
    );
}
