<template>
  <div class="flex flex-col gap-4 mx-4">
    <AdminBlogItem :admin-blog="adminBlog" v-for="adminBlog in adminBlogs" />
  </div>
</template>

<script setup lang="ts">

defineProps({
  adminBlogs: {
    required: true,
    type: Array as PropType<BlogType[]>
  }
})
</script>
