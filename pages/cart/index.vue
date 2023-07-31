<template>
  <div class="container mx-auto px-4" v-if="cartStore.cartProducts.length">
    <div class="hidden sm:grid sm:grid-cols-5 sm:items-center text-xs uppercase tracking-widest">
      <p>Product</p>
      <p></p>
      <p>Quantity</p>
      <p>Total</p>
    </div>
    <TransitionGroup name="list">
      <div class="flex flex-col p-10 items-center gap-4 sm:grid sm:grid-cols-5 items-center my-4 bg-[#F4F4F4]" v-for="cartItem in cartStore.cartProducts"
           :key="cartItem.id">
        <img class="h-16 w-16" :src="cartItem.image" alt="">
        <h1 class="font-bold">{{ cartItem.title }}</h1>
        <div class="flex gap-2 items-center font-bold text-xl md:font-medium">
          <button @click="decrease(cartItem)">-</button>
          <p>{{ cartItem.quantity }}</p>
          <button @click="cartItem.quantity++">+</button>
        </div>
        <p class="font-semibold">${{ ((cartItem.price - cartItem.price * (cartItem.discount / 100)) * cartItem.quantity).toFixed(2) }}</p>
        <button class="flex justify-end sm:pr-10" @click="deleteItemFromCart(cartItem)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20.25 6H17.25V4.125C17.25 3.29766 16.5773 2.625 15.75 2.625H8.25C7.42266 2.625 6.75 3.29766 6.75 4.125V6H3.75C3.33516 6 3 6.33516 3 6.75V7.5C3 7.60313 3.08437 7.6875 3.1875 7.6875H4.60312L5.18203 19.9453C5.21953 20.7445 5.88047 21.375 6.67969 21.375H17.3203C18.1219 21.375 18.7805 20.7469 18.818 19.9453L19.3969 7.6875H20.8125C20.9156 7.6875 21 7.60313 21 7.5V6.75C21 6.33516 20.6648 6 20.25 6ZM15.5625 6H8.4375V4.3125H15.5625V6Z"
                fill="black"/>
          </svg>
        </button>

      </div>
    </TransitionGroup>
    <div class="flex flex-col gap-4 items-end">
    <h1 class="text-3xl font-bold text-end">Total: ${{ totalPrice.toFixed(2) }}</h1>
      <MainButton @click="goToCheckout" color="blue">Checkout</MainButton>
    </div>
  </div>
  <div v-else>
    <h1 class="text-3xl text-center font-bold mt-10">Cart is empty</h1>
  </div>
  <MessageAlert :message="errorMessage" v-if="errorMessage"/>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/cart";
const supabase = useSupabaseClient()
const user = useSupabaseUser()
import MainButton from "~/components/UI/MainButton.vue";
import MessageAlert from "~/components/UI/MessageAlert.vue";

const cartStore = useCartStore()

const decrease = (cartItem: CartProductType): void => {
  if (cartItem.quantity > 1) {
    cartItem.quantity--
  }
}

const totalPrice = computed((): number => {
  let total = 0;
  for (let cartItem in cartStore.cartProducts) {
    let item = cartStore.cartProducts[cartItem];
    total += (item.price - item.price * (item.discount / 100)) * item.quantity
  }
  return total
})

const deleteItemFromCart = (cartItem: CartProductType):void => {
  cartStore.cartProducts = cartStore.cartProducts.filter(item => item.id !== cartItem.id)
}

const errorMessage = ref<string>()

const goToCheckout = () => {
  errorMessage.value = ""
  if (user.value != null){
    return navigateTo("/cart/checkout")
  }else {
    errorMessage.value = "To buy something, you need to be authorized"
  }
}

</script>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.list-leave-active {
  position: absolute;
}
</style>