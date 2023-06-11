import React, {useEffect, useRef} from 'react';
import './Category.css';
import axios from "axios";

const Category = ({cat, id, setCurrId}) => {
    // const imgRef = useRef();
    // useEffect(() => {
    //     console.log(cat);
    //     renderImage()
    // }, []);

    // const renderImage = async () => {
    //
    //     try{
    //         const res = await axios.get(cat.imagePath);
    //         console.log(res.status);
    //         if(res.status === 200) {
    //             return imgRef.current.src = cat.imagePath;
    //         }
    //     }catch(e) {
    //         console.error(e);
    //         return imgRef.current.src = notFoundImg;
    //     }
    // }

    return (
        <div onClick={() => setCurrId(cat.id)} draggable={false} className={`Category ${id === cat.id && 'Category__active'}`}>
            <div className="Category__container">
                <img src={cat.imagePath} draggable={false} />
            </div>
            <p draggable={false}>{cat && cat.name}</p>
        </div>
    );
};

export default Category;