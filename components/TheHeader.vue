<template>
  <header class="px-4 flex items-center justify-between py-6 fixed top-0 right-0 left-0 z-20 bg-white shadow-xl sm:px-20 text-[#1D1F2E]">
    <NuxtLink to="/"><img src="/icons/logo.svg" alt="Logo"></NuxtLink>
    <nav class="hidden lg:block">
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
          <NuxtLink to="/about">About</NuxtLink>
        </li>
        <li class="text-xs uppercase tracking-widest transition ease-in-out duration-300 relative hover-link">
          <NuxtLink to="/contact">Contact</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex items-center gap-5">
      <div class="flex items-center gap-3">
        <NuxtLink class="flex items-center gap-4" to="/cart"><img src="/icons/cart.svg" alt="cart">
        <span class="text-xs uppercase tracking-widest">Cart</span>
        <span class="bg-[#1D1F2E] px-2 py-0.5 rounded-full text-white">{{cartStore.cartProducts.length}}</span>
        </NuxtLink>
      </div>
      <NuxtLink to="/profile"><img src="/icons/profile.svg" alt="user"></NuxtLink>
        <button @click="$emit('open', true)" class="relative z-50 group lg:hidden">
          <div class="flex flex-col gap-2">
            <span class="h-[2px] bg-black w-6"></span>
            <span class="h-[2px] bg-black w-6"></span>
            <span class="h-[2px] bg-black w-6"></span>
          </div>
        </button>
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