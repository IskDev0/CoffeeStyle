<template>
  <div class="w-1/2 mx-auto flex gap-5 mt-24">
    <BlogItem :blog="blog" v-for="blog in homeBlogs" :key="blog.id"/>
  </div>
</template>

<script setup lang="ts">
import BlogItem from "~/components/BlogItem.vue";

const homeBlogs = ref<BlogType[]>([
  {
    "id": 1,
    "title": "Health Check: why do I get a headache when I haven’t had my coffee?",
    "short_body": "It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
    "body": "",
    "image": "/blogs/blog-image-1.jpg",
    "date": "October 9, 2018"
  },
  {
    "id": 2,
    "title": "How long does a cup of coffee keep you awake?",
    "short_body": "It is a paradisematic country, in which roasted parts. Vel qui et ad voluptatem.",
    "body": "",
    "image": "/blogs/blog-image-2.jpg",
    "date": "October 9, 2018"
  },
  {
    "id": 3,
    "title": "Recent research suggests that heavy coffee drinkers may reap health benefits.",
    "short_body": "It is a paradisematic country, in which roasted parts of sentences fly into your mouth.",
    "body": "",
    "image": "/blogs/blog-image-3.jpg",
    "date": "October 9, 2018"
  },
])
</script>
