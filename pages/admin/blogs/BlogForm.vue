<template>
<section class="mt-10 mx-6">
  <NuxtLink class="inline-flex gap-2 bg-gray-100 py-2 px-4 rounded-md font-bold" to="/admin/blogs"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160 160-480l320-320 42 42-248 248h526v60H274l248 248-42 42Z"/></svg><span>Back</span></NuxtLink>
  <div class="flex flex-col gap-6 mt-10">
    <form class="flex flex-col gap-4" @submit.prevent="uploadPost">
  <input v-model="blogData.head" class="border-2 border-black p-2 rounded-md" type="text" placeholder="Post head">
  <input v-model="blogData.body_short" class="border-2 border-black p-2 rounded-md" type="text" placeholder="Post short body">
      <ClientOnly>
        <Editor
            class="h-96"
            v-model="blogData.body"
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
      <MainButton type="submit" color="blue" size="expand">Submit</MainButton>
    </form>
  </div>
</section>
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import MainButton from "~/components/UI/MainButton.vue";

definePageMeta({
  layout: "admin"
})

const supabase = useSupabaseClient()

const key = import.meta.env.VITE_TINYMCE_API

const blogData = ref({
  head: "",
  body_short: "",
  body: ""
})

const uploadPost = async () => {

  const { data, error } = await supabase
      .from('blogs')
      .insert([
        {
          head: blogData.value.head,
          body_short: blogData.value.body_short,
          body: blogData.value.body
        },
      ])
      .select()

  blogData.value.head = ""
  blogData.value.body_short = ""
  blogData.value.body = ""

  console.log("cock")

}

</script>