import React from 'react';
import ModalFooter from './ModalFooter';

const Modal = ({ modalData, showModal, setShowModal, isEditMode, title, children, onSubmit }) => {
    if (!showModal) return null;

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {isEditMode ? 'Editar ' + title + ' #' + (modalData.voucherNumber ? modalData.voucherNumber : 'No adjunto') : 'Añadir ' + title}
                        </h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={onSubmit}>
                            {children}
                            <ModalFooter setShowModal={setShowModal}/>
                        </form>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Modal;
