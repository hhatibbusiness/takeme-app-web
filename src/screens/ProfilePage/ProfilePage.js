import React from "react";
import './ProfilePage.css'
import Welcome from '../../assets/images/profile/welcome.gif'

export default function ProfilePage({ paddingTop }){
    return(
        <div className="ProfilePageWelcome__Container" style={{ paddingTop: `${paddingTop}px`}}>
            <div className='Welcome'>
                <img src={Welcome} alt='Welcome' />
                <div className='WelcomeMessage'>
                اهلا بك بعالم تيكمي للسعادة, هنا منصتك للحصول على رغباتك وحاجياتك بسرعة و سهولة.
                </div>
            </div>
        </div>
    )
}