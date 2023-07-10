<template>
  <section>
    <MainButton class="ml-4" color="blue"><NuxtLink to="/admin/blogs/blogform">Add Blog</NuxtLink></MainButton>
    <AdminBlogsList v-if="!isLoading" :admin-blogs="adminBlogs"/>
    <ActionSpinner v-if="loadingStore.isActionLoading"/>
  </section>
</template>

<script setup lang="ts">

import ActionSpinner from "~/components/UI/ActionSpinner.vue";

definePageMeta({
  layout: "admin"
})

import {useLoadingStore} from "~/stores/loading";
import MainButton from "~/components/UI/MainButton.vue";
import TheLoader from "~/components/UI/TheLoader.vue";

const loadingStore = useLoadingStore()

const supabase = useSupabaseClient()

const adminBlogs = ref<BlogType[]>([])

const isLoading = ref<boolean>(false)

const loadAdminBlogs = async (): Promise<void> => {

  try {

    let {data: blogs, error} = await supabase
        .from('blogs')
        .select('*')

    adminBlogs.value = blogs
  }catch (e) {

  }finally {

  }

}

onMounted(() => {
  loadAdminBlogs()

  const channel = supabase.channel('table-db-changes')

  const subscription = channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'blogs',
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          adminBlogs.value.unshift(payload.new)
          console.log("added")
        } else if (payload.eventType === 'DELETE') {
          adminBlogs.value = adminBlogs.value.filter(item => item.id !== payload.old.id)
        } else if (payload.eventType === 'UPDATE') {
          const index = adminBlogs.value.findIndex(d => d.id === payload.new.id)
          if (index !== -1) {
            adminBlogs.value[index] = payload.new
          }
        }
      }
  )

  channel.subscribe()

  onUnmounted(() => {
    channel.unsubscribe()
  })
})

</script>