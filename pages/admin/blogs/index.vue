<template>
  <section>
    <MainButton class="ml-4" color="blue"><NuxtLink to="/admin/blogs/blogform">Add Blog</NuxtLink></MainButton>
    <AdminBlogsList v-if="!loadingStore.isActionLoading" :admin-blogs="adminBlogs"/>
    <ActionSpinner v-else/>
  </section>
</template>

<script setup lang="ts">

import ActionSpinner from "~/components/UI/ActionSpinner.vue";

definePageMeta({
  layout: "admin"
})

import {useLoadingStore} from "~/stores/loading";
import MainButton from "~/components/UI/MainButton.vue";

const loadingStore = useLoadingStore()

const supabase = useSupabaseClient()

const adminBlogs = ref<BlogType[]>([])

const loadAdminBlogs = async (): Promise<void> => {

  try {
    loadingStore.isActionLoading = true
    let {data: blogs, error} = await supabase
        .from('blogs')
        .select('*')

    adminBlogs.value = blogs
  }catch (e) {

  }finally {
    loadingStore.isActionLoading = false
  }

}

onMounted(() => {
  loadAdminBlogs()
})

</script>