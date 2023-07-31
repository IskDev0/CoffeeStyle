import {defineNuxtPlugin} from "nuxt/app";
import {useVuelidate} from "@vuelidate/core";

export default defineNuxtPlugin((nuxtApp) => {
    // @ts-ignore
    nuxtApp.vueApp.use(useVuelidate)
})