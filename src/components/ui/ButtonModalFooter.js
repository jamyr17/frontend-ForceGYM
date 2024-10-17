import React from 'react';

const ButtonModalFooter = ({ action, ...props }) => {
    return (
        <>
            <button
                className="btn"
                {...props}
            >
                {action}
            </button>
        </>
    )
};

export default ButtonModalFooter;