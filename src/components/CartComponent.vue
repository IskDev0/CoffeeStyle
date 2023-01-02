<template>
  <div class="cart__content">
    <div v-if="cartContent.length" class="cart__wrapper">
      <p class="cart__title">Total: {{ cartContent.length }} </p>
      <TransitionGroup name="list">
        <div class="cart__item" v-for="cartItem in props.cartContent" :key="cartItem.value.id">
          <img class="cart__item-image" :src="cartItem.value.image" alt="">
          <div class="cart__inner">
            <p>{{ cartItem.value.title }}</p>
            <p> {{ cartItem.value.price }}</p>
          </div>
          <div class="cart__item-delete" @click="$emit('delete', cartItem)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                  fill="black"/>
            </svg>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div v-else class="cart__empty">
      <h1 class="cart__empty-title">Cart is empty</h1>
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
<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
