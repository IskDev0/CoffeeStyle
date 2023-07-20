<template>
  <div class="flex flex-col gap-4">
    <p>{{currentOrderUserAddress.country}}</p>
    <p>{{currentOrderUserAddress.city}}</p>
    <p>{{currentOrderUserAddress.state}}, {{currentOrderUserAddress.street}}</p>
    <p>{{currentOrderUserAddress.postal_code}}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  currentOrderUserAddress: {
    required: true
  },
  isLoading: {
    required: true,
    type: Boolean
  }
})
</script>
