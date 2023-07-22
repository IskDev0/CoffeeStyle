<template>
  <div class="container mx-auto pt-24 px-4">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
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

const loadHomeProducts = async (): Promise<void> => {

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