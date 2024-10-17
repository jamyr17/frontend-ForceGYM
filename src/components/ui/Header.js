import React from 'react';

const Header = ({ title }) => {
    return (
        <div className="card" style={{ background: '#cfad04', margin: '-5px', height: '87px' }}>
            <h1 className="fw-light d-flex d-xxl-flex justify-content-start my-auto align-items-xxl-center" style={{ color: 'rgb(0,0,0)', margin: '20px', fontFamily: 'Montserrat, sans-serif' }}>
                {title}
            </h1>
        </div>
    )
};

export default Header;