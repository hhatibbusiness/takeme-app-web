import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import NiceModal from '@ebay/nice-modal-react';

import ImageManager from './Pages/ImageManager';
import ImageCompressor from './Pages/ImageCompressor';
import { FileManagerProvider } from './reducers/FileReducer';

import ImageCompressorWrapped from './ImageCompressor';
import ImageManagerWrapped from './ImageManager';


const ManagerDataWrapper = ({ children }) => (
    <FileManagerProvider>
        <NiceModal.Provider>
            {children}
        </NiceModal.Provider>
    </FileManagerProvider>
);


export { ImageManagerWrapped, ImageCompressorWrapped, ImageManager, ImageCompressor, ManagerDataWrapper };