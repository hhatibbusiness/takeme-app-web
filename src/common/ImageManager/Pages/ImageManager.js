import DefaultImage from "../Components/DefaultImage";
import TakeMeBar from "../Components/TakeMeBar";
import ImageThumbnails from "../Components/ImageThumbnails";
import React, { useCallback, useEffect, useRef, useState } from "react";
import RoundedEdgeSquareButton from "../Components/RoundEdgeSquareButton";
import gallery from "../assets/Image.png";
import deleteAll from "../assets/Delete All.png";
import checkAll from "../assets/Check All.png";
import done from "../assets/Done.png";
import trash from "../assets/TrashCan.png";
import Slider from "../Components/Slider";
import { FileManagerActionType, useFileManager } from "../reducers/FileReducer";
import FilesDataSource from "../data/FilesDataSource";
import { imageUrlToFile } from "../Utils/ApiFilesUtils";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Components/loader/Loader";


const ImageManager = ({ DefFileDir, DefLocale, DefSelected, setOpenImageManager, handleSaveImages }) => {
    const [dir, setDir] = useState();
    const [locale, setLocale] = useState();
    const [selected, setSelected] = useState();

    const [loading, setLoading] = useState(true);
    const [hasLargeFiles, setHasLargeFiles] = useState(false);

    const params = {
        baseUrl: "http://191.96.1.25:8080/app/endpoints/",
        params: {
            mlocale: DefLocale,
            filesDir: DefFileDir,
        },
        method: "GET",
    };

    const { state, dispatch } = useFileManager();
    const fileInputRef = useRef(null);
    const checkedFiles = state.files.filter((file) => file.isChecked);

    const handleImagePicker = useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);

    async function mapFilesToImageModels(files, isApiImage, isChecked, imageUrls) {
        const promises = files.map((file, index) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const base64URL = reader.result;
                    const imageModel = {
                        id: file.name,
                        file: base64URL,
                        isChecked,
                        isApiImage,
                        size: file.size,
                        imageUrl: isApiImage ? imageUrls[index].uri : "",
                    };
                    resolve(imageModel);
                };
                reader.onerror = () => {
                    reject(reader.error);
                };
            });
        });

        try {
            const imageModels = await Promise.all(promises);
            return imageModels;
        } catch (error) {
            console.error("Error converting files to base64:", error);
            return [];
        }
    }

    async function handleFileInputChange(event) {
        const eventFiles = event.target.files;
        if (eventFiles) {
            console.log(eventFiles);
            const filesArray = Array.from(eventFiles);
            const mappedImageModels = await mapFilesToImageModels(filesArray, false, false);
            dispatch({
                type: FileManagerActionType.ADD_FILES,
                payload: { files: mappedImageModels, index: undefined },
            });
            event.target.value = "";
        }
    }

    const fetchData = async () => {
        try {
            console.log("fetching data");
            setLoading(true);
            const response = await FilesDataSource.getFilesFromDataSource(params);
            if (response.status && response.output) {
                const apiFiles = response.output;
                const files = await Promise.all(apiFiles.map((image) => imageUrlToFile(image)));
                const imageModels = await mapFilesToImageModels(files, true, false, apiFiles);
                if (selected) {
                    const storedUrls = typeof(selected) === 'object' ? selected :  JSON.parse(selected);
                    imageModels.map((imageModel) => {
                        storedUrls.forEach((storedUrl) => {
                            if (storedUrl == imageModel.imageUrl) {
                                imageModel.isChecked = true;
                            }
                        });
                    });
                }

                dispatch({
                    type: FileManagerActionType.ADD_FILES,
                    payload: { files: imageModels, index: undefined },
                });
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching or processing data:", error);
            setLoading(false);
        }
    };

    const searchParams = { filesDir: DefFileDir, locale: DefLocale, selected: DefSelected };

    useEffect(() => {
        const dirParam = searchParams.filesDir;
        const localeParam = searchParams.locale;
        const selectedParam = searchParams.selected;
        setHasLargeFiles(false);
        if (dirParam !== null) {
            setDir(dirParam);
        }
        if (localeParam !== null) {
            setLocale(localeParam);
        }
        if (selectedParam !== null) {
            setSelected(selectedParam);
        }
        if (dir && locale) {
            fetchData();
        }
        
    }, [dir, locale]);

    const handleSave = async () => {
        const hasLargeFiles = state.files.some(file => !file.isApiImage && file.size > 1048576);

        if (hasLargeFiles) {
            toast.warn("لا يمكن الحفظ يوجد صور اكبر من 1 ميجا بايت.");
            return;
        }

        const savePayload = state.files.filter((file) => !file.isApiImage);
        
        console.log("FROM IMAGE MANAGER", savePayload, state)
        if (savePayload.length > 0) {
            try {
                setLoading(true);
                const response = await FilesDataSource.addFilesFromDataSource(params, savePayload);
                if (response["status"] == true) {
                    const res = response["output"];
                    res.forEach((resUrl) => {
                        const url = new URL(resUrl.uri);
                        const imageName = url.pathname.split("/").pop();
                        state.files.map((file, index) => {
                            if (file.id == imageName) {
                                file.imageUrl = resUrl.uri;
                                dispatch({
                                    type: FileManagerActionType.UPDATE_FILE,
                                    payload: { files: [file], index },
                                });
                            }
                        });
                    });
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        sendDataToFlutter();
    };

    const handleDelete = async () => {
        const apiRemovedImages = state.files.filter((file) => file.isApiImage && file.isChecked);
        if (apiRemovedImages.length > 0) {
            try {
                setLoading(true);
                const imageNames = [];
                apiRemovedImages.map((file) => imageNames.push(file.imageUrl));

                await FilesDataSource.deleteFilesFromDataSource(params, imageNames);
                dispatch({
                    type: FileManagerActionType.UPDATE_FILES,
                    payload: { files: apiRemovedImages, index: undefined },
                });
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        const localRemovedImages = state.files.filter((file) => !file.isApiImage && file.isChecked);

        dispatch({
            type: FileManagerActionType.UPDATE_FILES,
            payload: { files: localRemovedImages, index: undefined },
        });
    };

    const sendDataToFlutter = () => {
        const FinalCheckedFiles = state.files.filter((file) => file.isChecked)
        localStorage.setItem("myData", JSON.stringify(FinalCheckedFiles.map((checkedFile) => checkedFile.imageUrl)));
        handleSaveImages(FinalCheckedFiles);
        setOpenImageManager(false);
    };

    return (
        <div className="" style={{ height: "100vh", overflowY: 'scroll', overflowX: 'hidden', borderRadius: '10px' , border: '1px solid #E5E5E5' }}>
            {loading ? <Loader /> : null}
            <TakeMeBar title="ادارة الصور" route="/" setOpenImageManager={setOpenImageManager} ></TakeMeBar>

            {checkedFiles.length > 0 ? (
                <Slider></Slider>
            ) : (
                <DefaultImage></DefaultImage>
            )}

            <ImageThumbnails></ImageThumbnails>

            <div
                className="d-flex flex-row justify-content-center align-items-center gap-3 bg-white z-0 pt-5 "
                style={{ height: "auto", width: "100%" }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                    multiple
                />
                <RoundedEdgeSquareButton
                    onButtonClick={handleDelete}
                    imageurl={trash}
                    isAlert={true}
                    label="حذف"
                ></RoundedEdgeSquareButton>
                <RoundedEdgeSquareButton
                    onButtonClick={() => {
                        dispatch({
                            type: FileManagerActionType.UNSELECT_ALL,
                            payload: { files: [], index: undefined },
                        });
                    }}
                    imageurl={deleteAll}
                    isAlert={false}
                    label="الغاء تحديد "
                ></RoundedEdgeSquareButton>
                <RoundedEdgeSquareButton
                    onButtonClick={() => {
                        dispatch({
                            type: FileManagerActionType.SELECT_ALL,
                            payload: { files: [], index: undefined },
                        });
                    }}
                    imageurl={checkAll}
                    isAlert={false}
                    label="تحديد الكل"
                ></RoundedEdgeSquareButton>
                <RoundedEdgeSquareButton
                    onButtonClick={handleImagePicker}
                    imageurl={gallery}
                    isAlert={false}
                    label="الجاليري"
                ></RoundedEdgeSquareButton>
                <RoundedEdgeSquareButton
                    onButtonClick={handleSave}
                    imageurl={done}
                    isAlert={false}
                    label=" حفظ"
                    disabled={hasLargeFiles}
                ></RoundedEdgeSquareButton>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ImageManager;