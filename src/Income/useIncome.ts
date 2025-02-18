import { FormEvent } from "react"
import Swal from 'sweetalert2'
import { EconomicIncome, EconomicIncomeDataForm } from "../shared/types"
import { getAuthUser, setAuthHeader, setAuthUser } from "../shared/utils/authentication"
import useEconomicIncomeStore from "./Store"
import { useNavigate } from "react-router"

export const useEconomicIncome = () => {
    const navigate = useNavigate()
    const { fetchEconomicIncomes, deleteEconomicIncome, updateEconomicIncome, changeSearchTerm, changeOrderBy, changeDirectionOrderBy, directionOrderBy } = useEconomicIncomeStore()

    const handleDelete = async ({ idEconomicIncome, voucherNumber } : EconomicIncome) => {
        await Swal.fire({
            title: '¿Desea eliminar este ingreso económico?',
            text: `Está eliminando el ingreso con comprobante N° ${voucherNumber}`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: '#bebdbd',
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#CFAD04',
            width: 500,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const loggedUser = getAuthUser()
                const response = await deleteEconomicIncome(idEconomicIncome, loggedUser?.idUser)

                if(response.ok){
                    Swal.fire({
                        title: 'Ingreso eliminado',
                        text: `Se ha eliminado el ingreso con comprobante N° ${voucherNumber}`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 3000,
                        timerProgressBar: true,
                        width: 500,
                        confirmButtonColor: '#CFAD04'
                    })

                    fetchEconomicIncomes()
                }

                if(response.logout){
                    setAuthHeader(null)
                    setAuthUser(null)
                    navigate('/login', {replace: true})
                }
            } 
        })
    }

    const handleSearch = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const { searchTerm } = Object.fromEntries(new FormData(form))
        changeSearchTerm(searchTerm.toString())
    }

    const handleOrderByChange = (orderByTerm : string) => {
        changeOrderBy(orderByTerm)
        changeDirectionOrderBy(directionOrderBy === 'DESC' ? 'ASC' : 'DESC')
    }

    const handleRestore = async (economicIncome: EconomicIncomeDataForm) => {
        const loggedUser = getAuthUser()
        const reqEconomicIncome = {
            ...economicIncome, 
            isDeleted: 0,
            paramLoggedIdUser: loggedUser?.idUser
        }
        
        await Swal.fire({
            title: '¿Desea restaurar este ingreso económico?',
            text: `Está restaurando el ingreso con comprobante N° ${economicIncome.voucherNumber}`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: '#bebdbd',
            confirmButtonText: 'Restaurar',
            confirmButtonColor: '#CFAD04',
            width: 500,
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await updateEconomicIncome(reqEconomicIncome)

                if(response.ok){
                    Swal.fire({
                        title: 'Ingreso restaurado',
                        text: `Se ha restaurado el ingreso con comprobante N° ${economicIncome.voucherNumber}`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 3000,
                        timerProgressBar: true,
                        width: 500,
                        confirmButtonColor: '#CFAD04'
                    })
                    
                    fetchEconomicIncomes()
                }

                if(response.logout){
                    setAuthHeader(null)
                    setAuthUser(null)
                    navigate('/login', {replace: true})
                }
            } 
        })
    }

    return {
        handleDelete,
        handleSearch,
        handleOrderByChange, 
        handleRestore
    }
}
