<template>
  <div class="cart__content">
    <p class="cart__title">Total: {{cartContent.length}} </p>
    <div class="cart__item" v-for="cartItem in props.cartContent">
      <img class="cart__item-image" :src="cartItem.value.image" alt="">
      <div class="cart__inner">
        <p>{{ cartItem.value.title }}</p>
        <p> {{ cartItem.value.price }}</p>
      </div>
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

