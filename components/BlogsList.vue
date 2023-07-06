<template>
  <div class="w-1/2 mx-auto grid grid-cols-3 gap-5">
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