// @ts-ignore
import {VueTelInput} from "vue-tel-input";
import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VueTelInput', VueTelInput)
})