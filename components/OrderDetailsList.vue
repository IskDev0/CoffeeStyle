<template>
  <div class="flex flex-col gap-4">
  <OrderDetailsItem :item-details="itemDetails" v-for="itemDetails in order.products"/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  order: {
    required: true
  }
})
</script>
