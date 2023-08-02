<template>
  <div class="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
<BlogItem
v-for="blog in blogsStore.blogs"
:key="blog.id"
:blog="blog"
/>
  </div>
</template>

<script setup lang="ts">
import {useBlogsStore} from "~/stores/blogs";
const blogsStore = useBlogsStore()
import BlogItem from "~/components/BlogItem.vue";
</script>