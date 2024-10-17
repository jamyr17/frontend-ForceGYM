import React from 'react';

const TableHeader = ({ setShowModal, resetModalData }) => {
    return (
        <div className="container d-flex" style={{ margin: '10px' }}>
            <button 
                className="btn btn-primary" 
                type="button" 
                style={{ 
                    color: 'rgb(0,0,0)', 
                    background: 'var(--bs-tertiary-bg)', 
                    borderColor: 'rgb(255,255,255)', 
                    fontFamily: 'Inter, sans-serif' 
                }} 
                onClick={() => { setShowModal(true); resetModalData(); }}>
                + Añadir
            </button>
        </div>
    )
};

export default TableHeader;