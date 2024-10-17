import React from 'react';

const Label = ({ ...props }) => {
    return (
        <label 
            className="form-Label"
            {...props}
        />
    )
};

export default Label;