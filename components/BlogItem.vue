<template>
  <article v-if="blog" @click="$router.push(`/blogs/${blog.id}`)" class="flex flex-col cursor-pointer">
    <img class="w-80 h-80" :src="blog.image" :alt="blog.title">
    <div class="flex flex-col pt-8">
      <h1 class="text-xl">{{ blog.head }}</h1>
      <p class="opacity-70 pt-2.5 pb-4">{{ blog.body_short }}</p>
      <p class="tracking-widest uppercase text-xs">{{ blogDate }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

const supabase = useSupabaseClient()

const props = defineProps({
  blog: {
    required: true,
    type: Object as PropType<BlogType>
  }
})

const blogDate = computed(() => {
  let date = new Date(props.blog.created_at);

  let month = date.toLocaleString('default', { month: 'long' });
  let day = date.getDate();
  let year = date.getFullYear();

  return month + ' ' + day + ', ' + year
})


</script>