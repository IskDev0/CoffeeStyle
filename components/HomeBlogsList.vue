<template>
  <div class="container mx-auto flex flex-col items-center gap-8 md:grid md:grid-cols-2 lg:grid-cols-3 px-4 gap-5 mt-24">
    <BlogItem :blog="blog" v-for="blog in homeBlogs" :key="blog.id"/>
  </div>
</template>

<script setup lang="ts">
import BlogItem from "~/components/BlogItem.vue";

const homeBlogs = ref<BlogType[]>([])

const supabase = useSupabaseClient()

const loadHomeBlogs = async ():Promise<void> => {

  let { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)

  homeBlogs.value = blogs
}

onMounted(() => {
  loadHomeBlogs()
})
</script>
