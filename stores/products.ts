import {defineStore} from "pinia";
// @ts-ignore

export const useProductsStore = defineStore('products', () => {
    const products = ref<ProductType[]>()

    const sortedProducts = ref<ProductType[]>()

    const areProductsLoading= ref<boolean>(false)

    return {
        products, sortedProducts, areProductsLoading
    }
})