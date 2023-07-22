<template>
<BlogsList v-if="!isLoading"/>
  <TheLoader v-else/>
</template>

<script setup lang="ts">
import {useBlogsStore} from "~/stores/blogs";
import BlogsList from "~/components/BlogsList.vue";
import TheLoader from "~/components/UI/TheLoader.vue";

const blogsStore = useBlogsStore()

const supabase = useSupabaseClient()

const isLoading = ref<boolean>(false)

const loadBlogs = async (): Promise<void> => {

  try {
    isLoading.value = true
    let { data: blogsList, error } = await supabase
        .from('blogs')
        .select('*')


    blogsStore.blogs = blogsList
  }catch (e) {

  }finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadBlogs()
})
</script>