<template>
  <div class="flex justify-between">
  <select v-model="priceSelect" @change="sortByPrice(Number(priceSelect))" class="py-3 px-4 pr-9 block border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500">
    <option selected value="0">All</option>
    <option value="20">1-20$</option>
    <option value="30">21-30$</option>
    <option value="50">31-50$</option>
  </select>
  <select v-model="newnessSelect" @change="sortByDate" class="py-3 px-4 pr-9 block border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500">
    <option selected disabled>Sort By</option>
    <option value="new">New</option>
    <option value="old">Old</option>
  </select>
  </div>
</template>

<script setup lang="ts">
import {useProductsStore} from "~/stores/products";
const productsStore = useProductsStore()

const priceSelect = ref<number>(0)

const newnessSelect = ref<string>("Sort By")

onMounted(() => {
  productsStore.sortedProducts = productsStore.products
})

const sortByPrice = (priceSelect:number) => {
  if (priceSelect === 0){
    productsStore.sortedProducts = productsStore.products
  }
  if (priceSelect === 20){
    productsStore.sortedProducts = productsStore.products?.filter(product => product.price > 1 && product.price < 20)
  }
  else if (priceSelect === 30){
    productsStore.sortedProducts = productsStore.products?.filter(product => product.price > 20 && product.price < 30)
  }
  else if (priceSelect === 50){
    productsStore.sortedProducts = productsStore.products?.filter(product => product.price > 30 && product.price < 50)
  }
}

const sortByDate = () => {
  if (newnessSelect.value == "new") {
    productsStore.sortedProducts?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).reverse()
  }else {
    productsStore.sortedProducts?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }
}
</script>