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


import {useProductsStore} from "../../stores/products";
import {onMounted} from "vue";
import TheLoader from "~/components/UI/TheLoader.vue";

useSeoMeta({
  title: "Products | CoffeeStyle",
  description: "Check out our premium coffee mugs. Made from high-quality ceramic, it's perfect for enjoying your favorite coffee or tea. Limited stock available!",
  ogTitle: "Products | CoffeeStyle",
  ogDescription: "Check out our premium coffee mugs. Made from high-quality ceramic, it's perfect for enjoying your favorite coffee or tea. Limited stock available!",
  ogImage: '/home-hero.png',
  ogUrl: '',
  twitterTitle: 'Blogs | CoffeeStyle',
  twitterDescription: "Check out our premium coffee mugs. Made from high-quality ceramic, it's perfect for enjoying your favorite coffee or tea. Limited stock available!",
  twitterImage: '/home-hero.png',
  twitterCard: 'summary_large_image'
});


useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.svg'
    }
  ]
})

const productsStore = useProductsStore()

const supabase = useSupabaseClient()

const loadProducts = async (): Promise<void> => {

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