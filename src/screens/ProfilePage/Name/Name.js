import React from "react";
import './Name.css';
import Shimmer from "../shimmer/shimmer";
import { Input } from '../components/Components'

export default function Name({ Focused, setFocused, isLoading, ProfileData, setProfileData }) {
    
    const updateDisplayName = (newDisplayName) => {
        setProfileData((prevState) => ({
          ...prevState,
          translationsResponseDto: {
            ...prevState.translationsResponseDto,
            translations: prevState.translationsResponseDto.translations.map(
              (translation) =>
                translation.display_name !== undefined
                  ? { ...translation, display_name: newDisplayName }
                  : translation
            ),
          },
        }));
    };

    return (
        <>
            <div className='NameContainer'>
                {isLoading ? <Shimmer /> :
                    <div className={`Name__Container`} onClick={()=> setFocused(!Focused)}>
                        { ProfileData?.translationsResponseDto?.translations[1]?.display_name }
                    </div>
                }
            </div>
            {Focused &&
                <div className='Name__Input_Container'>
                    <Input
                        PlaceHolderTEXT={'شو اسمك الكامل'}
                        value={ProfileData?.translationsResponseDto?.translations[1]?.display_name}
                        onChange={name=> updateDisplayName(name)}
                    />
                </div>
            }
        </>
    );
}
