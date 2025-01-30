import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";
import DataUriToFile from '../Utils/DataToFile';
import { FileManagerActionType } from '../reducers/FileReducer';

const ImageCropper = NiceModal.create(({ image, index, dispatch }) => {
    const cropperRef = useRef(null);

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const croppedImageDataURL = cropper.getCroppedCanvas().toDataURL();
            image.file = croppedImageDataURL;
            dispatch({ type: FileManagerActionType.UPDATE_FILE, payload: { files: [image], index } });
            modal.hide(); // Hide the modal after cropping
        }
    };

    const modal = useModal();

    return (
        <Modal
            onOk={onCrop} // Directly call onCrop when "OK" is clicked
            open={modal.visible}
            onCancel={() => modal.hide()}
            afterClose={() => modal.remove()}
            width={'90vw'}
            footer={[
                <Button key="cancel" onClick={() => modal.hide()}>
                    إلغاء
                </Button>,
                <Button key="ok" type="primary" onClick={onCrop}>
                    موافق
                </Button>,
            ]}
        >
            <div className='text-center' style={{ height: '100%', width: '100%' }}>
                <Cropper
                    initialAspectRatio={1 / 1}
                    zoomable={false}
                    dragMode='move' // Allow dragging the image 
                    aspectRatio={1 / 1}
                    src={image.file}
                    ref={cropperRef}
                />
            </div>
        </Modal>
    );
});

export default ImageCropper;