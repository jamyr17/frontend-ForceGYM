import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const urlAPI = 'http://localhost:7000/';

const IncomeManagement = () => {
    const [incomes, setIncomes] = useState([]);
    const [modalData, setModalData] = useState({
        voucherNumber: '',
        detail: '',
        idMeanOfPayment: 0, // Este campo se actualizará para ser un ID
        amount: '',
        idActivityType: 0,
        registrationDate: '',
        idUser: 1, 
        paramLoggedIdUser: 1
    });
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingIncomeId, setEditingIncomeId] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [activityType, setActivityType] = useState([]);

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const fetchIncomes = async () => {
        try {
            const response = await axios.get(urlAPI + 'economicIncome/list');
            setIncomes(response.data.data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
        }
    };

    const fetchPaymentMethods = async () => {
        try {
            const response = await axios.get(urlAPI + 'meanOfPayment/list');
            setPaymentMethods(response.data.data);
        } catch (error) {
            console.error('Error fetching payment methods:', error);
        }
    };

    const fetchActivityType = async () => {
        try {
            const response = await axios.get(urlAPI + 'activityType/list');
            setActivityType(response.data.data);
        } catch (error) {
            console.error('Error fetching activity types:', error);
        }
    };

    useEffect(() => {
        fetchIncomes();
        fetchPaymentMethods();
        fetchActivityType();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!modalData.detail || !modalData.idMeanOfPayment || !modalData.amount || !modalData.idActivityType || !modalData.registrationDate) {
            
            Swal.fire({
                icon: 'error',
                title: 'Faltan datos',
                text: 'Por favor completa todos los campos.',
            });
            return;
        }

        if(modalData.idMeanOfPayment==1){ // es sinpe

            if(!modalData.voucherNumber){ // si es sinpe ocupa voucher
                Swal.fire({
                    icon: 'error',
                    title: 'Faltan datos',
                    text: 'Debe adjuntar el número de comprobante.',
                });
                return;
            }

        }

        try {
            const result = await Swal.fire({
                title: isEditMode ? '¿Quieres actualizar este ingreso?' : '¿Quieres registrar este ingreso?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, confirmar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                if (isEditMode) {
                    await axios.put(urlAPI + 'economicIncome/update', modalData);
                    Swal.fire('Actualizado', 'El ingreso se actualizó con éxito.', 'success');
                } else {
                    await axios.post(urlAPI + 'economicIncome/add', modalData);
                    Swal.fire('Registrado', 'El ingreso se registró con éxito.', 'success');
                }
                fetchIncomes();
                setShowModal(false);
                resetModalData();
            }
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al guardar el ingreso.', 'error');
            console.error("Error saving income:", error);
        }
    };

    const handleDelete = async (incomeId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás deshacer esta acción.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(urlAPI + `economicIncome/delete/${incomeId}`, {
                    data: { paramLoggedIdUser: 1 }
                });
                Swal.fire('Eliminado', 'El ingreso fue eliminado con éxito.', 'success');
                fetchIncomes();
            } catch (error) {
                Swal.fire('Error', 'Ocurrió un error al eliminar el ingreso.', 'error');
                console.error('Error deleting income:', error);
            }
        }
    };

    const handleEdit = (income) => {
        setModalData({
            idEconomicIncome: income.idEconomicIncome,
            voucherNumber: income.voucherNumber,
            detail: income.detail,
            idMeanOfPayment: income.meanOfPayment.idMeanOfPayment, // Se asegura de que este valor sea el ID
            amount: income.amount,
            idActivityType: income.activityType.idActivityType, // Se asegura de que este valor sea el ID
            registrationDate: income.registrationDate,
            idUser: 1,
            paramLoggedIdUser: 1
        });
        setIsEditMode(true);
        setEditingIncomeId(income.idEconomicIncome);
        setShowModal(true);
    };

    const resetModalData = () => {
        setModalData({
            voucherNumber: '',
            detail: '',
            idMeanOfPayment: 0,
            amount: '',
            idActivityType: 0,
            registrationDate: '',
            idUser: 1,
            paramLoggedIdUser: 1
        });
        setIsEditMode(false);
        setEditingIncomeId(null);
    };

    return (
        <div style={{ background: '#000000', color: 'rgb(114,115,116)' }}>
            <div className="card" style={{ background: '#cfad04', margin: '-5px', height: '87px' }}>
                <h1 className="fw-light d-flex d-xxl-flex justify-content-start my-auto align-items-xxl-center" style={{ color: 'rgb(0,0,0)', margin: '20px', fontFamily: 'Montserrat, sans-serif' }}>
                    INGRESOS
                </h1>
            </div>

            <div className="container d-flex" style={{ margin: '10px' }}>
                <button className="btn btn-primary" type="button" style={{ color: 'rgb(0,0,0)', background: 'var(--bs-tertiary-bg)', borderColor: 'rgb(255,255,255)', fontFamily: 'Inter, sans-serif' }} onClick={() => { setShowModal(true); resetModalData(); }}>
                    + Añadir
                </button>
            </div>
            <div className="table-responsive text-start" style={{ margin: '25px', borderRadius: '8px' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>COMPROBANTE</th>
                            <th>FECHA</th>
                            <th>DETALLE</th>
                            <th>MÉTODO DE PAGO</th>
                            <th>MONTO</th>
                            <th>TIPO DE ACTIVIDAD</th>
                            <th style={{ textAlign: 'center' }}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map((income, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{income.voucherNumber ? income.voucherNumber : "No adjunto"}</td>
                                <td>{new Date(income.registrationDate).toLocaleDateString('es-ES')}</td>
                                <td>{income.detail}</td>
                                <td>{income.meanOfPayment.name}</td>
                                <td>{income.amount}</td>
                                <td>{income.activityType.name}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button className="btn btn-primary" onClick={() => handleEdit(income)} style={{ border: 'none', margin: '10px', backgroundColor: '#000000', color: '#FFFFFF' }}>
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(income.idEconomicIncome)} style={{ border: 'none', margin: '10px', backgroundColor: '#000000', color: '#FFFFFF' }}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

              {/* Modal para crear/editar ingresos */}
              {showModal && (
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEditMode ? 'Editar ingreso' : 'Añadir ingreso'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                     <div className="mb-3">
                                        <label htmlFor="voucherNumber" className="form-label">Comprobante</label>
                                        <input type="number" className="form-control" id="voucherNumber" value={modalData.voucherNumber} onChange={(e) => {
                                                const value = e.target.value;
                                                if (value >= 0) { // Asegurarse que el valor sea positivo o cero
                                                    setModalData({ ...modalData, voucherNumber: value });
                                                }
                                            }} 
                                            min="0" // Este atributo evita que se ingrese un valor negativo directamente
                                            
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="detail" className="form-label">Detalle</label>
                                        <input type="text" className="form-control" id="detail" value={modalData.detail} onChange={(e) => setModalData({ ...modalData, detail: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Método de Pago</label>
                                        <select className="form-control" value={modalData.idMeanOfPayment} onChange={(e) => setModalData({ ...modalData, idMeanOfPayment: e.target.value })} required>
                                            <option value="" >Seleccionar método de pago</option>
                                            {paymentMethods.map(method => (
                                                <option key={method.idMeanOfPayment} value={method.idMeanOfPayment}>{method.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">Monto</label>
                                        <input type="number" className="form-control" id="amount" value={modalData.amount} onChange={(e) => {
                                                const value = e.target.value;
                                                if (value >= 0) { // Asegurarse que el valor sea positivo o cero
                                                    setModalData({ ...modalData, amount: value });
                                                }
                                            }} 
                                            min="0" // Este atributo evita que se ingrese un valor negativo directamente
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tipo de Actividad</label>
                                        <select className="form-control" value={modalData.idActivityType} onChange={(e) => setModalData({ ...modalData, idActivityType: e.target.value })} required>
                                            <option value="" >Seleccionar tipo de actividad</option>
                                            {activityType.map(type => (
                                                <option key={type.idActivityType} value={type.idActivityType}>{type.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                 
                                    <div className="mb-3">
                                        <label htmlFor="registrationDate" className="form-label">Fecha de Registro</label>
                                        <input type="date" className="form-control" id="registrationDate" value={modalData.registrationDate} onChange={(e) => setModalData({ ...modalData, registrationDate: e.target.value })} max={getTodayDate()} required /> {/* Fecha máxima = hoy */}
                                    </div>
                                    <div className="modal-footer">
                                    <button 
                                        type="submit" 
                                        className="btn" 
                                        style={{ backgroundColor: '#D4A017', color: '#fff', border: 'none' }}
                                    >
                                        {isEditMode ? 'Guardar Cambios' : 'Añadir ingreso'}
                                    </button>

                                    <button 
                                        type="button" 
                                        className="btn" 
                                        style={{ backgroundColor: 'transparent', color: '#4D4D4D', border: '1px solid #000' }} 
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IncomeManagement;