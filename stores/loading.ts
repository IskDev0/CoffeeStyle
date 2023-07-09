import {defineStore} from "pinia";

export const useLoadingStore = defineStore('loading', () => {

    let isActionLoading = ref<boolean>(false)

    return {
        isActionLoading
    }
})