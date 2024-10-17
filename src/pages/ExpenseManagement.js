import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Header from '../components/ui/Header';
import TableHeader from '../components/ui/TableHeader';
import Table from '../components/ui/Table';
import ButtonTable from '../components/ui/ButtonTable';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/ui/Modal';
import Label from '../components/ui/Label';
import Input from '../components/ui/Input';
import { useGetData } from '../hooks/useApi';
import { handleSubmit, handleDelete } from '../utils/formHandlers';
import { createSwal } from '../utils/swal';

const ExpenseManagement = () => {
    const { data: expenses, loading: loadingExpenses, refetchGet: refetchExpenses } = useGetData(process.env.REACT_APP_URL_API + "economicExpense/list");
    const { data: paymentMethods, loading: loadingPaymentMethods } = useGetData(process.env.REACT_APP_URL_API + "meanOfPayment/list");
    
    const [modalData, setModalData] = useState({
        voucherNumber: '',
        detail: '',
        idMeanOfPayment: 0,
        amount: '',
        registrationDate: '',
        idUser: 1,
        paramLoggedIdUser: 1,
    });
    
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingExpenseId, setEditingExpenseId] = useState(null);

    // headers para la tabla
    const tableHeaders = ['#', 'COMPROBANTE', 'MONTO', 'FECHA', 'DETALLE', 'MÉTODO DE PAGO', 'ACCIONES'];

    // render para datos de la tabla
    const renderRow = (expense, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{expense.voucherNumber ? expense.voucherNumber : "No adjunto"}</td>
            <td>{expense.amount}</td>
            <td>{new Date(expense.registrationDate).toLocaleDateString('es-ES')}</td>
            <td>{expense.detail}</td>
            <td>{expense.meanOfPayment.name}</td>
            <td style={{ textAlign: 'center' }}>
                <ButtonTable className="btn btn-primary" onClick={() => activateEdit(expense)}>
                    <FaEdit />
                </ButtonTable>
                <ButtonTable className="btn btn-danger" onClick={() => onDelete(expense.idEconomicExpense)}>
                    <FaTrashAlt />
                </ButtonTable>
            </td>
        </tr>
    );

    const activateEdit = (expense) => {
        setModalData({
            idEconomicExpense: expense.idEconomicExpense,
            voucherNumber: expense.voucherNumber,
            detail: expense.detail,
            idMeanOfPayment: expense.meanOfPayment.idMeanOfPayment,
            amount: expense.amount,
            registrationDate: expense.registrationDate,
            idUser: 1,
            paramLoggedIdUser: 1,
        });
        setIsEditMode(true);
        setEditingExpenseId(expense.idEconomicExpense);
        setShowModal(true);
    };

    const resetModalData = () => {
        setModalData({
            voucherNumber: '',
            detail: '',
            idMeanOfPayment: 0,
            amount: '',
            registrationDate: '',
            idUser: 1,
            paramLoggedIdUser: 1,
        });
        setIsEditMode(false);
        setEditingExpenseId(null);
        refetchExpenses();
    };

    const validateExpense = () => {
        if (!modalData.detail || !modalData.idMeanOfPayment || !modalData.amount || !modalData.registrationDate) {
            createSwal({icon: 'error', title: 'Faltan datos', text: 'Por favor completa todos los campos.',});
            return false;
        }

        if (modalData.idMeanOfPayment === 1 && !modalData.voucherNumber) {
            createSwal({icon: 'error', title: 'Faltan datos', text: 'Debe adjuntar el número de comprobante.'});
            return false;
        }

        return true; 
    };

    const onSubmit = (e) => {
        if (!validateExpense()) {
            return;
        }

        e.preventDefault();

        handleSubmit({
            object: 'gasto económico',
            modalData,
            isEditMode,
            urlAdd: process.env.REACT_APP_URL_API + 'economicExpense/add',
            urlUpdate: process.env.REACT_APP_URL_API + 'economicExpense/update',
            refetchFn: refetchExpenses,
            resetFn: resetModalData,
            setShowModal
        });
    };

    const onDelete = (expenseId) => {
        handleDelete({
            id: expenseId,
            object: 'gasto económico',
            urlDelete: process.env.REACT_APP_URL_API + 'economicExpense/delete',
            refetchFn: refetchExpenses,
            loggedUserId: 1 
        });
    };

    return (
        <div style={{ background: '#000000', color: 'rgb(114,115,116)' }}>
            <Header title="Gastos" />
            {loadingExpenses && <h1>Cargando gastos</h1>}
            <>
                <TableHeader setShowModal={setShowModal} resetModalData={resetModalData} />
                <Table 
                    headers={tableHeaders}
                    data={expenses}
                    renderRow={renderRow}
                />

                <Modal
                    modalData={modalData}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    isEditMode={isEditMode}
                    title="gasto económico"
                    onSubmit={onSubmit}
                    children={
                        <>
                            <div className="form-group">
                                <Label htmlFor="voucherNumber">Comprobante</Label>
                                <Input
                                    type="number"
                                    id="voucherNumber"
                                    value={modalData.voucherNumber}
                                    onChange={(e) => setModalData({ ...modalData, voucherNumber: e.target.value })}
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="amount">Monto</Label>
                                <Input
                                    type="number"
                                    id="amount"
                                    value={modalData.amount}
                                    onChange={(e) => setModalData({ ...modalData, amount: e.target.value })}
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="registrationDate">Fecha de Registro</Label>
                                <Input
                                    type="date"
                                    id="registrationDate"
                                    value={modalData.registrationDate}
                                    onChange={(e) => setModalData({ ...modalData, registrationDate: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="detail">Detalle</Label>
                                <Input
                                    type="text"
                                    id="detail"
                                    value={modalData.detail}
                                    onChange={(e) => setModalData({ ...modalData, detail: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <Label>Método de Pago</Label><br />
                                <select value={modalData.idMeanOfPayment} onChange={(e) => setModalData({ ...modalData, idMeanOfPayment: e.target.value })} required>
                                    <option value="">Seleccionar método de pago</option>
                                    {!loadingPaymentMethods && paymentMethods ? (
                                        paymentMethods.map(method => (
                                            <option key={method.idMeanOfPayment} value={method.idMeanOfPayment}>{method.name}</option>
                                        ))
                                    ) : (
                                        <option value="">Cargando métodos de pago...</option>
                                    )}
                                </select><br /><br />
                            </div>
                        </>
                    }
                >
                </Modal>
            </>
        </div>
    );
};

export default ExpenseManagement;
