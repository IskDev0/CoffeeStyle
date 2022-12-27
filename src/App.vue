<script setup>
import {ref} from "vue";
import {RouterView} from 'vue-router'
import MainHeader from "./components/MainHeader.vue";
import MainHero from "./components/MainHero.vue"
import AboutSection from "./components/AboutSection.vue";
import FeaturedMugs from "./components/FeaturedMugs.vue";
import ProductsSection from "./components/ProductsSection.vue";
import CartComponent from "./components/CartComponent.vue";
import OfferComponent from "./components/OfferComponent.vue";
import BlogSection from "./components/BlogSection.vue";
import SubscriptionSection from "./components/SubscriptionSection.vue";
import MainFooter from "./components/MainFooter.vue";

let cartVisibility = ref(false)

let changeVisibility = () => {
  cartVisibility.value = !cartVisibility.value
}

let cartContent = ref([])


</script>

<template>
  <MainHeader
      @visibility="changeVisibility"
      :cart-visibility="cartVisibility"/>
  <main class="main">
    <MainHero/>
    <div class="container">
      <CartComponent :cart-content="cartContent" v-if="cartVisibility"/>
      <AboutSection/>
      <FeaturedMugs/>
      <ProductsSection/>
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

