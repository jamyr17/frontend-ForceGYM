import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { deleteData, getData, postData, putData } from "../shared/services/gym";
import { Client, ClientDataForm } from "../shared/types";

type ClientStore = {
    clients: Client[];
    modalForm: boolean;
    modalFilter: boolean;
    modalInfo: boolean;
    activeEditingId: Client['idClient'];
    size: number;
    page: number;
    totalRecords: number;
    orderBy: string;
    directionOrderBy: string;
    searchType: number;
    searchTerm: string;
    filterByStatus: string;
    filterByDiabetes: boolean;
    filterByHypertension: boolean;
    filterByMuscleInjuries: boolean;
    filterByBoneJointIssues: boolean;
    filterByBalanceLoss: boolean;
    filterByCardiovascularDisease: boolean;
    filterByBreathingIssues: boolean;
    filterByBirthDateRangeMax: Date | null;
    filterByBirthDateRangeMin: Date | null;
    filterByClientType: number;

    fetchClients: () => Promise<any>;
    getClientById: (id: number) => void;
    addClient: (data: ClientDataForm) => Promise<any>;
    updateClient: (data: ClientDataForm) => Promise<any>;
    deleteClient: (id: number, loggedIdUser: number) => Promise<any>;

    changeSize: (newSize: number) => void;
    changePage: (newPage: number) => void;
    changeOrderBy: (newOrderBy: string) => void;
    changeDirectionOrderBy: (newDirectionOrderBy: string) => void;
    changeSearchType: (newSearchType: number) => void;
    changeSearchTerm: (newSearchTerm: string) => void;
    changeFilterByStatus: (newFilterByStatus: string) => void;
    changeFilterByDiabetes: (newFilter: boolean) => void;
    changeFilterByHypertension: (newFilter: boolean) => void;
    changeFilterByMuscleInjuries: (newFilter: boolean) => void;
    changeFilterByBoneJointIssues: (newFilter: boolean) => void;
    changeFilterByBalanceLoss: (newFilter: boolean) => void;
    changeFilterByCardiovascularDisease: (newFilter: boolean) => void;
    changeFilterByBreathingIssues: (newFilter: boolean) => void;
    changeFilterByBirthDateRangeMax: (newFilter: Date | null) => void;
    changeFilterByBirthDateRangeMin: (newFilter: Date | null) => void;
    changeFilterByClientType: (newFilter : number) => void;

    showModalForm: () => void;
    closeModalForm: () => void;
    showModalFilter: () => void;
    closeModalFilter: () => void;
    showModalInfo: () => void;
    closeModalInfo: () => void;
};

export const useClientStore = create<ClientStore>()(
    devtools((set) => ({
        clients: [],
        modalForm: false,
        modalFilter: false,
        modalInfo: false,
        activeEditingId: 0,
        size: 5,
        page: 1,
        totalRecords: 0,
        orderBy: '',
        directionOrderBy: 'DESC',
        searchType: 1,
        searchTerm: '',
        filterByStatus: '',
        filterByDiabetes: false,
        filterByHypertension: false,
        filterByMuscleInjuries: false,       
        filterByBoneJointIssues: false,
        filterByBalanceLoss: false,
        filterByCardiovascularDisease: false,
        filterByBreathingIssues: false,
        filterByBirthDateRangeMax: null,
        filterByBirthDateRangeMin: null,
        filterByClientType: 0,

        fetchClients: async () => {
            const state = useClientStore.getState();
            let newPage = state.page;
            let filters = `&searchType=${state.searchType}`;

            if (state.searchTerm !== '') {
                filters += `&searchTerm=${state.searchTerm}`;
            }
            if (state.orderBy !== '') {
                filters += `&orderBy=${state.orderBy}&directionOrderBy=${state.directionOrderBy}`;
            }
            if (state.filterByStatus !== '') {
                filters += `&filterByStatus=${state.filterByStatus}`;
            }
            

            const result = await getData(
                `${import.meta.env.VITE_URL_API}client/list?size=${state.size}&page=${state.page}${filters}`
            );

            if (state.page > (Math.trunc(result.data.totalRecords / state.size) + 1)) {
                newPage = 1;
            }

            const expenses = result.data?.clients ?? []
            const totalRecords = result.data?.totalRecords ?? 0

            set({ clients: [...expenses], totalRecords: totalRecords, page: newPage });
            return result;
        },

        getClientById: (id) => {
            set(() => ({ activeEditingId: id }));
        },

        addClient: async (data) => {
            const result = await postData(`${import.meta.env.VITE_URL_API}client/add`, data);
            return result;
        },

        updateClient: async (data) => {
            const result = await putData(`${import.meta.env.VITE_URL_API}client/update`, data);
            return result;
        },

        deleteClient: async (id, loggedIdUser) => {
            const result = await deleteData(`${import.meta.env.VITE_URL_API}client/delete/${id}`, loggedIdUser);
            return result;
        },

        changeSize: (newSize) => set(() => ({ size: newSize })),
        changePage: (newPage) => set(() => ({ page: newPage })),
        changeOrderBy: (newOrderBy) => set(() => ({ orderBy: newOrderBy })),
        changeDirectionOrderBy: (newDirectionOrderBy) => set(() => ({ directionOrderBy: newDirectionOrderBy })),
        changeSearchType: (newSearchType) => set(() => ({ searchType: newSearchType })),
        changeSearchTerm: (newSearchTerm) => set(() => ({ searchTerm: newSearchTerm })),
        changeFilterByStatus: (newFilterByStatus) => set(() => ({ filterByStatus: newFilterByStatus })),
        changeFilterByDiabetes: (newFilter) => set(() => ({ filterByDiabetes: newFilter })),
        changeFilterByHypertension: (newFilter) => set(() => ({ filterByHypertension: newFilter })),
        changeFilterByMuscleInjuries: (newFilter) => set(() => ({ filterByMuscleInjuries: newFilter })),
        changeFilterByBoneJointIssues: (newFilter) => set(() => ({ filterByBoneJointIssues: newFilter })),
        changeFilterByBalanceLoss: (newFilter) => set(() => ({ filterByBalanceLoss: newFilter })),
        changeFilterByCardiovascularDisease: (newFilter) => set(() => ({ filterByCardiovascularDisease: newFilter })),
        changeFilterByBreathingIssues: (newFilter) => set(() => ({ filterByBreathingIssues: newFilter })),
        changeFilterByBirthDateRangeMax: (newFilter) => set(() => ({ filterByBirthDateRangeMax: newFilter })),
        changeFilterByBirthDateRangeMin: (newFilter) => set(() => ({ filterByBirthDateRangeMin: newFilter })),
        changeFilterByClientType: (newFilter) => set(() => ({ filterByClientType: newFilter })),

        showModalForm: () => set(() => ({ modalForm: true })),
        closeModalForm: () => set(() => ({ modalForm: false })),
        showModalFilter: () => set(() => ({ modalFilter: true })),
        closeModalFilter: () => set(() => ({ modalFilter: false })),
        showModalInfo: () => set(() => ({ modalInfo: true })),
        closeModalInfo: () => set(() => ({ modalInfo: false }))
    }))
);

export default useClientStore;