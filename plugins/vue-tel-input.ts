// @ts-ignore
import {VueTelInput} from "vue-tel-input";
import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
    // @ts-ignore
    nuxtApp.vueApp.component('VueTelInput', VueTelInput)
})