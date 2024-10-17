import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/ui/Header';
import TableHeader from '../components/ui/TableHeader';
import Table from '../components/ui/Table'
import ButtonTable from '../components/ui/ButtonTable';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/ui/Modal'
import Label from '../components/ui/Label';
import Input from '../components/ui/Input';
import { useGetData } from '../hooks/useApi';
import { handleSubmit, handleDelete } from '../utils/formHandlers';
import { createSwal } from '../utils/swal';

const IncomeManagement = () => {    
    const { data: incomes, loading: loadingIncomes, refetchGet: refetchIncomes} = useGetData(process.env.REACT_APP_URL_API + "economicIncome/list");
    const { data: paymentMethods, loading: loadingPaymentMethods} = useGetData(process.env.REACT_APP_URL_API + "meanOfPayment/list");
    const { data: activityType, loading: loadingActivyTypes} = useGetData(process.env.REACT_APP_URL_API + "activityType/list");
    const [modalData, setModalData] = useState({
        voucherNumber: '',
        detail: '',
        idMeanOfPayment: 0,
        amount: '',
        idActivityType: 0,
        registrationDate: '',
        idUser: 1, 
        paramLoggedIdUser: 1
    });
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingIncomeId, setEditingIncomeId] = useState(null);

    // headers para la tabla
    const tableHeaders = ['#', 'COMPROBANTE', 'MONTO', 'FECHA', 'DETALLE', 'MÉTODO DE PAGO', 'TIPO DE ACTIVIDAD', 'ACCIONES'];

    //render para datos de la tabla
    const renderRow = (income, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{income.voucherNumber ? income.voucherNumber : "No adjunto"}</td>
            <td>{income.amount}</td>
            <td>{new Date(income.registrationDate).toLocaleDateString('es-ES')}</td>
            <td>{income.detail}</td>
            <td>{income.meanOfPayment.name}</td>
            <td>{income.activityType.name}</td>
            <td style={{ textAlign: 'center' }}>
                <ButtonTable className="btn btn-primary" onClick={() => activateEdit(income)}>
                    <FaEdit />
                </ButtonTable>
                <ButtonTable className="btn btn-danger" onClick={() => onDelete(income.idEconomicIncome)}>
                    <FaTrashAlt />
                </ButtonTable>
            </td>
        </tr>
    );

    const activateEdit = (income) => {
        setModalData({
            idEconomicIncome: income.idEconomicIncome,
            voucherNumber: income.voucherNumber,
            detail: income.detail,
            idMeanOfPayment: income.meanOfPayment.idMeanOfPayment,
            amount: income.amount,
            idActivityType: income.activityType.idActivityType,
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
        refetchIncomes();
    };

    const validateIncome = () => {
        if (!modalData.detail || modalData.detail.trim() === '' || 
            !modalData.idMeanOfPayment || 
            !modalData.amount || 
            !modalData.registrationDate) {

            createSwal({icon: 'error',title: '¡Faltan datos!',text: 'Por favor completa todos los campos.'});
            return false;
        }
    
        // Verifica el número de comprobante si el medio de pago es (Sinpe ocupa voucher)
        if (modalData.idMeanOfPayment === 1 && !modalData.voucherNumber) {
            createSwal({icon: 'error', title: '¡Faltan datos!', text: 'Debe adjuntar el número de comprobante.'});
            return false;
        }
    
        return true; 
    };

    const onSubmit =  (e) => {
        e.preventDefault();

        if (!validateIncome()) {
            return;
        }

        handleSubmit({
            object: 'ingreso económico',
            modalData,
            isEditMode,
            urlAdd: process.env.REACT_APP_URL_API + 'economicIncome/add',
            urlUpdate: process.env.REACT_APP_URL_API + 'economicIncome/update',
            refetchFn: refetchIncomes, 
            resetFn: resetModalData,   
            setShowModal
        });
    };

    const onDelete = (incomeId) => {
        handleDelete({
            id: incomeId,
            object: 'ingreso económico',
            urlDelete: process.env.REACT_APP_URL_API + 'economicIncome/delete',
            refetchFn: refetchIncomes,
            loggedUserId: 1 
        });
    };

    return (
        <div style={{ background: '#000000', color: 'rgb(114,115,116)' }}>
            <Header title="Ingresos"/>
            {loadingIncomes && <h1>Cargando ingresos</h1>}
            {
            <>
                <TableHeader setShowModal={setShowModal} resetModalData={resetModalData} />
                <Table 
                    headers={tableHeaders}
                    data={incomes}
                    renderRow={renderRow}
                />

                <Modal
                    modalData={modalData}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    isEditMode={isEditMode}
                    title="ingreso económico"
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
                                <Label>Método de Pago</Label><br/>
                                <select  value={modalData.idMeanOfPayment} onChange={(e) => setModalData({ ...modalData, idMeanOfPayment: e.target.value })} required>
                                    <option value="" >Seleccionar método de pago</option>
                                    {!loadingPaymentMethods && paymentMethods ? (
                                        paymentMethods.map(meanOfPayment => (
                                            <option key={meanOfPayment.idMeanOfPayment} value={meanOfPayment.idMeanOfPayment}>{meanOfPayment.name}</option>
                                        ))
                                    ) : (
                                        <option value="">Cargando métodos de pago...</option>
                                    )}
                                </select><br/><br/>
                            </div>
                            <div className="form-group">
                                <Label>Tipo de Actividad</Label><br/>
                                <select  value={modalData.idActivityType} onChange={(e) => setModalData({ ...modalData, idActivityType: e.target.value })} required>
                                    <option value="" >Seleccionar tipo de actividad</option>
                                    {!loadingActivyTypes && activityType ? (
                                        activityType.map(type  => (
                                            <option key={type.idActivityType} value={type.idActivityType}>{type.name}</option>
                                        ))
                                    ) : (
                                        <option value="">Cargando tipos de actividad...</option>
                                    )}
                                </select><br/><br/>
                            </div>
                        </>
                    }
                >
                </Modal>
            </>
            }
        </div>
    );
};

export default IncomeManagement;