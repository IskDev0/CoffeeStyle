<template>
  <section class="mt-10 mx-6" v-if="currentEditBlogItem">
    <NuxtLink class="inline-flex gap-2 bg-gray-100 py-2 px-4 rounded-md font-bold" to="/admin/blogs">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z"/>
      </svg>
      <span>Back</span></NuxtLink>
    <div class="flex flex-col gap-6 mt-10">
      <form @submit.prevent="updateBlog" class="flex flex-col gap-4">
        <input v-model="currentEditBlogItem.head" class="border-2 border-black p-2 rounded-md" type="text"
               placeholder="Post head">
        <input v-model="currentEditBlogItem.body_short" class="border-2 border-black p-2 rounded-md" type="text"
               placeholder="Post short body">
        <ClientOnly>
          <Editor
              class="h-96"
              v-model="currentEditBlogItem.body"
              :init="{
          toolbar: [
    { name: 'history', items: [ 'undo', 'redo' ] },
    { name: 'styles', items: [ 'styles' ] },
    { name: 'formatting', items: [ 'bold', 'italic' ] },
    { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
    { name: 'indentation', items: [ 'outdent', 'indent' ] },
    {name: 'lists', items: ['numlist', 'bullist']}
  ],
        plugins: ['lists', 'link', 'image', 'table', 'code', 'help', 'wordcount', 'numlist' ,'bullist']
      }"
              :api-key="key"
          />
        </ClientOnly>
        <div class="flex justify-center">
          <img class="h-32 w-32" :src="previewImage ? previewImage : currentEditBlogItem.image" alt="Preview image">
          <input @change="selectFile"
                 class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                 id="file_input" type="file">
        </div>
        <MainButton type="submit" color="blue" size="expand">Submit</MainButton>
      </form>
    </div>
  </section>
  <ActionSpinner v-if="loadingStore.isActionLoading || isLoading"/>
</template>

<script setup lang="ts">
import ActionSpinner from "~/components/UI/ActionSpinner.vue";
import Editor from "@tinymce/tinymce-vue";
import {useLoadingStore} from "~/stores/loading";
import MainButton from "~/components/UI/MainButton.vue";

definePageMeta({
  layout: "empty"
})

const loadingStore = useLoadingStore()

const router = useRouter()

const key = import.meta.env.VITE_TINYMCE_API

const isLoading = ref(false)

const file = ref("")
const previewImage = ref("")

const selectFile = (e: { target: { files: any[]; }; }) => {
  file.value = e.target.files[0]
  const previewFile = e.target.files[0]
  previewImage.value = URL.createObjectURL(previewFile)
}

const currentEditBlogItem = ref<BlogType>()

const supabase = useSupabaseClient()

const getCurrentEditBlog = async () => {

  try {
    loadingStore.isActionLoading = true
    let {data: blogs, error} = await supabase
        .from('blogs')
        .select("*")
        .eq('id', route.params.id)
        .single()

    currentEditBlogItem.value = blogs
  } catch (error) {
    console.error(error)
  } finally {
    loadingStore.isActionLoading = false
  }
}

const updateBlog = async () => {

  try {
    isLoading.value = true
    const imageName = currentEditBlogItem.value!.image.replace("https://ssusfaxxsolkavabffjm.supabase.co/storage/v1/object/public/product_images/images/", "")

    if (file.value) {

      await supabase
          .storage
          .from('product_images')
          .remove([`images/${imageName}`])
    }

    const {data, error} = await supabase
        .from('blogs')
        .update(currentEditBlogItem.value)
        .eq('id', route.params.id)
        .select()
        .single()

    router.replace("/admin/blogs")
  }catch (error) {
    console.error(error)
  }finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getCurrentEditBlog()
})

const route = useRoute()

</script>