import { IoFilterOutline } from "react-icons/io5";
import useEconomicIncomeStore from "./Store";
import { MdOutlineCancel } from "react-icons/md";

export function FilterButton() {
    const { filterByStatus, filterByAmountRangeMin, filterByAmountRangeMax, filterByDateRangeMin, filterByDateRangeMax, showModalFilter } = useEconomicIncomeStore()
    const filteringStyles = (
        filterByStatus!='' || filterByAmountRangeMin!=0 || filterByAmountRangeMax!=0 || filterByDateRangeMin!=null || filterByDateRangeMax!=null
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
        filterByAmountRangeMin, 
        filterByAmountRangeMax, 
        filterByDateRangeMin, 
        filterByDateRangeMax, 
        changeFilterByStatus, 
        changeFilterByAmountRangeMin,
        changeFilterByAmountRangeMax,
        changeFilterByDateRangeMin, 
        changeFilterByDateRangeMax  
    } = useEconomicIncomeStore()
    const filteredStatusSelectStyles = filterByStatus!='' && ' px-0.5 rounded-full border-2 border-yellow text-yellow'
    const filteredAmountRangeStyles = (filterByAmountRangeMin!=0 && filterByAmountRangeMax!=0)  && ' px-0.5 rounded-full border-2 border-yellow text-yellow'
    const filteredDateRangeStyles = (filterByDateRangeMin !=null && filterByDateRangeMax!=null)  && ' px-0.5 rounded-full border-2 border-yellow text-yellow'

    return (
        <div className='flex flex-col gap-4'>

            <div className='flex'>
                <label htmlFor="status">Estado</label>
                <select 
                    className={'ml-8 text-center' + filteredStatusSelectStyles}
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
                        className='flex justify-end text-2xl ml-2 px-4 text-yellow'
                        onClick={() => { changeFilterByStatus('') }}
                    >
                        <MdOutlineCancel 
                            className='hover:cursor-pointer'
                        />
                    </button>
                }
            </div>

            <div className='flex gap-4 items-center'>
                <label htmlFor="amountMin">Monto</label>
                <div className="flex flex-col">
                    <label htmlFor="amountMin">Mínimo</label>
                    <input
                        className={'border-2 rounded-full' + filteredAmountRangeStyles}
                        name="amountMin"
                        id="amountMin"
                        type="number"
                        min={1}
                        value={filterByAmountRangeMin}
                        onChange={(e) => changeFilterByAmountRangeMin(+e.target.value)}
                    />
                </div>
                <div className="self-end">
                    -
                </div>
                <div className="flex flex-col">
                    <label htmlFor="amountMax">Máximo</label>
                    <input
                        className={'border-2 rounded-full' + filteredAmountRangeStyles}
                        name="amountMax"
                        id="amountMax"
                        type="number"
                        value={filterByAmountRangeMax}
                        onChange={(e) => {
                            changeFilterByAmountRangeMax(+e.target.value)
                        }}
                    />
                </div>
                
                {filterByAmountRangeMin!=0 && filterByAmountRangeMax!=0 && 
                    <button
                        className='flex justify-end text-2xl ml-2 px-4 text-yellow'
                        onClick={() => { 
                            changeFilterByAmountRangeMin(0) 
                            changeFilterByAmountRangeMax(0)
                        }}
                    >
                        <MdOutlineCancel 
                            className='hover:cursor-pointer'
                        />
                    </button>
                }
            </div>

            <div className='flex gap-4 items-center'>
                <label htmlFor="dateMin">Fecha</label>
                <div className="flex flex-col">
                    <label htmlFor="dateMin">Inicio</label>
                    <input
                        className={'border-2 rounded-full' + filteredDateRangeStyles}
                        name="dateMin"
                        id="dateMin"
                        type="date"
                        min={'2010-01-01'}
                        max={new Date().toISOString().split('T')[0]}
                        value={filterByDateRangeMin ? filterByDateRangeMin.toISOString().split('T')[0] : ''}
                        onChange={(e) => changeFilterByDateRangeMin(new Date(e.target.value))}
                    />
                </div>
                <div className="self-end">
                    -
                </div>
                <div className="flex flex-col">
                    <label htmlFor="dateMax">Final</label>
                    <input
                        className={'border-2 rounded-full' + filteredDateRangeStyles}
                        name="dateMax"
                        id="dateMax"
                        type="date"
                        min={'2010-01-01'}
                        max={new Date().toISOString().split('T')[0]}
                        value={filterByDateRangeMax ? filterByDateRangeMax.toISOString().split('T')[0] : ''}
                        onChange={(e) => {
                            changeFilterByDateRangeMax(new Date(e.target.value))
                        }}
                    />
                </div>
                
                {filterByDateRangeMin!=null && filterByDateRangeMax!=null && 
                    <button
                        className='flex justify-end text-2xl ml-2 px-4 text-yellow'
                        onClick={() => { 
                            changeFilterByDateRangeMin(null) 
                            changeFilterByDateRangeMax(null)
                        }}
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
