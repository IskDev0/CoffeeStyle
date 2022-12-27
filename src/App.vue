<script setup>
import {RouterView} from 'vue-router'
import MainHeader from "./components/MainHeader.vue";
import MainHero from "./components/MainHero.vue"
import AboutSection from "./components/AboutSection.vue";
import FeaturedMugs from "./components/FeaturedMugs.vue";
import ProductsSection from "./components/ProductsSection.vue";
import {ref} from "vue";
import CartComponent from "./components/CartComponent.vue";
import OfferComponent from "./components/OfferComponent.vue";
import BlogSection from "./components/BlogSection.vue";
import SubscriptionSection from "./components/SubscriptionSection.vue";
import MainFooter from "./components/MainFooter.vue";

let cart_visibility = ref(false)

let cart_items = ref(["123", "qwerty", "098"])

let change_visibility = () => {
  cart_visibility.value = !cart_visibility.value
}


</script>

<template>
  <MainHeader @test="change_visibility" :cart_visibility="cart_visibility"/>
  <main class="main">

    <MainHero/>
    <div class="container">
      <CartComponent v-if="cart_visibility" :cart_items="cart_items"/>
      <AboutSection/>
      <FeaturedMugs/>
      <ProductsSection @add="changeArr(product.price)"/>
      <OfferComponent/>
    </div>
    <div class="image-section"></div>
    <div class="container">
      <BlogSection/>
    </div>
    <SubscriptionSection/>
    <RouterView/>
  </main>
  <MainFooter/>
</template>

