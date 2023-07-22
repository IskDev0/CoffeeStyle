<template>
  <section v-if="!isLoading">
    <AddProduct @open="openFormPopup" :is-popup-loading="isPopupLoading"/>
    <div v-if="adminProducts" class="flex flex-col gap-4 mx-4">
      <div v-for="adminProduct in adminProducts" :key="adminProduct.id"
           class="flex items-center justify-between bg-gray-100 rounded-md">
        <div class="flex items-center gap-6">
          <img class="h-16 w-16" :src="adminProduct.image" :alt="adminProduct.title">
          <h1 class="font-semibold">{{ adminProduct.title }}</h1>
        </div>
        <div class="flex items-center gap-6 mr-6">
          <img class="cursor-pointer" @click="editProduct(adminProduct)" src="/edit.svg" alt="edit">
          <img class="cursor-pointer" @click="deleteProduct(adminProduct)" src="/delete.svg" alt="delete">
        </div>
      </div>
    </div>
  </section>
  <div v-else class="h-screen flex flex-col justify-center items-center">
   <TheLoader/>
  </div>
  <ActionSpinner v-if="loadingStore.isActionLoading"/>
</template>

<script setup lang="ts">

import ActionSpinner from "~/components/UI/ActionSpinner.vue";
import TheLoader from "~/components/UI/TheLoader.vue";
import {useLoadingStore} from "~/stores/loading";

definePageMeta({
  layout: "admin"
})

const loadingStore = useLoadingStore()

const openFormPopup = (type: boolean):void => {
  isPopupLoading.value = type
}

const supabase = useSupabaseClient()

const router = useRouter()

const isPopupLoading = ref<boolean>(false)

const isLoading = ref<boolean>(false)

const adminProducts = ref<ProductType[]>([])

const loadAdminProducts = async (): Promise<void> => {

  try {
    isLoading.value = true
    let {data: products, error} = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

    adminProducts.value = products
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

const editProduct = (product: ProductType): void => {
  router.push(`products/${product.id}`)
}

const deleteProduct = async (product: ProductType): Promise<void> => {

  try {

    loadingStore.isActionLoading = true

    await supabase
        .from('products')
        .delete()
        .eq('id', product.id)

  const imageName = product.image.replace("https://ssusfaxxsolkavabffjm.supabase.co/storage/v1/object/public/product_images/images/", "")

    const { data, error } = await supabase
        .storage
        .from('product_images')
        .remove([`images/${imageName}`])
  }catch (error) {
    console.log(error)
  }finally {
    loadingStore.isActionLoading = false
  }

}

onMounted(() => {
  loadAdminProducts()

  const channel = supabase.channel('table-db-changes')

  const subscription = channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'products',
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          adminProducts.value.unshift(payload.new)
        } else if (payload.eventType === 'DELETE') {
          adminProducts.value = adminProducts.value.filter(item => item.id !== payload.old.id)
        } else if (payload.eventType === 'UPDATE') {
          const index = adminProducts.value.findIndex(d => d.id === payload.new.id)
          if (index !== -1) {
            adminProducts.value[index] = payload.new
          }
        }
      }
  )

  channel.subscribe()

  onUnmounted(() => {
    channel.unsubscribe()
  })
})

</script>