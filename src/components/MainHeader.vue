<template>
  <header class="header">
    <a href="/" class="header__logo">
      <img src="../assets/images/logo.svg" alt="Logo" class="header__logo-link">
    </a>
    <nav class="header__menu">
      <a href="/" class="header__menu-item">Home</a>
      <a href="#products" class="header__menu-item">Our Products</a>
      <a href="" class="header__menu-item">Blog</a>
      <a href="" class="header__menu-item">About</a>
      <a href="" class="header__menu-item">Contact</a>
      <a href="" class="header__menu-item">Styleguide</a>
    </nav>
    <div class="cart">
      <button @click="$emit('test', cart_visibility)" class="cart__button">
        <img src="../assets/images/cart.svg" alt="Cart">
        <p>Cart</p>
      </button>
      <span class="cart__counter">0</span>
    </div>
  </header>
</template>

<script setup>
let props = defineProps({
  cart_visibility: {
    type: Boolean,
    required: true
  }
})
</script>
