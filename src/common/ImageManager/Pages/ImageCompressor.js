import React, { useEffect, useState } from "react";
import { convertFileToBase64, getFileSize } from "../Utils/FileUtils";
import { TakeMeConstants } from "../Utils/TakeMeConstants";
import defaultImage from "../assets/Default-product-type-and-product-image 1.png";
import TakeMeBar from "../Components/TakeMeBar";
import RoundedEdgeButton from "../Components/RoundedEdgeRectangleButton";
import ReactCompareImage from "react-compare-image";
import Monitor from "../Components/Monitor";
import { Link, useNavigate, useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import DataUriToFile from "../Utils/DataToFile";
import { useFileManager } from "../reducers/FileReducer";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { blobToURL, fromBlob } from 'image-resize-compress';

const ImageCompressor = ({ id }) => {
    const navigate = useNavigate();
    const [compressImage, setCompressImage] = useState(null);
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [firstImage, setFirstImage] = useState(defaultImage);
    const [secondImage, setSecondImage] = useState(defaultImage);
    const [fetchedFile, setFetchedFile] = useState(null);
    const [progressPercentage, setProgressPercentage] = useState(20);
    const [isCompressing, setIsCompressing] = useState(false);
    const { state, dispatch } = useFileManager();

    useEffect(() => {
        initComprossor();
    }, []);

    const initComprossor = async () => {
        const fileT = state.files;
        const fileToCompress = fileT[parseInt(id)];
        if (fileToCompress) {
        setFetchedFile(fileToCompress);
        setFirstImage(fileToCompress.file);
        setOriginalSize(getFileSize(fileToCompress.size));
        prepareCompressedImage(fileToCompress.file, fileToCompress.id);
        } else {
        console.error("File to compress is undefined.");
        }
    };

    const prepareCompressedImage = async (url, filename) => {
        setIsCompressing(true);
        try {
        const quality = (100 - progressPercentage);
        const width = 0; // Set width as needed
        const height = 0; // Set height as needed
        const format = 'webp'; // Set format as needed

        fromBlob(DataUriToFile(url, filename), quality, width, height, format).then((blob) => {
            setCompressImage(blob);
            blobToURL(blob).then((url) => {
            setSecondImage(url);
            setCompressedSize(blob.size);
            setIsCompressing(false);
            });
        });
        } catch (error) {
        console.error("Error preparing compressed image:", error);
        setIsCompressing(false);
        }
    };

    const handleSave = () => {
        if (compressImage) {
        convertFileToBase64(compressImage)
            .then((base64String) => {
            navigate(`/web/admin/image-manager${JSON.parse(localStorage.getItem('searchParams'))}`, { state: { base64String, index: parseInt(id), size: compressedSize } });
            })
            .catch((error) => {
            console.error("Error converting file to base64:", error);
            });
        }
    };

    return (
        <div
        className="container "
        style={{ color: TakeMeConstants.SECONDARY_TEXT_COLOR, height: "90vh" }}
        >
        <TakeMeBar title="ضغط" route="/web/admin/image-manager"></TakeMeBar>
        <div className=" text-center" style={{ height: "15%", padding: "15px" }}>
            <div className="row justify-content-between ">
            <div className="col-3 text-center ">
                <div style={{ fontWeight: "bold" }}>الاصلية</div>
                <div>{originalSize.toFixed(2)} MB</div>
            </div>
            <div className="col-3 text-center">
                <div style={{ fontWeight: "bold" }}>المضغوطة</div>
                <div>{getFileSize(compressedSize).toFixed(2)} MB</div>
            </div>
            </div>
        </div>
        {isCompressing ? (
            <div
            className="d-flex justify-content-center align-items-center mt-0"
            style={{
                height: "45%",
                backgroundColor: "#F9FFF9",
                overflow: "clip",
            }}
            >
            <Monitor src={firstImage}></Monitor>
            </div>
        ) : (
            <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "45%",
                backgroundColor: "#F9FFF9",
                overflow: "clip",
            }}
            >
            <ReactCompareImage
                rightImageCss={{ objectFit: "contain", height: "100%" }}
                leftImageCss={{ objectFit: "contain", height: "100%" }}
                handle
                skeleton
                sliderLineWidth={5}
                sliderLineColor={TakeMeConstants.PRIMARY_COLOR}
                leftImage={firstImage}
                rightImage={secondImage}
            />
            ;
            </div>
        )}
        <label
            className="form-label fs-2 text-center mt-3"
            style={{ fontWeight: "bold", width: "100%" }}
        >
            {progressPercentage}%
        </label>
        <Slider
            allowCross={false}
            range
            onChangeComplete={(value) => {
            if (Array.isArray(value)) {
                setProgressPercentage(value[0]);
            } else {
                setProgressPercentage(value);
            }
            prepareCompressedImage(fetchedFile.file, fetchedFile.id);
            }}
            handleStyle={[
            { borderColor: TakeMeConstants.PRIMARY_COLOR, borderWidth: 4 },
            { borderColor: TakeMeConstants.PRIMARY_COLOR, borderWidth: 4 },
            ]}
            trackStyle={[
            { backgroundColor: TakeMeConstants.PRIMARY_COLOR, height: 6 },
            ]}
            defaultValue={15}
        />
        
        <div
            className=" d-flex flex-row justify-content-evenly align-items-center  position-fixed fixed-bottom "
            style={{ height: "10%" }}
        >
            <RoundedEdgeButton bgColor="" label="الغاء" onPress={() => {
                navigate(-1)
            }} />
        <RoundedEdgeButton
                bgColor="07AB83"
                label="حفظ"
                onPress={handleSave}
            />
        </div>
        </div>
    );
};

export default ImageCompressor;