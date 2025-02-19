import React, {useEffect} from 'react';
import './LoginButton.css';

const LoginButton = ({
    value,
    icon,
    backColor,
    color,
    borderColor,
    separatorColor,
    fontWeight,
    clickFun,
    hasImage,
    spin
}) => {
    useEffect(() => {
        console.log(spin, value);

    }, [spin]);
    return (
        <div onClick={clickFun} className='LoginButton' style={{ background: `${backColor}`, color: `${color}`, border: `1px solid ${borderColor}` }}>

            {
                hasImage && (
                    <div className={'LoginButton__image'}>
                        {
                            spin ? (
                                <i class="fa-solid fa-circle-notch"></i>
                            ) : (
                                <img src={icon} className='LoginButton__icon' />
                            )

                        }
                        <div className='LoginButton__separator' style={{background: `${separatorColor}`}}></div>
                    </div>
                )
            }
            <div className='LoginButton__text' style={{ fontWeight: `${fontWeight}`}}>
                {
                    spin && !hasImage ? (
                        <i class="fa-solid fa-circle-notch"></i>
                    ) : (
                        <p>{value}</p>
                    )
                }
            </div>
        </div>
    )
}

export default LoginButton;