<template>
  <div class="w-1/2 mx-auto flex gap-5 mt-24">
    <BlogItem :blog="blog" v-for="blog in homeBlogs" :key="blog.id"/>
  </div>
</template>

<script setup lang="ts">
import BlogItem from "~/components/BlogItem.vue";

const homeBlogs = ref<BlogType[]>([])

const supabase = useSupabaseClient([])

const loadHomeBlogs = async () => {

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
