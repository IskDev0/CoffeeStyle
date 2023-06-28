<template>
  <article class="flex flex-col">
    <img class="w-80 h-80" :src="blog.image" :alt="blog.title">
    <div class="flex flex-col pt-8">
      <h1 class="text-xl">{{ blog.title }}</h1>
      <p class="opacity-70 pt-2.5 pb-4">{{ blog.short_body }}</p>
      <p class="tracking-widest uppercase text-xs">{{ blog.date }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

defineProps({
  blog: {
    required: true,
    type: Object as PropType<BlogType>
  }
})
</script>