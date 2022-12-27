<template>
  <div class="cart__content">
    <p class="cart__title">Cart items: </p>
      <p class="cart__item" v-for="cartItem in props.cartContent">
        {{cartItem}}
      </p>
  </div>
</template>

<script setup>
let props = defineProps({
  cartContent: {
    type: Array,
    required: true
  }
})

</script>

