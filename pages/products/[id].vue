<template>
  <section v-if="currentProduct" class="w-1/2 mx-auto">
    <div class="flex items-start gap-20" v-if="currentProduct">
    <img class="h-96 w-80" :src="currentProduct.image" :alt="currentProduct.title">
      <div>
    <p class="font-bold text-3xl">{{currentProduct.title }}</p>
        <p class="pt-8 opacity-70">{{currentProduct.description}}</p>
        <p class="py-6 text-[#A25F4B] text-xl flex gap-4">${{ discountedPrice}} USD<span class="text-[#1D1F2E66] opacity-40 line-through" v-if="currentProduct.discount">${{currentProduct.price.toFixed(2)}} USD</span></p>

        <div class="flex items-center justify-between">
        <div class="flex gap-4 text-2xl">
          <button @click="decrease">-</button>
          <input class="w-6" v-model="quantity" type="number">
          <button @click="increase">+</button>
        </div>
        <MainButton v-if="!isExist(currentProduct)" @click="addToCart" color="blue">Add to cart</MainButton>
          <NuxtLink v-else to="/cart">Go to cart</NuxtLink>
        </div>
      </div>
    </div>
  </section>
  <TheLoader v-else/>
  <Transition name="slide-fade">
  <CartAlert @close="closeAlert" v-if="isAdded" />
  </Transition>
</template>

<script setup lang="ts">
import {useProductsStore} from "~/stores/products";
import {useCartStore} from "~/stores/cart";
import MainButton from "~/components/UI/MainButton.vue";
import CartAlert from "~/components/CartAlert.vue";
import TheLoader from "~/components/UI/TheLoader.vue";

const supabase = useSupabaseClient()

const productsStore = useProductsStore()
const cartStore = useCartStore()
const route = useRoute()

const isAdded =ref<boolean>(false)

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

const isExist = (currentProduct:ProductType) => {
  return cartStore.cartProducts?.find(product => product.title == currentProduct?.title)
}

const getCurrentProduct = async () => {

  let { data: product, error } = await supabase
      .from('products')
      .select("*")
      .eq('id', route.params.id)
      .single()

  currentProduct.value = product


}

const addToCart = () => {
  let tempObj = {
    ...currentProduct.value,
    quantity: quantity.value,
  } as CartProductType;

  const exists = cartStore.cartProducts?.find(
      (product) => product.id === tempObj.id
  );
  if (!exists){
    isAdded.value = true
    cartStore.cartProducts?.push(tempObj);
  }
  setTimeout(()=> {
    isAdded.value = false
  },3000)
};

const closeAlert = () => {
  isAdded.value = false
}

const discountedPrice = computed(() => {
  return (currentProduct.value!.price - (currentProduct.value!.price * (currentProduct.value!.discount / 100)))
})

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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>