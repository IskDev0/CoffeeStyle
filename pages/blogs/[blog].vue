<template>
  <section class="container mx-auto px-4" v-if="currentBlog">
    <Head>
      <Title>{{currentBlog.head}}</Title>
    </Head>
    <div class="flex flex-col">
<h1 class="text-3xl font-bold">{{currentBlog.head}}</h1>
  <h2 class="flex flex-col items-start gap-4 lg:flex-row lg:items-center justify-between text-xl">{{currentBlog.body_short}}   <span class="tracking-wider uppercase text-xs">{{blogDate}}</span></h2>
    <div class="mt-10 content" v-html="currentBlog.body"></div>
    </div>
  </section>
  <TheLoader v-else/>
</template>

<script setup lang="ts">
import TheLoader from "~/components/UI/TheLoader.vue";

const route = useRoute()

const supabase = useSupabaseClient()

const currentBlog = ref<BlogType>()

useSeoMeta({
  title: () => `${currentBlog.value?.head} | CoffeeStyle`,
  description: 'Welcome to CoffeeStyle! We are a passionate team of coffee enthusiasts dedicated to providing you with the best coffee mugs on the market. Learn more about our mission, values, and commitment to quality.',
  ogTitle: () => `${currentBlog.value?.head} | CoffeeStyle`,
  ogDescription: 'Welcome to CoffeeStyle! We are a passionate team of coffee enthusiasts dedicated to providing you with the best coffee mugs on the market. Learn more about our mission, values, and commitment to quality.',
  ogImage: () => currentBlog.value?.image,
  ogUrl: route.fullPath,
  twitterTitle: `${currentBlog.value?.head} | CoffeeStyle`,
  twitterDescription: 'Welcome to CoffeeStyle! We are a passionate team of coffee enthusiasts dedicated to providing you with the best coffee mugs on the market. Learn more about our mission, values, and commitment to quality.',
  twitterImage: () => currentBlog.value?.image,
  twitterCard: 'summary_large_image'
});

const loadCurrentBlog = async (): Promise<void> => {
  let { data: blogs, error } = await supabase
      .from('blogs')
      .select("*")
      .eq('id', route.params.blog)
      .single()

  currentBlog.value = blogs

}

const blogDate = computed(() => {
  let date = new Date(currentBlog.value!.created_at);

  let month = date.toLocaleString('default', { month: 'long' });
  let day = date.getDate();
  let year = date.getFullYear();

  return month + ' ' + day + ', ' + year
})

onMounted(() => {
  loadCurrentBlog()
})
</script>

<style>
.content h1 {
  @apply text-4xl font-bold pb-4
}
.content h2 {
  @apply text-3xl font-bold pb-4
}
.content h3 {
  @apply text-2xl font-bold pb-4
}
.content h4 {
  @apply text-xl font-bold pb-4
}
.content h5 {
  @apply text-xs font-bold pb-4
}
.content p {
  @apply opacity-80 pb-4
}
.content ol {
  @apply list-decimal
}
.content ul {
  @apply list-disc
}

.content a {
  color: blue;
}
</style>