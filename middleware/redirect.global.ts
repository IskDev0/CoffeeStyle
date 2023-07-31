import {useCartStore} from "~/stores/cart";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const cartStore = useCartStore()


    if (to.path === "/cart/checkout" && cartStore.cartProducts.length === 0) {
        return navigateTo("/cart")
    }

    if (to.path === "/admin") {
        return navigateTo("/admin/products")
    }

})