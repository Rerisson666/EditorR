import React from 'react';

const ExportButton = ({ exportData }) => (
    <div>
        <button onClick={() => exportData('csv')}>Export as CSV</button>
        <button onClick={() => exportData('xlsx')}>Export as Excel</button>
        <button onClick={() => exportData('txt')}>Export as TXT</button>
    </div>
);

export default ExportButton;
