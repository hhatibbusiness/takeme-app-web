import React, {useRef, useState} from 'react';
import Img from "../../ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../../components/LoadingProduct/LoadingProduct";

const CoverImg = ({ image, loaded, setLoaded }) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const failureRef= useRef(null);
    const imgRefDub = useRef(null);
    const imgContainerRef = useRef(null);
    const [imgLoaded, setImgLoaded] = useState(true);

    return (
        <div ref={imgContainerRef} className={`${imgLoaded ? 'Cover__visible' : 'Cover__hidden'}`}>
            <Img setError={setError} setHidden={setHidden} setLoaded={setLoaded} setContainerLoaded={setContainerLoaded} imgRefDub={imgRefDub} setImgLoaded={setImgLoaded} isCover={true} imgUrl={image}/>
            {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} failureRef={failureRef} cover={true} elemRef={imgContainerRef} />}
            {(!loaded || (!loaded && hidden)) && <LoadingProduct priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
        </div>
    );
};

export default React.memo(CoverImg);