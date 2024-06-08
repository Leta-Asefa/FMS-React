import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { Document, Page, pdfjs } from 'react-pdf';
import { UserContext } from '../Context/UserContext';

// Set the workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileViewerModal = ({ isOpen, onRequestClose, fileUrl, fileType, fileName }) => {
    const [downloadPermission, setDownloadPermission] = useState(false);
    const {isEnglish}=useContext(UserContext)

    
    const renderFile = () => {
        if (!fileUrl) return null;

        if (fileType.startsWith('image/')) {
            return <img src={fileUrl} alt={fileName} className='mt-4 mx-auto' />
        }

        else if (fileType === 'application/pdf') {
            return (

                <iframe
                    src={fileUrl}
                    title={fileName}
                    style={{ width: '100%', height: '100%' }}
                />
            );
        }

        else {
            if (downloadPermission) {
                // Start downloading the document
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setDownloadPermission(false)
            }
            else {
                // Request permission to download
                return (
                    <div className=' mx-auto w-96 bg-gray-700 mt-10  p-10 rounded-xl my-auto'>
                        <p className='text-xl font-bold text-white' >
    {isEnglish ? " This document requires download permission. Do you want to download it?" : "ይህንን ፋይል ማውረድ ይፈልጋሉን ?"}
   </p>
                        <button className='mt-4 bg-blue-500 hover:bg-blue-600 p-3 text-white rounded mx-auto text-center' onClick={() => setDownloadPermission(true)}>
    {isEnglish ? "Download" : "አውርደው"}
    </button>
                    </div>
                );
            }
        }


        return <div>Unsupported file type</div>;
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="File Viewer"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '95%',
                    height: '95%',
                    backgroundColor: '#1f2937',
                    padding: '5px'
                }
            }}
        >
            <button onClick={onRequestClose} className='flex float-end'>
                <img src='/close.svg' className='w-5 h-5 bg-white' />
            </button>
            {renderFile()}
        </Modal>
    );
};

export default FileViewerModal;
