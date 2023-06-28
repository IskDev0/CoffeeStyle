<template>
<ProductItem
v-for="product in productsStore.sortedProducts"
:product="product"
:key="product.id"
/>
</template>

<script setup>
import ProductItem from "./ProductItem";
import {useProductsStore} from "../stores/products";

const productsStore = useProductsStore()
</script>