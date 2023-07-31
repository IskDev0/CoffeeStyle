import {useCartStore} from "~/stores/cart";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const cartStore = useCartStore()

    const user = useSupabaseUser()

    if (to.path === "/admin") {
        return navigateTo("/admin/dashboard")
    }

    if (to.path === "/cart/checkout" && cartStore.cartProducts.length === 0) {
        return navigateTo("/cart")
    }

})