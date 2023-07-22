<template>
  <button class="w-full py-2 bg-gray-100 my-4 flex justify-center flex items-center justify-center gap-2 font-semibold"
          @click="handlePopup(true)">
    <span>ADD</span>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          d="M7.75 2C7.94891 2 8.13968 2.07902 8.28033 2.21967C8.42098 2.36032 8.5 2.55109 8.5 2.75V7H12.75C12.9489 7 13.1397 7.07902 13.2803 7.21967C13.421 7.36032 13.5 7.55109 13.5 7.75C13.5 7.94891 13.421 8.13968 13.2803 8.28033C13.1397 8.42098 12.9489 8.5 12.75 8.5H8.5V12.75C8.5 12.9489 8.42098 13.1397 8.28033 13.2803C8.13968 13.421 7.94891 13.5 7.75 13.5C7.55109 13.5 7.36032 13.421 7.21967 13.2803C7.07902 13.1397 7 12.9489 7 12.75V8.5H2.75C2.55109 8.5 2.36032 8.42098 2.21967 8.28033C2.07902 8.13968 2 7.94891 2 7.75C2 7.55109 2.07902 7.36032 2.21967 7.21967C2.36032 7.07902 2.55109 7 2.75 7H7V2.75C7 2.55109 7.07902 2.36032 7.21967 2.21967C7.36032 2.07902 7.55109 2 7.75 2Z"
          fill="black"/>
    </svg>
  </button>
  <div @click.self="handlePopup(false)" v-if="isPopupLoading"
       class="bg-black fixed top-0 lef-0 right-0 bg-opacity-70 h-screen w-full flex flex-col items-center justify-center">
    <form class="flex flex-col gap-4 bg-white py-10 px-6 rounded-md w-1/2 opacity-100" @submit.prevent="addProduct">
      <input class="border-2 border-black p-2 rounded-md" v-model="addProductData.title" type="text"
             placeholder="Title">
      <span class="text-red-500" v-for="error in $v.title.$errors" :key="error.$uid">{{ error.$message }}</span>
      <input class="border-2 border-black p-2 rounded-md" v-model="addProductData.price" type="number"
             placeholder="Price">
      <span class="text-red-500" v-for="error in $v.price.$errors" :key="error.$uid">{{ error.$message }}</span>
      <textarea class="border-2 border-black p-2 rounded-md h-48" v-model="addProductData.description" type="text"
                placeholder="Description"/>
      <span class="text-red-500" v-for="error in $v.description.$errors" :key="error.$uid">{{ error.$message }}</span>
      <input class="border-2 border-black p-2 rounded-md" v-model="addProductData.discount" type="number"
             placeholder="Discount">
      <div class="flex justify-center">
        <img class="h-32 w-32" :src="previewImage ? previewImage : '/placeholder.png'" alt="Preview image">
        <input @change="selectFile"
               class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
               id="file_input" type="file">
      </div>
      <span class="text-red-500" v-if="isFileUploaded">Please select a file</span>
      <MainButton size="expand" color="blue">Add</MainButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import MainButton from "~/components/UI/MainButton.vue";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useLoadingStore} from "~/stores/loading";

defineProps({
  isPopupLoading: {
    required: true,
    type: Boolean
  },
})

const loadingStore = useLoadingStore()

const supabase = useSupabaseClient()

const previewImage = ref()

const file = ref()

const fileUrl = ref()

const isFileUploaded = ref<boolean>(false)

const addProductData = ref({
  title: "",
  price: "",
  description: "",
  discount: "",
})

const rules = computed(() => {
  return {
    title: {required},
    price: {required},
    description: {required},
  }
})

const $v = useVuelidate(rules, addProductData)

const emit = defineEmits(["open", "openAction"])

const handlePopup = (type: boolean) => {
  emit("open", type)
}

const selectFile = (e: { target: { files: any[]; }; }) => {
  file.value = e.target.files[0]
  const previewFile = e.target.files[0]
  previewImage.value = URL.createObjectURL(previewFile)
}

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
}

const addProduct = async (): Promise<void> => {

  const result = await $v.value.$validate()
  if (!result) return

  isFileUploaded.value = false

  if (previewImage.value) {

    try {

      loadingStore.isActionLoading = true

      await uploadImage()

      const {error} = await supabase
          .from('products')
          .upsert([{
            title: addProductData.value.title,
            price: addProductData.value.price,
            description: addProductData.value.description,
            discount: addProductData.value.discount ? addProductData.value.discount : null,
            image: fileUrl.value.data.publicUrl
          }])

      if (error) {
        console.error('Ошибка вставки данных:', error.message)
      }

      addProductData.value = {
        title: "",
        price: "",
        description: "",
        discount: "",
      }
      file.value = ""
      previewImage.value = ""
    } catch (e) {
      console.log(e)
    } finally {
      loadingStore.isActionLoading = false
    }

    handlePopup(false)
  } else {
    isFileUploaded.value = true
  }
}

</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>