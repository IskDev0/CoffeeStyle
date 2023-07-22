<template>
  <section class="flex flex-col justify-center items-center">
    <div v-if="currentEditProduct" class="w-1/2">
  <form class="flex flex-col gap-4 mt-16" @submit.prevent>
    <input class="border-2 border-black p-2 rounded-md" v-model="currentEditProduct.title" type="text" placeholder="Title">
    <input class="border-2 border-black p-2 rounded-md" v-model="currentEditProduct.price" type="number" placeholder="Price">
    <textarea class="border-2 border-black p-2 rounded-md h-48" v-model="currentEditProduct.description" type="text" placeholder="Description"/>
    <input class="border-2 border-black p-2 rounded-md" v-model="currentEditProduct.discount" type="number" placeholder="Discount">
    <div class="flex justify-center">
      <img class="h-32 w-32" :src="previewImage ? previewImage : currentEditProduct.image" alt="Preview image">
      <input @change="selectFile"
             class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
             id="file_input" type="file">
    </div>
    <MainButton size="expand" color="blue" @click="updateProduct">Update</MainButton>
  </form>
    </div>
  </section>
  <div v-if="loadingStore.isActionLoading" class="flex flex-col items-center justify-center h-screen">
  <TheLoader/>
  </div>
  <div v-if="isLoading" class="flex flex-col items-center justify-center h-screen">
    <TheLoader/>
  </div>
</template>

<script setup lang="ts">
import LoadingPopup from "~/components/UI/LoadingPopup.vue";
import MainButton from "~/components/UI/MainButton.vue";
import {useLoadingStore} from "~/stores/loading";
import TheLoader from "~/components/UI/TheLoader.vue";

definePageMeta({
  layout: "empty"
})

const route = useRoute()
const router = useRouter()

const loadingStore = useLoadingStore()

const supabase = useSupabaseClient()

const isLoading = ref<boolean>(false)

const currentEditProduct = ref<ProductType>()

const getCurrentEditProduct = async (): Promise<void> => {

  try {
    loadingStore.isActionLoading = true
    let { data: product, error } = await supabase
        .from('products')
        .select("*")
        .eq('id', route.params.id)
        .single()

    currentEditProduct.value = product
  }catch (error){
    console.error(error)
  }finally {
    loadingStore.isActionLoading = false
  }

}

const previewImage = ref()

const file = ref()

const fileUrl = ref()

const uploadImage = async () => {
  const {data, error} = await supabase.storage
      .from('product_images')
      .upload(`/images/${file.value.name}`, file.value)

  if (error) {
    console.error('Ошибка загрузки файла:', error.message)
  } else {
    fileUrl.value = supabase.storage
        .from('product_images')
        .getPublicUrl(data.path)
  }
  currentEditProduct.value!.image = fileUrl.value.data.publicUrl
}

const selectFile = (e: { target: { files: any[]; }; }):void => {
  file.value = e.target.files[0]
  const previewFile = e.target.files[0]
  previewImage.value = URL.createObjectURL(previewFile)
}

const updateProduct = async (): Promise<void> => {

  try {
    isLoading.value = true

    if (file.value){
      await uploadImage()
    }

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