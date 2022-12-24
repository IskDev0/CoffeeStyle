<template>
  <section id="products" class="products">
    <h1 class="section__heading">More Products</h1>
    <div class="products__wrapper">
      <div class="products__item" v-for="product in products_info" :key="product.id">
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
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";

let products_info = ref([
  {
    id: 1,
    title: "Red Love Cup",
    price_new: "$25.00",
    price_old: "$ 37.00 USD",
    image: new URL('../assets/images/products/product-img1.jpg', import.meta.url).href,
  },
  {
    id: 2,
    title: "Black Tea Cup",
    price_new: "$15.00",
    price_old: "$ 29.00 USD",
    image: new URL('../assets/images/products/product-img2.jpg', import.meta.url).href,
  }, {
    id: 3,
    title: "B&W Essentials Mug",
    price: "$ 19.00 USD",
    image: new URL('../assets/images/products/product-img3.jpg', import.meta.url).href,
  }, {
    id: 4,
    title: "Winter Style Mug",
    price: "$ 25.00 USD",
    image: new URL('../assets/images/products/product-img4.jpg', import.meta.url).href,
  }, {
    id: 5,
    title: "Ceramic Tea",
    price: "$ 46.00 USD",
    image: new URL('../assets/images/products/product-img5.jpg', import.meta.url).href,
  }, {
    id: 6,
    title: "No Handle Bar Cup",
    price: "$ 34.00 USD",
    image: new URL('../assets/images/products/product-img6.jpg', import.meta.url).href,
  },
  {
    id: 7,
    title: "Espresso Cup by Mugs.co",
    price: "$ 25.00 USD",
    image: new URL('../assets/images/products/product-img7.jpg', import.meta.url).href,
  },
  {
    id: 8,
    title: "Pink Premium Ceramic",
    price: "$ 99.00 USD",
    image: new URL('../assets/images/products/product-img8.jpg', import.meta.url).href,
  },
  {
    id: 9,
    title: "Summer Designer Cup",
    price: "$ 29.00 USD",
    image: new URL('../assets/images/products/product-img9.jpg', import.meta.url).href,
  },
])
</script>

