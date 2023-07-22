<template>
<section class="container mx-auto px-4">
  <SortProducts/>
  <div v-if="!productsStore.areProductsLoading" class="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-3 justify-between gap-x-5 gap-y-12 mt-8">
  <ProductsList />
  </div>
  <TheLoader v-else/>
</section>
</template>

<script setup lang="ts">

import ProductsList from "../../components/ProductsList";
import SortProducts from "../../components/SortProducts";
import TheLoader from "../../components/UI/TheLoader";

import {useProductsStore} from "../../stores/products";
import {onMounted} from "vue";
const productsStore = useProductsStore()

const supabase = useSupabaseClient()

const loadProducts = async ():void => {

  try {
    productsStore.areProductsLoading = true
    let {data: productsList, error} = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

    productsStore.products = productsList

  } catch (error) {
    console.log(error)
  } finally {
    productsStore.areProductsLoading = false
  }
  productsStore.sortedProducts = productsStore.products
}

onMounted(() => {
  loadProducts()
})
</script>