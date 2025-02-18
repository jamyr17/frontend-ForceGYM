import { IoFilterOutline } from "react-icons/io5";
import useProductInventoryStore from "./Store";
import { MdOutlineCancel } from "react-icons/md";

export function FilterButton() {
    const { filterByStatus, filterByCostRangeMin, filterByCostRangeMax, filterByQuantityRangeMin, filterByQuantityRangeMax, showModalFilter } = useProductInventoryStore()
    const filteringStyles = (
        filterByStatus!='' || filterByCostRangeMin!=0 || filterByCostRangeMax!=0 || filterByQuantityRangeMin!=0 || filterByQuantityRangeMax!=0
    ) && 'bg-white outline-none'

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
        filterByCostRangeMin, 
        filterByCostRangeMax, 
        filterByQuantityRangeMin, 
        filterByQuantityRangeMax, 
        changeFilterByStatus, 
        changeFilterByCostRangeMin,
        changeFilterByCostRangeMax,
        changeFilterByQuantityRangeMin,
        changeFilterByQuantityRangeMax
    } = useProductInventoryStore()
    const filteredStatusSelectStyles = filterByStatus!='' && ' px-0.5 rounded-full border-2 border-yellow text-yellow'
    const filteredQuantityRangeStyles = (filterByCostRangeMin!=0 && filterByCostRangeMax!=0)  && ' px-0.5 rounded-full border-2 border-yellow text-yellow'
    const filteredCostRangeStyles = (filterByQuantityRangeMin !=null && filterByQuantityRangeMax!=null)  && ' px-0.5 rounded-full border-2 border-yellow text-yellow'

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
                <label htmlFor="costMin">Costo</label>
                <div className="flex flex-col">
                    <label htmlFor="costMin">Mínimo</label>
                    <input
                        className={'border-2 rounded-full' + filteredCostRangeStyles}
                        name="costMin"
                        id="costMin"
                        type="number"
                        min={1}
                        onChange={(e) => changeFilterByCostRangeMin(+e.target.value)}
                    />
                </div>
                <div className="self-end">
                    -
                </div>
                <div className="flex flex-col">
                    <label htmlFor="costMax">Máximo</label>
                    <input
                        className={'border-2 rounded-full' + filteredCostRangeStyles}
                        name="costMax"
                        id="costMax"
                        type="number"
                        onChange={(e) => {
                            if(Number((document.getElementById('costMin') as HTMLInputElement).value) < +e.target.value){
                                changeFilterByCostRangeMax(+e.target.value)
                            }
                        }}
                    />
                </div>
                
                {filterByCostRangeMin!=0 && filterByCostRangeMax!=0 && 
                    <button
                        className='flex justify-end text-2xl ml-2 px-4 text-yellow'
                        onClick={() => { 
                            changeFilterByCostRangeMin(0) 
                            changeFilterByCostRangeMax(0)
                        }}
                    >
                        <MdOutlineCancel 
                            className='hover:cursor-pointer'
                        />
                    </button>
                }
            </div>

            <div className='flex gap-4 items-center'>
                <label htmlFor="quantityMin">Cantidad</label>
                <div className="flex flex-col">
                    <label htmlFor="quantityMin">Mínima</label>
                    <input
                        className={'border-2 rounded-full' + filteredQuantityRangeStyles}
                        name="quantityMin"
                        id="quantityMin"
                        type="number"
                        min={1}
                        onChange={(e) => changeFilterByQuantityRangeMin(+e.target.value)}
                    />
                </div>
                <div className="self-end">
                    -
                </div>
                <div className="flex flex-col">
                    <label htmlFor="quantityMax">Máxima</label>
                    <input
                        className={'border-2 rounded-full' + filteredQuantityRangeStyles}
                        name="quantityMax"
                        id="quantityMax"
                        type="number"
                        onChange={(e) => {
                            if(Number((document.getElementById('quantityMin') as HTMLInputElement).value) < +e.target.value){
                                changeFilterByQuantityRangeMax(+e.target.value)
                            }
                        }}
                    />
                </div>
                
                {filterByQuantityRangeMin!=0 && filterByQuantityRangeMax!=0 && 
                    <button
                        className='flex justify-end text-2xl ml-2 px-4 text-yellow'
                        onClick={() => { 
                            changeFilterByQuantityRangeMin(0) 
                            changeFilterByQuantityRangeMax(0)
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
