import React, { useEffect, useState } from "react";
import './Name.css';
import Shimmer from "../shimmer/shimmer";
import { Input } from '../components/Components'
import Right from '../../../assets/images/profile/Right.png';
import { createUserFeedbackEnvelope } from "@sentry/react";
import useDoubleTap from "../../../utilty/useDoubleClick";


export default function Name({ Focused, FocusHandle, ProfileData, updateName }) {
    const [nameIn, setNameIn] = useState('')

    useEffect(()=> {
        setNameIn(ProfileData.translations?.fields[1]?.value || '')
    }, [ProfileData.translations?.fields[1]?.value, Focused])

    const handleSave = ()=>{
        if (nameIn) {
            updateName(ProfileData.id, nameIn)
            FocusHandle(false)
        }
    }

    const doubleTapHandler = useDoubleTap(()=> FocusHandle(!Focused))

    return (
        <>
            <div className='NameContainer'>
                {ProfileData.isLoading ? <Shimmer /> :
                    <div className={`Name__Container`} onClick={doubleTapHandler}>
                        { ProfileData.translations?.fields[1]?.value }
                    </div>
                }
            </div>
            {Focused &&
                <div className='Name__Input_Container'>
                    <Input
                        PlaceHolderTEXT={'شو اسمك الكامل'}
                        value={nameIn}
                        onChange={n => setNameIn(n)}
                    />
                    <img src={Right} alt="Right" onClick={()=> handleSave()}/>
                </div>
            }
        </>
    );
}
