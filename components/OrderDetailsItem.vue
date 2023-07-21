<template>
  <div v-if="itemDetails" class="flex flex-col gap-4 items-center sm:grid sm:grid-cols-4">
  <img class="h-16 w-16" :src="itemDetails.image" alt="">
  <p>{{itemDetails.title}}</p>
  <p>{{itemDetails.quantity}}</p>
  <p>${{(itemDetails.price).toFixed(2)}}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  itemDetails: {
    required: true
  }
})
</script>
