<template>
  <div class="flex flex-col gap-4">
    <AdminOrderDetailsItem v-for="product in currentOrderDetails.products" :product="product"/>
  </div>
</template>

<script setup lang="ts">

defineProps({
  currentOrderDetails: {
    required: true
  }
})
</script>