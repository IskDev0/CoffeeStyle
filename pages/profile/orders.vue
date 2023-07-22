<template>
<h1 class="font-bold text-xl mb-10">Orders</h1>
<OrdersList :orders="orders"/>
</template>

<script setup lang="ts">
import OrderItem from "~/components/OrderDetailsItem.vue";
import OrderDetailsItem from "~/components/OrderDetailsItem.vue";
import OrdersList from "~/components/OrdersList.vue";

definePageMeta({
  layout: "profile"
})

const supabase = useSupabaseClient()

const orders = ref<OrderType[]>([])

const loadOrders = async (): Promise<void> => {
  let { data: ordersList, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
 orders.value = ordersList
}

onMounted(() => {
  loadOrders()
})


</script>