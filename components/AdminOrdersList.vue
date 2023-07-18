<template>
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