import React, { useState, useEffect, useRef } from 'react';
import './ProfilePage.css';
//import FocusableElement from './FocusableElement/FocusableElement';
import ProfileImage from './ProfileImage/ImageImage';
import Gender from './Gender/Gender'
import Name from './Name/Name'
import DOT from '../../assets/images/profile/Dot.png'
import Age from './Age/Age'
import Location from './Location/Location';
import Welcome from '../../assets/images/profile/Welcome.png'
import { GetProfileData } from '../../models/manageProfile'
import { ImageManager } from '../../common/ImageManager'

export default function ProfilePage() {
  const [ProfileData, setProfileData] = useState({});
  const [isLoading, setLoading] = useState(false)
  const [GenderFocused, setGenderFocused] = useState(false);
  const [NameFocused, setNameFocused] = useState(false);
  const [AgeFocused, setAgeFocused] = useState(false);
  const [LocationFocused, setLocationFocused] = useState(false);
  const [openImageManager, setOpenImageManager] = useState(false);
  const CheckData = useRef(false)

  const clearFocus =()=>{
    setGenderFocused(false);
    setNameFocused(false);
  }

  // Fetch the data from the API
  useEffect(()=> {
    const fetchProfile = async () => {
      setLoading(true)
      const data = await GetProfileData("en", "en-US")
      setProfileData(data)
      CheckData.current = true
      setLoading(false)
    };
    fetchProfile();
  }, [])

  // Check if the data is Valid or not and force the user to put it.
  useEffect(()=> {
    if(CheckData.current){
      const name = ProfileData?.translationsResponseDto?.translations[1]?.display_name
      const gender = ProfileData?.gender
      const age = ProfileData?.dateOfBirth
  
      if (!gender) {
        setGenderFocused(true)
      }
      else if (!name) {
        setNameFocused(true)
      }
      else if (!age) {
        setAgeFocused(true)
      }
      else if (!ProfileData?.dateOfBirth.year) {
        setAgeFocused(true)
      }
      else if (!ProfileData?.baseProfile?.location?.place?.country) {
        setLocationFocused(true)
      }
      else if (ProfileData?.baseProfile?.profileImg?.url === '') {
        setOpenImageManager(true)
      }
  
    }
    // eslint-disable-next-line
  }, [CheckData.current, GenderFocused, NameFocused, AgeFocused, LocationFocused])

  const handleSaveImages = (images) => {
    const imageFile = images[0]?.file
    setProfileData({...ProfileData, baseProfile: {...ProfileData.baseProfile, profileImg: {url: imageFile}}})
  }

  return (
    <div className="ProfilePage__container">
        {/** Check if The Overlay Active */}
        {(GenderFocused || NameFocused || AgeFocused || LocationFocused) && <div className="overlay" onClick={clearFocus}></div>}

        {/** MainProfileImage */}
        <div dir='rtl' className='ProfileData'>
            <div className='firstRow__profileImage'>
                <ProfileImage ProfileData={ProfileData} setOpenImageManager={setOpenImageManager} />
            </div>

            {/** Set Gender, Name and Age */}
            <div className='secondRow__Data'>
                <Gender Focused={GenderFocused} setFocused={setGenderFocused} isLoading={isLoading} ProfileData={ProfileData} setProfileData={setProfileData}/>
                <Name Focused={NameFocused} setFocused={setNameFocused} isLoading={isLoading}  ProfileData={ProfileData} setProfileData={setProfileData}/>
                <img src={DOT} alt='Dot' style={{ width: '7%', margin: '0 5px' }} />
                <Age Focused={AgeFocused} setFocused={setAgeFocused} isLoading={isLoading} ProfileData={ProfileData} setProfileData={setProfileData}/>
            </div>
            <div className='thirdRow__Data'>
                <button className='Contact__button'>تواصل</button>
            </div>

            <Location Focused={LocationFocused} setFocused={setLocationFocused} isLoading={isLoading} ProfileData={ProfileData} setProfileData={setProfileData} />
        </div>
                
        <div className='Welcome'>
            <img src={Welcome} alt='Welcome' />
            <div className='WelcomeMessage'>
            اهلا بك بعالم تيكمي للسعادة, هنا منصتك للحصول على رغباتك وحاجياتك بسرعة و سهولة.
            </div>
        </div>
        {openImageManager &&
            <div className='ImageManagerShow'>
                <ImageManager setOpenImageManager={setOpenImageManager} handleSaveImages={handleSaveImages}/>
            </div>
        }
    </div>
  );
}
