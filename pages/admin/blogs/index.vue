<template>
  <section>
    <AdminBlogsList :admin-blogs="adminBlogs"/>
  </section>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "admin"
})

const supabase = useSupabaseClient()

const adminBlogs = ref<BlogType[]>([])

const loadAdminBlogs = async (): Promise<void> => {

  let {data: blogs, error} = await supabase
      .from('blogs')
      .select('*')

  adminBlogs.value = blogs

}

onMounted(() => {
  loadAdminBlogs()
})

</script>