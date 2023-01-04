<template>
  <div @click="$emit('cartAdd', product)" class="products__item">
    <img :src="product.image" alt="" class="product__item-img">
    <div class="product__item-desc">
      <h3 class="product__title">{{product.title}}</h3>
      <div class="price">
        <p class="product__price">{{product.price}}</p>
        <p class="product__price product__price-new">{{product.price_new}}</p>
        <p class="product__price product__price-old">{{product.price_old}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

let props = defineProps({
  products_info: {
    type: Array,
    required: true
  },
  product: {
    type: Object,
    required: true
  }
})


</script>
