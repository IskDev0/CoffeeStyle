<template>
  <div class="flex justify-between">
  <select v-model="priceSelect" @change="sortByPrice(Number(priceSelect))" class="py-3 px-4 pr-9 block border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500">
    <option selected value="0">All</option>
    <option value="25">1-25$</option>
    <option value="50">25-50$</option>
    <option value="100">50-100$</option>
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

const sortByPrice = (priceSelect:number):void => {
  if (priceSelect === 0){
    productsStore.sortedProducts = productsStore.products
  }
  if (priceSelect === 25){
    productsStore.sortedProducts = productsStore.products?.filter(product => product.price > 1 && product.price <= 25)
  }
  else if (priceSelect === 50){
    productsStore.sortedProducts = productsStore.products?.filter(product => product.price > 25 && product.price <= 50)
  }
  else if (priceSelect === 100){
    productsStore.sortedProducts = productsStore.products?.filter(product => product.price > 50 && product.price <= 100)
  }
}

const sortByDate = ():void => {
  if (newnessSelect.value == "new") {
    productsStore.sortedProducts?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).reverse()
  }else {
    productsStore.sortedProducts?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }
}
</script>