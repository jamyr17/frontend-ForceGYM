import React from 'react'

const ButtonTable = ({ ...props}) => {
    return (
        <button 
            style={{ border: 'none', margin: '10px', backgroundColor: '#000000', color: '#FFFFFF'}} 
            {...props}
        />
    )
};

export default ButtonTable;