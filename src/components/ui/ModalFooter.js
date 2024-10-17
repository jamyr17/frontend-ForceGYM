import React from 'react';
import ButtonModalFooter from './ButtonModalFooter';

const ModalFooter = ({ setShowModal }) => {
    return (
        <>
            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ButtonModalFooter
                    type="button"
                    style={{ backgroundColor: 'transparent', color: '#4D4D4D', border: '1px solid #000' }}
                    onClick={() => setShowModal(false)}
                    action="Cancelar"
                />
                <ButtonModalFooter
                    type="submit"
                    style={{ backgroundColor: '#D4A017', color: '#fff', border: 'none' }}
                    action="Guardar"
                />
            </div>
        </>
    )
};

export default ModalFooter;