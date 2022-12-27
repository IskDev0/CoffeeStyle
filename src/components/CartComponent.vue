<template>
  <div class="cart__content">
    <p class="cart__title">Cart items: </p>
      <div class="cart__item" v-for="cartItem in props.cartContent">
        <p>{{cartItem.value.title}}</p>
        <p> {{cartItem.value.price}}</p>
      </div>
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

