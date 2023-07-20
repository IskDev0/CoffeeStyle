<template>
  <div class="grid grid-cols-3 font-semibold">
  <div class="flex items-start gap-4">
    <img class="h-16 w-16" :src="product.image" alt="">
    <h1>{{product.title}}</h1>
  </div>
  <p class="flex justify-around">${{discountedPrice.toFixed(2)}} x {{product.quantity}} </p>
  <p class="flex justify-around">${{totalPrice}}</p>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

const props = defineProps({
  product: {
    required: true,
    type: Object as PropType<CartProductType>
  }
})

const discountedPrice = props.product.price - (props.product.price * (props.product.discount / 100))

const totalPrice = (discountedPrice * props.product.quantity).toFixed(2)
</script>