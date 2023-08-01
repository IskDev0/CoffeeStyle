<template>
  <HomeHero/>
  <HomeAbout/>
  <HomeProductsList/>
  <HomeImage/>
  <HomeBlogsList/>
</template>

<script setup lang="ts">

import HomeProductsList from "~/components/HomeProductsList.vue";
import HomeHero from "~/components/HomeHero.vue";
import HomeAbout from "~/components/HomeAbout.vue";
import HomeImage from "~/components/HomeImage.vue";
import HomeBlogsList from "~/components/HomeBlogsList.vue";

useSeoMeta({
  title: 'Coffee Mugs for Coffee Lovers | CoffeeStyle',
  description: 'Discover our wide selection of high-quality coffee mugs. Enjoy your morning coffee in style with our unique designs and durable materials.',
  ogTitle: 'Coffee Mugs for Coffee Lovers | CoffeeStyle',
  ogDescription: 'Find the perfect coffee mug to suit your taste. From classic designs to modern styles, our coffee mugs are the ideal companion for your favorite brew.',
  ogImage: '/home-image.jpg',
  ogUrl: 'https://www.yourmugshop.com/',
  twitterTitle: 'Coffee Mugs for Coffee Lovers | YourMugShop',
  twitterDescription: 'Discover our wide selection of high-quality coffee mugs. Enjoy your morning coffee in style with our unique designs and durable materials.',
  twitterImage: '/home-image.jpg',
  twitterCard: 'summary_large_image',
});

</script>