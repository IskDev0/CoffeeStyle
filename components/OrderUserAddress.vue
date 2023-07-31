<template>
  <div class="flex flex-col gap-4 font-semibold">
      <p>{{currentOrderDetails.address.country}}</p>
      <p>{{currentOrderDetails.address.city}}</p>
      <p>{{currentOrderDetails.address.state}}, {{currentOrderDetails.address.street}}</p>
      <p>{{currentOrderDetails.address.postal_code}}</p>
    </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

defineProps({
  currentOrderDetails: {
    required: true,
    type: Object as PropType<OrderUserAddress>
  },
  isLoading: {
    required: true,
    type: Boolean
  }
})
</script>
