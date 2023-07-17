<template>
<AdminOrdersList :admin-orders="adminOrders" />
</template>

<script setup lang="ts">


import AdminOrdersList from "~/components/AdminOrdersList.vue";

definePageMeta({
  layout: "admin"
})

const supabase = useSupabaseClient()

const adminOrders = ref([])

const loadAdminOrders = async () => {

  let { data: orders, error } = await supabase
      .from('orders')
      .select('*')

  adminOrders.value = orders
}

const loadUser = async () => {



}

onMounted(()=> {
  loadAdminOrders()
})
</script>