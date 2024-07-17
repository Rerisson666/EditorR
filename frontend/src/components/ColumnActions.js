import React from 'react';

const ColumnActions = ({ modifyData }) => (
    <div>
        <button onClick={() => modifyData({ remove_columns: ['column1'] })}>Remove Column</button>
        <button onClick={() => modifyData({ add_columns: ['new_column'] })}>Add Column</button>
    </div>
);

export default ColumnActions;
