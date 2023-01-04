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

import products_info from "./product_info"

let cartVisibility = ref(false)

let changeVisibility = () => {
  cartVisibility.value = !cartVisibility.value
}

let cartContent = ref([])


let addToCart = (product, cartItem) => {
  let productItem = ref({
    title: product.title,
    id: product.id,
    price: product.price ? product.price : product.price_new,
    image: product.image,
    quantity: 1
  })

  cartContent.value.push(productItem)



  // if (cartContent.value.length){
  //   let isExist = ref(false)
  //   cartContent.value.map(item => {
  //     if (item.value.id === cartItem.value.id){
  //       isExist++
  //     }
  //   })
  //   if (!isExist){
  //     cartContent.value.push(productItem)
  //   }
  // }else {
  //   cartContent.value.push(productItem)
  // }

}



let deleteFromCart = (cartItem) => {

  cartContent.value.forEach((el, i) => {
    if (el.value.id === cartItem.value.id) {
      cartContent.value.splice(i, 1)
    }
  })

  // let myIndex = cartContent.value.indexOf(cartItem)
  // if (myIndex !== -1){
  //   cartContent.value.splice(myIndex, 1)
  // }
}

</script>

<template>
  <MainHeader
      :cart-content="cartContent"
      @visibility="changeVisibility"
      :cart-visibility="cartVisibility"/>
  <main class="main">
    <MainHero/>
    <div class="container">
      <Transition name="slide-fade">
        <CartComponent
            @delete="deleteFromCart"
            :cart-content="cartContent"
            v-if="cartVisibility"/>
      </Transition>
      <AboutSection/>
      <FeaturedMugs/>
      <ProductsSection
          :products_info="products_info"
          @cartAdd="addToCart"/>
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

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>

