<template>
  <div class="w-1/2 mx-auto py-24">
    <div class="flex flex-wrap gap-x-5 gap-y-12">
      <ProductItem
          :product="product"
          v-for="product in products"
          :key="product.id"/>
    </div>
    <div class="flex justify-center mt-10">
      <MainButton>See all</MainButton>
    </div>
  </div>
</template>

<script setup>
import ProductItem from "./ProductItem";
import products from "/products.json"
import MainButton from "~/components/UI/MainButton";</script>