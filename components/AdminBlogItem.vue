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
      <img src="/edit.svg" alt="edit">
      <img src="/delete.svg" alt="delete">
    </div>
  </article>
</template>

<script setup lang="ts">

import {PropType} from "@vue/runtime-core";

const props = defineProps({
  adminBlog: {
    required: true,
    type: Object as PropType<BlogType>
  }
})

const blogDate = computed(() => {
  let date = new Date(props.adminBlog.created_at);

  let month = date.toLocaleString('default', {month: 'long'});
  let day = date.getDate();
  let year = date.getFullYear();

  return month + ' ' + day + ', ' + year
})
</script>