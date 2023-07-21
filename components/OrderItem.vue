<template>
  <div class="bg-slate-50 rounded-md p-4">
    <OrderDetailsList :order="order"/>
    <div class="flex justify-between mt-10">
    <p>{{orderDate}}</p>
    <p class="font-bold">Total: ${{(order.total).toFixed(2)}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  order: {
    required: true
  }
})

const orderDate = computed(() => {
  let date = new Date(props.order.created_at);

  const hour = date.getHours();
  const minute = date.getMinutes();
  let month = date.toLocaleString('default', { month: 'long' });
  let day = date.getDate();
  let year = date.getFullYear();

  return hour + ':' + minute + ' ' + day + ' ' + month + ', ' + year
})
</script>