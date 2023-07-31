<template>
  <div class="grid grid-cols-3 gap-4">
  <div class="flex gap-4">
    <img class="h-16 w-16" :src="checkoutItem.image" :alt="checkoutItem.title">
    <p>{{checkoutItem.title}}</p>
  </div>
    <p class="text-center">${{checkoutItem.price.toFixed(2)}} x {{checkoutItem.quantity}}</p>
    <p>${{((checkoutItem.price - checkoutItem.price * (checkoutItem.discount / 100)) * checkoutItem.quantity).toFixed(2) }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  checkoutItem: {
    required: true
  }
})

const subTotal = computed(() => {

})
</script>
