<template>
<section class="mt-10 mx-6">
  <NuxtLink class="inline-flex gap-2 bg-gray-100 py-2 px-4 rounded-md font-bold" to="/admin/blogs"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z"/></svg><span>Back</span></NuxtLink>
  <div class="flex flex-col gap-6 mt-10">
    <form class="flex flex-col gap-4" @submit.prevent="uploadPost">
  <input v-model="blogData.head" class="border-2 border-black p-2 rounded-md" type="text" placeholder="Post head">
  <input v-model="blogData.body_short" class="border-2 border-black p-2 rounded-md" type="text" placeholder="Post short body">
      <ClientOnly>
        <Editor
            v-if="editorLoaded"
            class="h-96"
            v-model="blogData.body"
            :init="{
          toolbar: [
    { name: 'history', items: [ 'undo', 'redo' ] },
    { name: 'styles', items: [ 'styles' ] },
    { name: 'formatting', items: [ 'bold', 'italic', 'underline', 'strikethrough', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5'] },
    { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
    { name: 'indentation', items: [ 'outdent', 'indent' ] },
    {name: 'lists', items: ['numlist', 'bullist']},
    {name: 'link', items: ['link']},
    {name: 'image', items: ['image']},
    {name: 'table', items: ['table']}
  ],
        plugins: ['lists', 'link', 'image', 'table', 'code', 'help', 'wordcount']
      }"
            :api-key="key"
        />
      </ClientOnly>
      <div class="flex justify-center">
        <img class="h-32 w-32" :src="previewImage ? previewImage : '/placeholder.png'" alt="Preview image">
        <input @change="selectFile"
               class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
               id="file_input" type="file">
      </div>
      <MainButton type="submit" color="blue" size="expand">Submit</MainButton>
    </form>
  </div>
  <ActionSpinner v-if="loadingStore.isActionLoading" />
</section>
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import MainButton from "~/components/UI/MainButton.vue";
import {useLoadingStore} from "~/stores/loading";
import ActionSpinner from "~/components/UI/ActionSpinner.vue";

definePageMeta({
  layout: "admin"
})

const router = useRouter()

const loadingStore = useLoadingStore()

const supabase = useSupabaseClient()

const key = import.meta.env.VITE_TINYMCE_API

const editorLoaded = ref<boolean>(false)

const previewImage = ref<string>()

const file = ref()

const fileUrl = ref()

const selectFile = (e: { target: { files: any[]; }; }) => {
  file.value = e.target.files[0]
  const previewFile = e.target.files[0]
  previewImage.value = URL.createObjectURL(previewFile)
}

const uploadImage = async () => {
  const {data, error} = await supabase.storage
      .from('blog_images')
      .upload(`/images/${file.value.name}`, file.value)

  if (error) {
    console.error('Ошибка загрузки файла:', error.message)
  } else {
    fileUrl.value = supabase.storage
        .from('blog_images')
        .getPublicUrl(data.path)
  }
}

const blogData = ref({
  head: "",
  body_short: "",
  body: ""
})

const uploadPost = async () => {

  if (previewImage.value) {


    try {
      loadingStore.isActionLoading = true
      await uploadImage()
      const {data, error} = await supabase
          .from('blogs')
          .insert([
            {
              head: blogData.value.head,
              body_short: blogData.value.body_short,
              body: blogData.value.body,
              image: fileUrl.value.data.publicUrl
            },
          ])
          .select()

      blogData.value = {
        head: "",
        body_short: "",
        body: ""
      }
      file.value = ""
      previewImage.value = ""

      router.replace("/admin/blogs")
    }catch (e) {

    }finally {
      loadingStore.isActionLoading = false
    }

  }
}


</script>