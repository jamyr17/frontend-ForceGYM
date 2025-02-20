import { Routes, Route, useNavigate } from "react-router";
import { useEffect } from "react";
import { setAuthHeader, setAuthUser } from "../shared/utils/authentication";
import UserManagement from "../User/Page";
import EconomicIncomeManagement from "../Income/Page";
import EconomicExpenseManagement from "../Expense/Page";
import ProductInventoryManagement from "../Product/Page";
import { useCommonDataStore } from "../shared/CommonDataStore";
import AsideBar from "../shared/components/AsideBar";

function PrivateRoutes () {
    // fetchear los datos comunes: roles, tipos de pago, etc. para solo hacerlo 1 vez
    const { fetchRoles, fetchMeansOfPayment, fetchActivityTypes } = useCommonDataStore()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async() => {
            const resultRoles = await fetchRoles()
            const resultMeansOfPayment = await fetchMeansOfPayment()
            const resultActivityTypes = await fetchActivityTypes()

            if(resultRoles.logout || resultMeansOfPayment.logout || resultActivityTypes.logout){
                setAuthHeader(null)
                setAuthUser(null)
                navigate('/login', {replace: true})
            }
        }

        fetchData()
    }, [])

    return (
        <>
        <AsideBar />
        <Routes>
            <Route 
                path="usuarios" 
                element={
                    <UserManagement/>
                }
            />
            <Route 
                path="ingresos" 
                element={
                    <EconomicIncomeManagement/>
                }
            />
            <Route 
                path="gastos" 
                element={
                    <EconomicExpenseManagement/>
                }
            />
            <Route 
                path="inventario" 
                element={
                    <ProductInventoryManagement/>
                }
            />
        </Routes>
        </>
    );
}

export default PrivateRoutes;