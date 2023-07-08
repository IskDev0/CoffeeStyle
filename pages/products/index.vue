<template>
<section class="w-1/2 mx-auto">
  <SortProducts/>
  <div v-if="!productsStore.areProductsLoading" class="grid grid-cols-3 justify-between gap-x-5 gap-y-12 mt-8">
  <ProductsList />
  </div>
  <TheLoader v-else/>
</section>
</template>

<script setup>

import ProductsList from "../../components/ProductsList";
import SortProducts from "../../components/SortProducts";
import TheLoader from "../../components/UI/TheLoader";

import {useProductsStore} from "../../stores/products";
const productsStore = useProductsStore()
</script>