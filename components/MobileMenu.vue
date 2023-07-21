<template>

  <div class="bg-[#1d1f2e] text-white fixed top-0 left-0 right-0 bottom-0 h-screen w-full z-30 flex flex-col items-center justify-center">
    <button class="absolute top-10 right-20 text-white" @click="$emit('close', false)">
      <span class="block w-5 h-px bg-white transform rotate-45 transition-transform duration-300"></span>
      <span class="block w-5 h-px bg-white transform -rotate-45 transition-transform duration-300"></span>
    </button>
  <nav>
    <ul class="flex flex-col items-center gap-8">
      <li @click="$emit('close', false)" v-for="mobileLink in mobileLinks" :key="mobileLink.to" class="text-xs uppercase tracking-widest transition ease-in-out duration-300 relative hover-link">
        <NuxtLink :to="mobileLink.to">{{mobileLink.text}}</NuxtLink>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script setup lang="ts">
defineProps({
  openMobile: {
    required: true,
    type: Boolean
  }
})

const mobileLinks = ref([
  {
    to: "/",
    text: "Home"
  },
  {
    to: "/products",
    text: "Our Products"
  },
  {
    to: "/blogs",
    text: "Blog"
  },
  {
    to: "/about",
    text: "About"
  },
  {
    to: "/contact",
    text: "Contact"
  }
])
</script>
