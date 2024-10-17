import React from 'react';

const Input = ({ ...props }) => {
    return (
        <input 
            className="form-control" 
            {...props}
        />
    )
};

export default Input;