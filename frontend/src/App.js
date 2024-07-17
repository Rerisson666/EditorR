import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import DataView from './components/DataView';
import ColumnActions from './components/ColumnActions';
import RowActions from './components/RowActions';
import ExportButton from './components/ExportButton';

function App() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFile = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/upload', formData)
            .then(response => {
                console.log(response.data.message);
                fetchData();
            })
            .catch(error => {
                console.error('There was an error uploading the file!', error);
            });
    };

    const fetchData = () => {
        axios.get('/data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    };

    const modifyData = (modifications) => {
        axios.post('/modify', modifications)
            .then(response => {
                console.log(response.data.message);
                fetchData();
            })
            .catch(error => {
                console.error('There was an error modifying the data!', error);
            });
    };

    const exportData = (format) => {
        axios.post('/export', { format: format }, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `export.${format}`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error('There was an error exporting the data!', error);
            });
    };

    return (
        <div className="App">
            <h1>File Editor</h1>
            <FileUpload handleFileUpload={handleFileUpload} uploadFile={uploadFile} />
            {data && <DataView data={data} />}
            <ColumnActions modifyData={modifyData} />
            <RowActions modifyData={modifyData} />
            <ExportButton exportData={exportData} />
        </div>
    );
}

export default App;
