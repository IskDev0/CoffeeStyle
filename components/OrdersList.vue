<template>
  <div class="flex flex-col gap-6">
<OrderItem v-for="order in orders" :order="order" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  orders: {
    required: true
  }
})
import OrderItem from "~/components/OrderItem.vue";
</script>