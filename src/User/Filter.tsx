import { IoFilterOutline } from "react-icons/io5";
import useUserStore from "./Store";
import { MdOutlineCancel } from "react-icons/md";

export const FilterButton = () => {
    const { filterByStatus, filterByRole, showModalFilter } = useUserStore()
    const filteringStyles = (filterByStatus!='' || filterByRole!='') && ' bg-white outline-none' 

    return (
        <button
            className={"flex items-center gap-4 text-lg uppercase outline-2 py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-slate-300" + filteringStyles}
            onClick={()=>{ showModalFilter() }}
        >
            <IoFilterOutline />
            <span>Filtrar</span>
        </button>
    );
}

export const FilterSelect = () => {
    const { filterByStatus, filterByRole, changeFilterByStatus, changeFilterByRole  } = useUserStore()
    const filteredStatusSelectStyles = filterByStatus!='' && ' px-0.5 rounded-full border-2 border-yellow text-yellow'
    const filteredRoleSelectStyles = filterByRole!='' && ' px-0.5 rounded-full border-2 border-yellow text-yellow'

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex'>
                <label>
                    Tipo
                </label>
                <select 
                    className={'ml-8 text-center' + filteredRoleSelectStyles}
                    value={filterByRole} 
                    onChange={(e) => {
                        
                        if(Number(e.target.value) === 0){
                            changeFilterByRole('')
                        }else{
                            changeFilterByRole(e.target.value)
                        }

                    }}
                >
                    <option value={0}>Todos</option>
                    <option value={'Administrador'}>Administrador</option>
                    <option value={'Colaborador'}>Colaborador</option>
                </select>

                { filterByRole && 
                    <button
                        className='flex justify-end text-2xl ml-2 px-4 text-yellow'
                        onClick={() => { changeFilterByRole('') }}
                    >
                        <MdOutlineCancel 
                            className='hover:cursor-pointer'
                        />
                    </button>
                }

            </div>

            <div className='flex'>
                <label>
                    Estado
                </label>
                <select 
                    className={'ml-8 text-center' + filteredStatusSelectStyles}
                    value={filterByStatus} 
                    onChange={(e) => {
                        if(Number(e.target.value) === 0){
                            changeFilterByStatus('')
                        }else{
                            changeFilterByStatus(e.target.value)
                        }
                    }}
                >
                    <option value={0}> Activos </option>
                    <option value={'Inactivos'}> Inactivos </option>
                    <option value={'Todos'}> Todos </option>
                </select>

                { filterByStatus && 
                    <button
                        className='flex justify-end text-2xl ml-2 px-4 text-yellow'
                        onClick={() => { changeFilterByStatus('') }}
                    >
                        <MdOutlineCancel 
                            className='hover:cursor-pointer'
                        />
                    </button>
                }
            </div>
            
        </div>
    );
}
