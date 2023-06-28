import {defineStore} from "pinia";
import productsList from "/products.json"

export const useProductsStore = defineStore('products', () => {
    const products = ref<ProductType[]>(productsList)

    const sortedProducts = ref<ProductType[]>()

    return {
        products, sortedProducts
    }
})