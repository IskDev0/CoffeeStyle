<template>
  <section id="products" class="products">
    <h1 class="section__heading">More Products</h1>
    <div class="products__wrapper">
      <ProductItem
          @cartAdd="$emit('cartAdd', product)"
          :product="product"
          :products_info="products_info"
          v-for="product in products_info"
          :key="product.id" />
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";
import ProductItem from "./ProductItem.vue";

let props = defineProps({
  products_info: {
    type: Array,
    required: true
  }
})



</script>

