import React from "react";
import ImageCompressor from "./Pages/ImageCompressor";
import { FileManagerProvider } from "./reducers/FileReducer";
import NiceModal from '@ebay/nice-modal-react';

export default function ImageCompressorWrapped() {
  return (
    <FileManagerProvider>
      <NiceModal.Provider>
        <ImageCompressor />
      </NiceModal.Provider>
    </FileManagerProvider>
  );
}
