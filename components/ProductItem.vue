<template>
  <article @click="$router.push(`products/${product.id}`)" class="flex flex-col items-center text-center cursor-pointer sm:w-80 lg:w-full">
    <div class="relative">
      <span v-if="product.discount" class="absolute top-0 right-0 bg-red-400 text-white font-bold py-2 px-4 z-10">-{{product.discount}}%</span>
    <img class="relative h-96 w-80" :src="product.image" :alt="product.title">
    <div class="flex flex-col gap-1 pt-9">
    <h1 class="text-xl">{{ product.title }}</h1>
    <p class="text-[#A25F4B] text-xl flex justify-center gap-2">${{ discountedPrice }} USD<span class="text-[#1D1F2E66] opacity-40 line-through" v-if="product.discount">${{product.price.toFixed(2)}} USD</span></p>
    </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  product: {
    required: true,
    type: Object as PropType<ProductType>
  }
})

const discountedPrice = computed(() => {
  return (props.product.price - (props.product.price * (props.product.discount / 100)))
})
</script>