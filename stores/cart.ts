import {defineStore} from "pinia";

export const useCartStore = defineStore('cart', () => {
    let cartProducts = ref<CartProductType[]>()


    return {
        cartProducts,
    }
})