<template>
  <AdminOrdersSort/>
  <AdminOrdersList v-if="adminStore.sortedAdminOrders.length > 0" :admin-orders="adminStore.sortedAdminOrders"/>
  <p class="font-bold text-center text-2xl mt-10" v-else>No such orders</p>
  <TheLoader v-if="loadingStore.isActionLoading"/>
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

const loadAdminOrders = async (): Promise<void> => {

  let {data: orders, error} = await supabase
      .from('orders')
      .select('*')

  adminStore.adminOrders = orders
}

onMounted(async () => {
  await loadAdminOrders()

  adminStore.sortedAdminOrders = adminStore.adminOrders
})
</script>