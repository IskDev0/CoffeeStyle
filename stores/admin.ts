import {defineStore} from "pinia";

export const useAdminStore = defineStore('admin', () => {

    let adminOrders = ref([])

    let sortedAdminOrders = ref([])

    return {
        adminOrders, sortedAdminOrders
    }
})