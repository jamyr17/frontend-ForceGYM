import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const urlAPI = 'http://localhost:7000/';

const ExpenseManagement = () => {
    const [expenses, setExpenses] = useState([]);
    const [meanOfPayments, setMeanOfPayments] = useState([]); // Estado para métodos de pago
    const [modalData, setModalData] = useState({
        voucherNumber: '',
        detail: '',
        idMeanOfPayment: 0,
        amount: '',
        registrationDate: '',
        idUser: 1,
        paramLoggedIdUser: 1
    });
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingExpenseId, setEditingExpenseId] = useState(null);

    // Función para obtener la fecha de hoy en formato YYYY-MM-DD
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    // Función para obtener gastos desde el servidor
    const fetchExpenses = async () => {
        try {
            const response = await axios.get(urlAPI + 'economicExpense/list');
            setExpenses(response.data.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    // Función para obtener métodos de pago
    const fetchMeanOfPayments = async () => {
        try {
            const response = await axios.get(urlAPI + 'meanOfPayment/list'); // Cambia esto por la URL de tu API de métodos de pago
            setMeanOfPayments(response.data.data);
        } catch (error) {
            console.error('Error fetching mean of payments:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchMeanOfPayments(); // Llamar a la función para obtener métodos de pago
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!modalData.detail || !modalData.idMeanOfPayment || !modalData.amount || !modalData.registrationDate) {
            Swal.fire({
                icon: 'error',
                title: 'Faltan datos',
                text: 'Por favor completa todos los campos.',
            });
            return;
        }

        try {
            const result = await Swal.fire({
                title: isEditMode ? '¿Quieres actualizar este gasto?' : '¿Quieres registrar este gasto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, confirmar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                if (isEditMode) {
                    await axios.put(urlAPI + 'economicExpense/update', modalData);
                    Swal.fire('Actualizado', 'El gasto se actualizó con éxito.', 'success');
                } else {
                    await axios.post(urlAPI + 'economicExpense/add', modalData);
                    Swal.fire('Registrado', 'El gasto se registró con éxito.', 'success');
                }
                fetchExpenses();
                setShowModal(false);
                resetModalData();
            }
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error al guardar el gasto.', 'error');
            console.error("Error saving expense:", error);
        }
    };

    const handleDelete = async (expenseId) => {
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
                await axios.delete(urlAPI + `economicExpense/delete/${expenseId}`, {
                    data: { paramLoggedIdUser: 1 }
                });
                Swal.fire('Eliminado', 'El gasto fue eliminado con éxito.', 'success');
                fetchExpenses();
            } catch (error) {
                Swal.fire('Error', 'Ocurrió un error al eliminar el gasto.', 'error');
                console.error('Error deleting expense:', error);
            }
        }
    };

    const handleEdit = (expense) => {
        setModalData({
            idEconomicExpense: expense.idEconomicExpense,
            voucherNumber: expense.voucherNumber,
            detail: expense.detail,
            idMeanOfPayment: expense.meanOfPayment.idMeanOfPayment,
            amount: expense.amount,
            registrationDate: expense.registrationDate,
            idUser: 1,
            paramLoggedIdUser: 1
        });
        setIsEditMode(true);
        setEditingExpenseId(expense.idEconomicExpense);
        setShowModal(true);
    };
    

    const resetModalData = () => {
        setModalData({
            voucherNumber: '',
            detail: '',
            idMeanOfPayment:0,
            amount: '',
            registrationDate: '',
            idUser: 1,
            paramLoggedIdUser: 1
        });
        setIsEditMode(false);
        setEditingExpenseId(null);
    };

    return (
        <div style={{ background: '#000000', color: 'rgb(114,115,116)' }}>
            <div className="card" style={{ background: '#cfad04', margin: '-5px', height: '87px' }}>
                <h1 className="fw-light d-flex d-xxl-flex justify-content-start my-auto align-items-xxl-center" style={{ color: 'rgb(0,0,0)', margin: '20px', fontFamily: 'Montserrat, sans-serif' }}>
                    GASTOS
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
                            <th style={{ textAlign: 'center' }}>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{expense.voucherNumber ? expense.voucherNumber : "No adjunto"}</td>
                                <td>{new Date(expense.registrationDate).toLocaleDateString('es-ES')}</td>
                                <td>{expense.detail}</td>
                                <td>{expense.meanOfPayment.name}</td>
                                <td>{expense.amount}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button className="btn btn-primary" onClick={() => handleEdit(expense)} style={{border: 'none', margin: '10px', backgroundColor: '#000000', color: '#FFFFFF' }}>
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(expense.idEconomicExpense)} style={{border:'none', margin: '10px', backgroundColor: '#000000', color: '#FFFFFF' }}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

             {/* Modal para crear/editar gastos */}
             {showModal && (
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{isEditMode ? 'Editar gasto' : 'Añadir gasto'}</h5>
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
                                    <div className="mb-3">
                                        <label className="form-label">Método de Pago</label>
                                        <select className="form-select" value={modalData.idMeanOfPayment} onChange={(e) => setModalData({ ...modalData, idMeanOfPayment: e.target.value })}>
                                            <option value="">Seleccionar método de pago</option>
                                            {meanOfPayments.map((payment) => (
                                                <option key={payment.id} value={payment.idMeanOfPayment}>{payment.name}</option> // Ajusta según la estructura de tu API
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
                                        {isEditMode ? 'Guardar Cambios' : 'Añadir Gasto'}
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

export default ExpenseManagement;