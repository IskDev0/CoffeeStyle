<template>
<section class="w-1/2 mx-auto">
  <SortProducts/>
  <div class="flex flex-wrap gap-5 mt-8">
  <ProductsList />
  </div>
</section>
</template>

<script setup>

import ProductsList from "../../components/ProductsList";
import SortProducts from "../../components/SortProducts";
</script>