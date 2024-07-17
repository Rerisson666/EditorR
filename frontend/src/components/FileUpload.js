import React from 'react';

const FileUpload = ({ handleFileUpload, uploadFile }) => (
    <div>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={uploadFile}>Upload</button>
    </div>
);

export default FileUpload;
