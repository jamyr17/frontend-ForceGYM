import { IoFilterOutline } from "react-icons/io5";
import useClientStore from "./Store";
import { MdOutlineCancel } from "react-icons/md";

export function FilterButton() {
    const { 
        showModalFilter,
        filterByStatus, 
        filterByBalanceLoss,
        filterByBoneJointIssues,
        filterByBreathingIssues,
        filterByCardiovascularDisease,
        filterByDiabetes,
        filterByMuscleInjuries,
        filterByHypertension,
        filterByBirthDateRangeMax,
        filterByBirthDateRangeMin,
        filterByClientType
    } = useClientStore()
    const filteringStyles = (
        filterByStatus!='' || filterByBalanceLoss!=false || filterByBoneJointIssues!=false || filterByBreathingIssues!=false || filterByCardiovascularDisease!=false
        || filterByDiabetes!=false || filterByMuscleInjuries!=false || filterByHypertension!=false || filterByBirthDateRangeMax!=null || filterByBirthDateRangeMin!=null
        || filterByClientType!=0
    ) && ' bg-white outline-none'

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

export function FilterSelect() {
    const { 
        filterByStatus, 
        filterByBalanceLoss,
        filterByBoneJointIssues,
        filterByBreathingIssues,
        filterByCardiovascularDisease,
        filterByDiabetes,
        filterByMuscleInjuries,
        filterByHypertension,
        filterByBirthDateRangeMax,
        filterByBirthDateRangeMin,
        filterByClientType,
        changeFilterByBalanceLoss,
        changeFilterByBirthDateRangeMax,
        changeFilterByBirthDateRangeMin,
        changeFilterByBoneJointIssues,
        changeFilterByBreathingIssues,
        changeFilterByCardiovascularDisease,
        changeFilterByClientType,
        changeFilterByDiabetes,
        changeFilterByHypertension,
        changeFilterByMuscleInjuries,
        changeFilterByStatus,
    } = useClientStore()
    const filteredStatusSelectStyles = filterByStatus!='' && ' px-0.5 border-yellow text-yellow'
    const filteredBirthDateRangeStyles = (filterByBirthDateRangeMin !=null && filterByBirthDateRangeMax!=null)  && ' px-0.5 border-yellow text-yellow'

    return (
        <div className="flex flex-col gap-4">
            {/* Filtro por Estado */}
            <div className="flex items-center gap-4">
                <label htmlFor="status" className="w-20">Estado</label>
                <select 
                    className={'border rounded-md p-2 w-78 text-center' + filteredStatusSelectStyles}
                    name="status"
                    id="status"
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
                        className="text-2xl text-yellow"
                        onClick={() => { changeFilterByStatus('') }}
                    >
                        <MdOutlineCancel className="hover:cursor-pointer" />
                    </button>
                }
            </div>
    
            {/* Filtro por diabetes */}
            <div className="flex items-center gap-4">
                <label className="w-20">Diabetes</label>
                <div className="flex items-center gap-2">
                    <label className="w-20" htmlFor="diabetesYes">Sí</label>
                    <input
                        id="diabetesYes"
                        type="radio"
                    />
                    
                    <label className="w-20" htmlFor="diabetesNo">No</label>
                    <input
                        id="diabetesNo"
                        type="radio"
                    />
                </div>
            </div>
    
            {/* Filtro por Fecha de nacimientp*/}
            <div className="flex items-center gap-4">
                <label className="w-20">Fecha de nacimiento</label>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="dateMin" className="text-sm">Inicio</label>
                        <input
                            className={'border-2 w-36 p-1 text-center' + filteredBirthDateRangeStyles}
                            name="dateMin"
                            id="dateMin"
                            type="date"
                            min={'2010-01-01'}
                            max={new Date().toISOString().split('T')[0]}
                            value={filterByBirthDateRangeMin ? filterByBirthDateRangeMin.toISOString().split('T')[0] : ''}
                            onChange={(e) => changeFilterByBirthDateRangeMin(new Date(e.target.value))}
                        />
                    </div>
                    <span>-</span>
                    <div className="flex flex-col">
                        <label htmlFor="dateMax" className="text-sm">Final</label>
                        <input
                            className={'border-2 w-36 p-1 text-center' + filteredBirthDateRangeStyles}
                            name="dateMax"
                            id="dateMax"
                            type="date"
                            min={'2010-01-01'}
                            max={new Date().toISOString().split('T')[0]}
                            value={filterByBirthDateRangeMax ? filterByBirthDateRangeMax.toISOString().split('T')[0] : ''}
                            onChange={(e) => changeFilterByBirthDateRangeMax(new Date(e.target.value))}
                        />
                    </div>
                    {(filterByBirthDateRangeMin !== null || filterByBirthDateRangeMax !== null) && 
                        <button
                            className="text-2xl text-yellow"
                            onClick={() => { 
                                changeFilterByBirthDateRangeMin(null) 
                                changeFilterByBirthDateRangeMax(null)
                            }}
                        >
                            <MdOutlineCancel className="hover:cursor-pointer" />
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
