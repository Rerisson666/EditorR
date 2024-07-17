import React from 'react';

const RowActions = ({ modifyData }) => (
    <div>
        <button onClick={() => modifyData({ remove_rows: [0] })}>Remove Row</button>
        <button onClick={() => modifyData({ add_rows: [{}] })}>Add Row</button>
    </div>
);

export default RowActions;
