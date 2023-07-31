<template>
  <section class="px-10 bg-gray-100 h-screen pt-10">
    <div class="bg-white p-4 rounded-md">
      <h1 class="font-bold text-xl mb-10">Order Items</h1>
      <div v-if="currentOrderDetails && !isLoading">
        <AdminOrderDetailsList :current-order-details="currentOrderDetails"/>
        <div class="flex justify-between my-8">
          <p class="font-bold py-1 px-2 rounded-md" :class="orderStatus">{{ currentOrderDetails.status }}</p>
          <p class="flex justify-end font-black text-xl">${{ currentOrderDetails.total.toFixed(2) }}</p>
        </div>
      </div>
      <TheLoader v-else/>
    </div>

    <div class="bg-white p-4 rounded-md mt-10">
      <h1 class="font-bold text-xl mb-10">Customer Details</h1>
      <div class="w-[800px] flex justify-between">
        <CurrentOrderUser
            :current-order-user="currentOrderUser"
            v-if="currentOrderUser"/>
        <TheLoader v-else/>
        <OrderUserAddress v-if="currentOrderDetails" :is-loading="isLoading" :current-order-details="currentOrderDetails"/>
        <div v-else class="flex justify-center">
          <TheLoader/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AdminOrderDetailsList from "~/components/AdminOrderDetailsList.vue";
import TheLoader from "~/components/UI/TheLoader.vue";
import OrderUserAddress from "~/components/OrderUserAddress.vue";
import CurrentOrderUser from "~/components/CurrentOrderUser.vue";

definePageMeta({
  layout: "admin"
})

const route = useRoute()

const supabase = useSupabaseClient()

const isLoading = ref<boolean>(false)

const currentOrderDetails = ref<OrderType>()

const currentOrderUser = ref()

const currentOrderUserAddress = ref()

const loadCurrentOrderDetails = async (): Promise<void> => {

  try {
    isLoading.value = true
    let {data: orders, error} = await supabase
        .from('orders')
        .select('*')
        .eq('id', route.params.id)
        .single()

    currentOrderDetails.value = orders
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const loadCurrentOrderUser = async (): Promise<void> => {

  let {data: user, error} = await supabase
      .from('users')
      .select('*')
      .eq('id', currentOrderDetails.value!.user_id)
      .single()

  currentOrderUser.value = user
}

const orderStatus = computed(() => {
  return {
    'text-yellow-400': currentOrderDetails.value!.status == "Pending",
    'bg-yellow-100': currentOrderDetails.value!.status == "Pending",
    'text-red-400': currentOrderDetails.value!.status == "Canceled",
    'bg-red-100': currentOrderDetails.value!.status == "Canceled",
    'text-green-400': currentOrderDetails.value!.status == "Complete",
    'bg-green-100': currentOrderDetails.value!.status == "Complete",
  }
})

onMounted(async () => {
  await loadCurrentOrderDetails()
  await loadCurrentOrderUser()
})
</script>