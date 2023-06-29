<template>
  <div class="w-1/2 mx-auto">
    <div class="flex items-start gap-20" v-if="currentProduct">
    <img :src="currentProduct.image" :alt="currentProduct.title">
      <div>
    <p class="font-bold text-3xl">{{currentProduct.title }}</p>
        <p class="pt-8 opacity-70">{{currentProduct.description}}</p>
        <p class="py-6 text-xl">${{currentProduct.price}} USD</p>

        <div class="flex items-center justify-between">
        <div class="flex gap-4 text-2xl">
          <button @click="decrease">-</button>
          <input class="w-6" v-model="quantity" type="number">
          <button @click="increase">+</button>
        </div>
        <MainButton @click="addToCart" color="blue">Add to cart</MainButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useProductsStore} from "../../stores/products";
import {useCartStore} from "~/stores/cart";
import MainButton from "~/components/UI/MainButton.vue";

const productsStore = useProductsStore()
const cartStore = useCartStore()
const route = useRoute()

const quantity = ref<number>(1)

const increase = () => {
  quantity.value++
}

const decrease = () => {
  if (quantity.value > 1){
    quantity.value--
  }
}

const currentProduct = ref<ProductType>()

const getCurrentProduct = () => {
  currentProduct.value = productsStore.products.filter(product => product.id === Number(route.params.id))[0]
}

const addToCart = () => {
  let tempObj = {
    ...currentProduct.value,
    quantity: quantity.value,
  } as CartProductType;

  const exists = cartStore.cartProducts.find(
      (product) => product.id === tempObj.id
  );

  if (exists){
    exists.quantity+=quantity.value
  }else {
    cartStore.cartProducts.push(tempObj);
  }

  quantity.value = 1;
};



onMounted(() => {
  getCurrentProduct()
})
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

</style>