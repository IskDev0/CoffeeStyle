<template>
  <div class="w-1/2 mx-auto pt-24">
    <div class="grid grid-cols-3 gap-x-5 gap-y-12">
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

const supabase = useSupabaseClient()

const homeProducts = ref<ProductType[]>([])

const loadHomeProducts = async () => {

  let { data: products, error } = await supabase
      .from('products')
      .select('*')
      .limit(9)

  homeProducts.value = products
}

onMounted(() => {
  loadHomeProducts()
})

import MainButton from "~/components/UI/MainButton";</script>