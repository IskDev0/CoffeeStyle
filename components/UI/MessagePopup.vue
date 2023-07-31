<template>
<div class="bg-black bg-opacity-60 fixed h-screen w-full top-0 left-0 flex flex-col justify-center items-center">
  <div class="bg-white py-5 px-10 rounded-md">
    <h1 class="font-bold text-2xl text-center">Success</h1>
    <p class="py-3">Order accepted, wait for a call from the seller</p>
    <MainButton @click="goHome" color="blue" size="expand">Go to main</MainButton>
  </div>
</div>
</template>

<script setup lang="ts">
const goHome = () => {
  return navigateTo("/")
}
import MainButton from "~/components/UI/MainButton.vue";
</script>
