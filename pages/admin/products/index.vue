<template>
  <section v-if="!isLoading">
    <div v-if="adminProducts" class="flex flex-col gap-4">
<div v-for="adminProduct in adminProducts" :key="adminProduct.id" class="flex items-center justify-between bg-gray-100">
  <div class="flex items-center gap-6">
  <img class="h-16 w-16" :src="adminProduct.image" :alt="adminProduct.title">
  <h1>{{adminProduct.title}}</h1>
  </div>
  <div class="flex items-center gap-6 mr-6">
    <img @click="editProduct(adminProduct)" src="/edit.svg" alt="edit">
    <img @click="deleteProduct(adminProduct)" src="/delete.svg" alt="delete">
  </div>
</div>
    </div>
  </section>
  <div  v-else class="h-screen flex flex-col justify-center items-center">
  <TheLoader/>
  </div>
</template>

<script setup lang="ts">
import TheLoader from "~/components/UI/TheLoader.vue";
import LoadingPopup from "~/components/UI/LoadingPopup.vue";

definePageMeta({
  layout: "admin"
})

const supabase = useSupabaseClient()

const router = useRouter()

const route = useRoute()

const isLoading = ref<boolean>(false)

const adminProducts = ref<ProductType[]>([])

const loadAdminProducts = async () => {

  try {
    isLoading.value = true
    let { data: products, error } = await supabase
        .from('products')
        .select('*')

    adminProducts.value = products
  }catch (e) {
    console.log(e)
  }finally {
    isLoading.value = false
  }
}

const editProduct = (product:ProductType):void => {
  router.push(`products/${product.id}`)
}

const deleteProduct = async (product:ProductType) => {

  const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', product.id)

}

onMounted(() => {
  loadAdminProducts()
})
</script>