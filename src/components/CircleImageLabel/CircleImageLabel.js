import React from "react"
import './CircleImageLabel.style.css'
import ImageLoader from "../../utilty/ImageLoader"

export default function CircleImageLabel({ need }){
    return (
        <div className="need-item">
        <div className="circle-img">
            <ImageLoader src='clean.png' width='100%'/>
        </div>
        <div className="needs-label item-label">
            {need.name}
        </div>
    </div>
    )
}