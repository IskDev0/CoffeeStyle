<template>
<div class="home-hero text-white flex flex-col items-center justify-center gap-2.5">
  <h1 class="text-xs uppercase tracking-widest">Best place to buy design</h1>
  <h2 class="text-5xl">Coffee Mugs</h2>
  <p>The most versatile furniture system ever created. Designed to fit your life, made to move and grow.</p>
  <MainButton class="mt-10" color="white"><NuxtLink to="/products">Explore Our Products</NuxtLink></MainButton>
</div>
</template>

<script setup>

import MainButton from "./UI/MainButton";
</script>

<style>
.home-hero{
  background: url("/home-hero.png") no-repeat bottom center;
  background-size: cover;
  height: 530px;
}
</style>