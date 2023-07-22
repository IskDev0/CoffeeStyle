<template>
  <TransitionGroup name="list">
    <ProductItem
        v-for="product in productsStore.sortedProducts"
        :product="product"
        :key="product.id"
    />
  </TransitionGroup>
</template>

<script setup>
import ProductItem from "./ProductItem";
import {useProductsStore} from "../stores/products";
const productsStore = useProductsStore()
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>