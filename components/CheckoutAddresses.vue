<template>
  <div class="flex flex-col gap-4">

    <div
        @click="$emit('selectAddress', userAddress, index)"
        class="cursor-pointer border-l-2 border-gray-300 pl-4"
        :class="{'bg-gray-300' : index === selectedIndex}"
        v-for="(userAddress, index) in userAddresses"
        :key="index">
      <p>Country: {{userAddress.country}}</p>
      <p>State: {{userAddress.state}}</p>
      <p>City: {{userAddress.city}}</p>
      <p>Street: {{userAddress.street}}</p>
      <p>Postal code: {{userAddress.postal_code}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  userAddresses: {
    required: true
  },
  selectedIndex: {
    required: true
  }
})
</script>
