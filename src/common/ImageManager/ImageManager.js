import React from "react";
import ImageManager from "./Pages/ImageManager.js";
import { FileManagerProvider } from "./reducers/FileReducer";
import NiceModal from '@ebay/nice-modal-react';

export default function ImageManagerWrapped({ DefFileDir, DefLocale, DefSelected, setOpenImageManager, handleSaveImages }) {
  return (
    <FileManagerProvider>
        <NiceModal.Provider>
            <ImageManager 
                DefFileDir={DefFileDir} 
                DefLocale={DefLocale}
                DefSelected={DefSelected}
                setOpenImageManager={setOpenImageManager}
                handleSaveImages={handleSaveImages} 
            />
        </NiceModal.Provider>
    </FileManagerProvider>
  );
}