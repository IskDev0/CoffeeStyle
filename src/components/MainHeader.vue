<template>
  <header class="header">
    <a href="/" class="header__logo">
      <img src="../assets/images/logo.svg" alt="Logo" class="header__logo-link">
    </a>
    <nav class="header__menu">
      <a href="/" class="header__menu-item">Home</a>
      <a href="#products" class="header__menu-item">Our Products</a>
      <a href="#blog" class="header__menu-item">Blog</a>
      <a href="#about" class="header__menu-item">About</a>
      <a href="#contact" class="header__menu-item">Contact</a>
      <a href="" class="header__menu-item">Styleguide</a>
    </nav>
    <div class="cart">
      <button @click="$emit('visibility', cartVisibility)" class="cart__button">
        <img src="../assets/images/cart.svg" alt="Cart">
        <p>Cart</p>
      </button>
      <span class="cart__counter">{{ cartContent.length }}</span>
    </div>
    <div @click="openMobile" class="openMobile">
      <div class="openMobile-line"></div>
    </div>
    <Transition name="slide-fade">
      <MobileMenu @closeMobile="closeMobile" :show-mobile="showMobile" v-if="showMobile"/>
    </Transition>
  </header>
</template>

<script setup>
import MobileMenu from "../components/MobileMenu.vue"
import {ref} from "vue";


let show = ref(false)
let showMobile = ref(false)


let closeMobile = () => {
  let btn = document.querySelector(".openMobile-line")
  btn.classList.remove("active")
  showMobile.value = false
}

let openMobile = () => {
  let btn = document.querySelector(".openMobile-line")
  btn.classList.toggle("active")
  showMobile.value = !showMobile.value
}

let props = defineProps({
  cartVisibility: {
    type: Boolean,
    required: true
  },
  cartContent: {
    type: Array,
    required: true
  }
})
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
