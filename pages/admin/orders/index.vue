<template>
  <AdminOrdersSort/>
<AdminOrdersList :admin-orders="adminStore.sortedAdminOrders" />
  <div class="h-screen flex flex-col items-center justify-center">
  <TheLoader v-if="loadingStore.isActionLoading"/>
  </div>
</template>

<script setup lang="ts">

import {useAdminStore} from "~/stores/admin";
import {useLoadingStore} from "~/stores/loading";
import AdminOrdersList from "~/components/AdminOrdersList.vue";
import AdminOrdersSort from "~/components/AdminOrdersSort.vue";
import TheLoader from "~/components/UI/TheLoader.vue";

definePageMeta({
  layout: "admin"
})

const adminStore = useAdminStore()
const loadingStore = useLoadingStore()

const supabase = useSupabaseClient()

const adminOrders = ref([])

const loadAdminOrders = async () => {

  let { data: orders, error } = await supabase
      .from('orders')
      .select('*')

  adminStore.adminOrders = orders
}

onMounted(async ()=> {
  await loadAdminOrders()

  adminStore.sortedAdminOrders = adminStore.adminOrders
})
</script>