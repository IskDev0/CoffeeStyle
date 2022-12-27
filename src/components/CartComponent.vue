<template>
  <div class="cart__content">
    <p class="cart__title">Cart items: </p>
    <p class="cart__item" v-for="cart_item in cart_items">
      {{cart_item}}
    </p>
  </div>
</template>

<script setup>
let props = defineProps({
  cart_items: {
    type: Array,
    required: true
  }
})


</script>

