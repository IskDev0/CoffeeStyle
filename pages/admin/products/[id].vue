<template>
  <section class="w-1/2 mx-auto">
  <form class="flex flex-col gap-4" @submit.prevent v-if="currentEditProduct">
    <input class="border-2 border-black p-2 rounded-md" v-model="currentEditProduct.title" type="text" placeholder="Title">
    <input class="border-2 border-black p-2 rounded-md" v-model="currentEditProduct.price" type="number" placeholder="Price">
    <textarea class="border-2 border-black p-2 rounded-md h-48" v-model="currentEditProduct.description" type="text" placeholder="Description"/>
    <input class="border-2 border-black p-2 rounded-md" v-model="currentEditProduct.discount" type="number" placeholder="Discount">
    <button @click="updateProduct">Update</button>
  </form>
  </section>
  <LoadingPopup v-if="isLoading"/>
</template>

<script setup lang="ts">
import LoadingPopup from "~/components/UI/LoadingPopup.vue";

const route = useRoute()
const router = useRouter()

const supabase = useSupabaseClient()

const isLoading = ref<boolean>(false)

const currentEditProduct = ref<ProductType>()

const getCurrentEditProduct = async () => {

  let { data: product, error } = await supabase
      .from('products')
      .select("*")
      .eq('id', route.params.id)
      .single()

  currentEditProduct.value = product

}

const updateProduct = async () => {

  try {
    isLoading.value = true
    const { data, error } = await supabase
        .from('products')
        .update(currentEditProduct.value)
        .eq('id', route.params.id)
        .select()
        .single()

    router.replace("/admin/products")
  }catch (e) {
    console.log(e)
  }finally {
    isLoading.value = false
  }



}

onMounted(() => {
  getCurrentEditProduct()
})
</script>