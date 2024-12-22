import React from "react";
import './Name.css';
import Shimmer from "../shimmer/shimmer";
import { Input } from '../components/Components'

export default function Name({ Focused, FocusHandle, ProfileData, ProfileActions }) {
    
    return (
        <>
            <div className='NameContainer'>
                {ProfileData.isLoading ? <Shimmer /> :
                    <div className={`Name__Container`} onClick={()=> FocusHandle(!Focused)}>
                        { ProfileData.translations.fields[1].value }
                    </div>
                }
            </div>
            {Focused &&
                <div className='Name__Input_Container'>
                    <Input
                        PlaceHolderTEXT={'شو اسمك الكامل'}
                        value={ProfileData.translations.fields[1].value}
                        onChange={name=> ProfileActions.updateName(name)}
                    />
                </div>
            }
        </>
    );
}
