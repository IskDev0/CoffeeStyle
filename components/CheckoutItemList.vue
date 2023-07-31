<template>
  <div class="flex flex-col gap-4">
<CheckoutItem
    :checkout-item="checkoutItem"
    v-for="checkoutItem in cartStore.cartProducts"
    :key="checkoutItem.id"/>
  </div>
</template>

<script setup lang="ts">
import {useCartStore} from "~/stores/cart";
import CheckoutItem from "~/components/CheckoutItem.vue";

const cartStore = useCartStore()

</script>
