<template>
  <div class="grid grid-cols-5 justify-items-center gap-8 py-2 px-4">
    <span>Customer</span>
    <span>Status</span>
    <span>Products</span>
    <span>Date</span>
    <span>Total</span>
  </div>
  <div class="flex flex-col gap-6">
<AdminOrderItem :admin-order="adminOrder" :index="index" v-for="(adminOrder, index) in adminOrders" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  adminOrders: {
    required: true
  }
})
import AdminOrderItem from "~/components/AdminOrderItem.vue";
</script>