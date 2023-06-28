<template>
  <div class="w-1/2 mx-auto pt-24">
    <div class="flex flex-wrap gap-x-5 gap-y-12">
      <ProductItem
          :product="product"
          v-for="product in homeProducts"
          :key="product.id"/>
    </div>
    <div class="flex justify-center mt-10">
      <MainButton color="blue"><NuxtLink to="/products">See all</NuxtLink></MainButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductItem from "./ProductItem";
const homeProducts = ref<ProductType[]>(
    [
      {
        "id": 1,
        "title": "Red Love Cup",
        "price": 37.00,
        "image": "/cups/cup-1.jpg",
        "discount": 32
      },
      {
        "id": 2,
        "title": "Black Tea Cup",
        "price": 29.00,
        "image": "/cups/cup-2.jpg",
        "discount": 48
      },
      {
        "id": 3,
        "title": "B&W Essentials Mug",
        "price": 19.00,
        "image": "/cups/cup-3.jpg",
        "discount": false
      },
      {
        "id": 4,
        "title": "Winter Style Mug",
        "price": 25.00,
        "image": "/cups/cup-4.jpg",
        "discount": false
      },
      {
        "id": 5,
        "title": "Ceramic Tea",
        "price": 46.00,
        "image": "/cups/cup-5.jpg",
        "discount": false
      },
      {
        "id": 6,
        "title": "No Handle Bar Cup",
        "price": 34.00,
        "image": "/cups/cup-6.jpg",
        "discount": false
      },
      {
        "id": 7,
        "title": "Espresso Cup by Mugs.co",
        "price": 25.00,
        "image": "/cups/cup-7.jpg",
        "discount": false
      },
      {
        "id": 8,
        "title": "Pink Premium Ceramic",
        "price": 99.00,
        "image": "/cups/cup-8.jpg",
        "discount": false
      },
      {
        "id": 9,
        "title": "Summer Designer Cup",
        "price": 29.00,
        "image": "/cups/cup-9.jpg",
        "discount": false
      }
    ]
)
import MainButton from "~/components/UI/MainButton";</script>