<template>
<div :class="{'bg-gray-100' : index % 2 === 0}" v-if="currentUser" class="grid grid-cols-5 justify-items-center items-center py-2 px-4 gap-8">
  <div class="flex gap-4">
  <p>{{currentUser.first_name}}</p>
  <p>{{currentUser.last_name}}</p>
  </div>
  <p :class="orderStatus" class="min-w-0 font-semibold py-1 px-2 rounded-md w-24 text-center">{{adminOrder.status}}</p>
  <div class="flex flex-col gap-4">
  <div class="flex justify-between gap-4" v-for="product in adminOrder.products">
    <p>{{product.title}}</p>
    <p>{{product.quantity}}</p>
  </div>

</div>
  <p>{{orderDate}}</p>
  <p>{{(adminOrder.total).toFixed(2)}}$</p>
</div>
</template>

<script setup lang="ts">
const props = defineProps({
  adminOrder: {
    required: true
  },
  index: {
    required: true,
    type: Number
  }
})

const supabase = useSupabaseClient()

const currentUser = ref()

import {useLoadingStore} from "~/stores/loading";
const loadingStore = useLoadingStore()

const loadCurrentUser = async () => {

  try {
    loadingStore.isActionLoading = true
    let { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', props.adminOrder.user_id)
        .single()

    currentUser.value = user
  }catch (e) {

  }finally {
    loadingStore.isActionLoading = false
  }
}

const orderDate = computed(() => {
  const date = new Date(props.adminOrder.created_at)

  const day = date.getDate()
  let month = date.toLocaleString('default', {month: 'long'});
  const year = date.getFullYear()

  return day + " " + month + ', ' + year
})

const orderStatus = computed(() => {
  return {
    'text-yellow-400' : props.adminOrder.status == "Pending",
    'bg-yellow-100' : props.adminOrder.status == "Pending",
    'text-red-400' : props.adminOrder.status == "Canceled",
    'bg-red-100' : props.adminOrder.status == "Canceled",
    'text-green-400' : props.adminOrder.status == "Complete",
    'bg-green-100' : props.adminOrder.status == "Complete",
  }
})

onMounted(()=> {
  loadCurrentUser()
})
</script>