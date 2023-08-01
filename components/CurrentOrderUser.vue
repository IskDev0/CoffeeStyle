<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <img src="/icons/user.svg" alt="user">
      <p>{{currentOrderUser.first_name}} {{currentOrderUser.last_name}}</p>
    </div>
    <div class="flex gap-4">
      <img src="/icons/mail.svg" alt="mail">
      <a :href="`mailto:${currentOrderUser.email}`">{{currentOrderUser.email}}</a>
    </div>
    <div class="flex gap-4">
      <img src="/icons/phone.svg" alt="phone">
      <a :href="`tel:${currentOrderUser.phone}`">{{currentOrderUser.phone}}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  currentOrderUser: {
    required: true
  }
})
</script>
