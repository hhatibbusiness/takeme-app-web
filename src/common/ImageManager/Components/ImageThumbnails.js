import React from "react";
import checkMark from "../assets/Ok.png";
import { useFileManager, FileManagerActionType } from "../reducers/FileReducer";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ImageThumbnails.css"; // Import CSS for transitions

const ImageThumbnails = () => {
  const { state, dispatch } = useFileManager();
  const imageFileModels = state.files;

  const handleCheckboxChange = (index) => {
    dispatch({
      type: state.files[index].isChecked
        ? FileManagerActionType.UNCHECK_FILE
        : FileManagerActionType.CHECK_FILE,
      payload: { files: [], index },
    });
  };

  return (
    <TransitionGroup
      className="image-thumbnails d-flex flex-row justify-content-end align-items-start gap-4 pe-5"
      style={{
        flexWrap: "wrap",
        overflowY: "scroll",
        paddingTop: "2rem",
      }}
    >
      {imageFileModels.map((imageFileModel, index) => (
        <CSSTransition key={index} timeout={500} classNames="item">
          <div className="position-relative col-2">
            {imageFileModel.isChecked && (
              <div
                className="rounded-5 position-absolute z-1"
                style={{
                  width: "20px",
                  height: "20px",
                  top: "-20px",
                  left: "-5px",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                  src={checkMark}
                  alt="Check Mark"
                />
              </div>
            )}
            {imageFileModel && (
              <div style={{ width: "70px" }}>
                <input
                  style={{ display: "none" }}
                  id={`checkbox-${index}`}
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={imageFileModel.isChecked}
                />
                <label htmlFor={`checkbox-${index}`} style={{ width: "100%" }}>
                  <img
                    src={imageFileModel.file}
                    style={{
                      objectFit: "contain",
                      height: "70px",
                      width: "70px",
                    }}
                    alt=""
                  />
                </label>
              </div>
            )}
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ImageThumbnails;
