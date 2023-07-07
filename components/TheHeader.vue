<template>
  <header class="flex items-center justify-between py-6 fixed top-0 right-0 left-0 z-20 bg-white shadow-xl px-20 text-[#1D1F2E]">
    <NuxtLink to="/"><img src="/logo.svg" alt="Logo"></NuxtLink>
    <nav>
      <ul class="flex items-center gap-8">
        <li class="text-xs uppercase tracking-widest transition ease-in-out duration-300 relative hover-link">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="text-xs uppercase tracking-widest transition ease-in-out duration-300 relative hover-link">
          <NuxtLink to="/products">Our Products</NuxtLink>
        </li>
        <li class="text-xs uppercase tracking-widest transition ease-in-out duration-300 relative hover-link">
          <NuxtLink to="/blogs">Blog</NuxtLink>
        </li>
        <li class="text-xs uppercase tracking-widest transition ease-in-out duration-300 relative hover-link">
          <NuxtLink>About</NuxtLink>
        </li>
        <li class="text-xs uppercase tracking-widest transition ease-in-out duration-300 relative hover-link">
          <NuxtLink to="/contact">Contact</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-3">
        <NuxtLink class="flex items-center gap-4" to="/cart"><img src="/cart.svg" alt="cart">
        <span class="text-xs uppercase tracking-widest">Cart</span>
        <span class="bg-[#1D1F2E] px-2 py-0.5 rounded-full text-white">{{cartStore.cartProducts.length}}</span>
        </NuxtLink>
      </div>
      <NuxtLink to="/profile"><img src="/user.svg" alt="user"></NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/cart";
const cartStore = useCartStore()
</script>

<style>
.hover-link:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background-color: #1D1F2E;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.hover-link:hover:after {
  transform: scaleX(1);
}
</style>