import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ActivityType, ClientType, MeanOfPayment, Role } from "./types";
import { getData } from "./services/gym";

type CommonDataStore = {
    roles: Role[]
    activityTypes: ActivityType[]
    meansOfPayment: MeanOfPayment[]
    clientTypes: ClientType[]
    fetchRoles: () => Promise<any>
    fetchMeansOfPayment: () => Promise<any>
    fetchActivityTypes: () => Promise<any>
    fetchClientTypes: () => Promise<any>
}

export const useCommonDataStore = create<CommonDataStore>()(
    devtools((set) => ({
        roles: [],
        meansOfPament: [],
        activityTypes: [],

        fetchRoles: async () => {
            const result = await getData(`${import.meta.env.VITE_URL_API}role/list`) 
            set(() => ({ roles: result.data }))
            return result
        },
        
        fetchMeansOfPayment: async () => {
            const result = await getData(`${import.meta.env.VITE_URL_API}meanOfPayment/list`) 
            set(() => ({ meansOfPayment: result.data }))
            return result
        },

        fetchActivityTypes: async () => {
            const result = await getData(`${import.meta.env.VITE_URL_API}activityType/list`)
            set(() => ({ activityTypes: result.data }))
            return result
        },

        fetchClientTypes: async () => {
            const result = await getData(`${import.meta.env.VITE_URL_API}typeClient/list`)
            set(() => ({ clientTypes: result.data.typesClient }))
            return result
        }
    })
))