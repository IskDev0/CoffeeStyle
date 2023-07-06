<template>
  <TransitionGroup name="list">
    <ProductItem
        v-for="product in productsStore.sortedProducts"
        :product="product"
        :key="product.id"
    />
  </TransitionGroup>
</template>

<script setup>
import ProductItem from "./ProductItem";
import {useProductsStore} from "../stores/products";

const productsStore = useProductsStore()

const supabase = useSupabaseClient()

const loadProducts = async () => {

  try {

    let {data: productsList, error} = await supabase
        .from('products')
        .select('*')

    productsStore.areProductsLoading = true

    productsStore.products = productsList
    productsStore.sortedProducts = productsStore.products
  } catch (error) {
    console.log(error)
  } finally {
    productsStore.areProductsLoading = false
  }

}

onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>