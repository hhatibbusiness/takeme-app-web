import React, { useState, useEffect, useRef } from "react";
import dotsIcon from "../assets/option.png";
import NiceModal from "@ebay/nice-modal-react";
import ImageCropper from "./ImageCropper";
import { useFileManager } from "../reducers/FileReducer";
import { TakeMeConstants } from "../Utils/TakeMeConstants";
import { base64ToBlob, getFileSize } from "../Utils/FileUtils";
import getImageDimensions from "../Utils/ImageDimenstions";
import { Link } from "react-router-dom";

const Slider = () => {
  const { dispatch, state: fileManagerState } = useFileManager();
  const [activeSlide, setActiveSlide] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({});
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchMoveX, setTouchMoveX] = useState(0);

  const openPropFile = async () => {};

  const files = fileManagerState.files;
  const filteredFiles = files.filter((item) => item.isChecked);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (filteredFiles[activeSlide]) {
      getImageDimensions(base64ToBlob(filteredFiles[activeSlide].file))
        .then((dimensions) => {
          setImageDimensions((prevDimensions) => ({
            ...prevDimensions,
            [activeSlide]: dimensions,
          }));
        })
        .catch((error) => console.error("Error fetching image dimensions:", error));
    }
  }, [activeSlide, filteredFiles]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchMoveX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX - touchMoveX;

    if (deltaX > 50 && activeSlide < filteredFiles.length - 1) {
      setActiveSlide(activeSlide + 1);
    } else if (deltaX < -50 && activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const showAntdModal = () => {
    NiceModal.show(ImageCropper, {
      image: filteredFiles[activeSlide],
      index: files.indexOf(filteredFiles[activeSlide]),
      dispatch,
    });
  };

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div
      className="col-12 d-flex flex-column"
      style={{ width: "100%" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-inner" style={{ height: "100vw" }} ref={sliderRef}>
        {filteredFiles.map((item, index) => (
          <div
            style={{ height: "100%" }}
            key={item.id}
            className={`carousel-item ${index === activeSlide ? "active" : ""}`}
          >
            <div className="d-flex justify-content-center align-items-center" style={{ width: "100vw" }}>
              {item.file && (
                <div
                  className="col-12 d-flex justify-content-center align-items-center"
                  style={{ height: "100vw", width: "100%" }}
                >
                  <img
                    src={item.file}
                    style={{
                      height: imageDimensions[index]?.aspect === "1:1" ? "100%" : "auto",
                      width: imageDimensions[index]?.aspect === "1:1" ? "100%" : "100vw",
                      objectFit: imageDimensions[index]?.aspect === "1:1" ? "cover" : "contain",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="carousel-indicators">
          {filteredFiles.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSlideChange(index)}
              className={index === activeSlide ? "active" : ""}
              style={{
                width: "12px",
                height: "12px",
                border: "none",
                outline: "none",
                marginInline: "5px",
                borderRadius: "50%",
                backgroundColor: `${index === activeSlide
                  ? TakeMeConstants.PRIMARY_COLOR
                  : TakeMeConstants.SECONDNARY_COLOR
                }`,
              }}
            ></button>
          ))}
        </div>
      </div>
      <div className="p-3 d-flex flex-row w-100 justify-content-between align-items-center">
        <div
          className="fw-bold justify-content-start d-flex"
          style={{
            fontSize: "1rem",
            color: getFileSize(filteredFiles[activeSlide]?.size) >= 1
              ? TakeMeConstants.ALERT_COLOR
              : TakeMeConstants.PRIMARY_COLOR,
          }}
        >
          {getFileSize(filteredFiles[activeSlide]?.size).toFixed(2) + " MB"}
        </div>
        <div style={{ color: TakeMeConstants.PRIMARY_COLOR, fontSize: "13px" }}>
          {imageDimensions[activeSlide] && `${imageDimensions[activeSlide].aspect}`}
        </div>
        <div className="" style={{ width: "20px" }}>
          <div
            className="dropdown"
            style={{
              display: filteredFiles[activeSlide]?.isApiImage ? "none" : "inline-block",
            }}
          >
            <a
              className="btn btn-transparent"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ border: "none" }}
            >
              <img src={dotsIcon} alt="Dots Icon" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <a
                  className="dropdown-item"
                  href="#"
                  style={{ color: TakeMeConstants.CLICKABLE_TEXT_COLOR }}
                  onClick={showAntdModal}
                >
                  تعديل الحجم
                </a>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  style={{ color: TakeMeConstants.CLICKABLE_TEXT_COLOR }}
                  to={`/web/admin/image-compressor/${files.indexOf(filteredFiles[activeSlide])}`}
                  onClick={openPropFile}
                >
                  ضغط
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
