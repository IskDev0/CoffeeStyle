<template>
  <article @click="$router.push(`products/${product.title}`)" class="flex flex-col items-center text-center cursor-pointer">
    <img :src="product.image" :alt="product.title">
    <div class="flex flex-col gap-1 pt-9">
    <h1 class="text-xl">{{ product.title }}</h1>
    <p class="text-[#A25F4B] text-xl flex justify-center gap-2">${{ product.price.toFixed(2) }} USD<span class="text-[#1D1F2E66] opacity-40 line-through" v-if="product.discount">${{product.discount.toFixed(2)}} USD</span></p>
    </div>
  </article>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

defineProps({
  product: {
    required: true,
    type: Object as PropType<ProductType>
  }
})
</script>