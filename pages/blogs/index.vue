<template>
<BlogsList v-if="!isLoading"/>
  <TheLoader v-else/>
</template>

<script setup lang="ts">
import {useBlogsStore} from "~/stores/blogs";
import BlogsList from "~/components/BlogsList.vue";
import TheLoader from "~/components/UI/TheLoader.vue";

useSeoMeta({
  title: "Blogs | CoffeeStyle",
  description: 'Read our latest blog post on the art of choosing the perfect coffee mug. Learn about the different materials, sizes, and designs to enhance your coffee-drinking experience.',
  ogTitle: 'The Art of Choosing the Perfect Coffee Mug | YourMugShop Blog',
  ogDescription: 'Read our latest blog post on the art of choosing the perfect coffee mug. Learn about the different materials, sizes, and designs to enhance your coffee-drinking experience.',
  ogImage: '/blogs_preview.jpg',
  ogUrl: '',
  twitterTitle: 'The Art of Choosing the Perfect Coffee Mug | YourMugShop Blog',
  twitterDescription: 'Read our latest blog post on the art of choosing the perfect coffee mug. Learn about the different materials, sizes, and designs to enhance your coffee-drinking experience.',
  twitterImage: '/blogs_preview.jpg',
  twitterCard: 'summary_large_image'
});


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