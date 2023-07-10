<template>
  <article class="flex justify-between gap-4 bg-gray-100 rounded-md" v-if="adminBlog">
    <div class="flex items-center gap-2">
      <img class="h-16 w-16" :src="adminBlog.image" :alt="adminBlog.head">
      <div>
        <h1 class="font-semibold">{{ adminBlog.head }}</h1>
        <p>{{ blogDate }}</p>
      </div>
    </div>

    <div class="flex items-center gap-4 mr-6">
      <img @click="updateBlogItem(adminBlog)" class="cursor-pointer" src="/edit.svg" alt="edit">
      <img @click="deleteBlogItem(adminBlog)" class="cursor-pointer" src="/delete.svg" alt="delete">
    </div>
  </article>
</template>

<script setup lang="ts">

import {PropType} from "@vue/runtime-core";
import {useLoadingStore} from "~/stores/loading";

const loadingStore = useLoadingStore()

const router = useRouter()

const props = defineProps({
  adminBlog: {
    required: true,
    type: Object as PropType<BlogType>
  }
})

const supabase = useSupabaseClient()

const blogDate = computed(() => {
  let date = new Date(props.adminBlog.created_at);

  let month = date.toLocaleString('default', {month: 'long'});
  let day = date.getDate();
  let year = date.getFullYear();

  return month + ' ' + day + ', ' + year
})

const deleteBlogItem = async (blogItem:BlogType): Promise<void> => {

 try {
   loadingStore.isActionLoading = true
   const { error } = await supabase
       .from('blogs')
       .delete()
       .eq('id', blogItem.id)

   const imageName = props.adminBlog.image.replace("https://ssusfaxxsolkavabffjm.supabase.co/storage/v1/object/public/blog_images/images/", "")

   const { data } = await supabase
       .storage
       .from('blog_images')
       .remove([`images/${imageName}`])

 }catch (e) {
   console.log(e)
 }finally {
   loadingStore.isActionLoading = false
 }
}

const updateBlogItem = (blog:BlogType):void => {
  router.push(`/admin/blogs/${blog.id}`)
}

</script>