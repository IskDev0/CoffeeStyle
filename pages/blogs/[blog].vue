<template>
  <section class="w-1/2 mx-auto" v-if="currentBlog">
    <div class="flex flex-col">
<h1 class="text-3xl font-bold">{{currentBlog.head}}</h1>
  <h2 class="flex items-center justify-between text-xl">{{currentBlog.body_short}}   <span class="tracking-wider uppercase text-xs">{{blogDate}}</span></h2>
    <p class="mt-10 opacity-70">{{currentBlog.body}}</p>
    </div>
  </section>
  <TheLoader v-else/>
</template>

<script setup lang="ts">
import TheLoader from "~/components/UI/TheLoader.vue";

const route = useRoute()

const supabase = useSupabaseClient()

const currentBlog = ref<BlogType>()

const loadCurrentBlog = async () => {
  let { data: blogs, error } = await supabase
      .from('blogs')
      .select("*")
      .eq('id', route.params.blog)
      .single()

  currentBlog.value = blogs

}

const blogDate = computed(() => {
  let date = new Date(currentBlog.value.created_at);

  let month = date.toLocaleString('default', { month: 'long' });
  let day = date.getDate();
  let year = date.getFullYear();

  return month + ' ' + day + ', ' + year
})

onMounted(() => {
  loadCurrentBlog()
})
</script>