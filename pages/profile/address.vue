<template>
<h1 class="font-bold text-xl">Your address</h1>
  <div class="flex flex-col gap-4 mb-10">
  <div class="flex justify-between py-2 px-4 border-l-4 border-l-gray-300" v-for="address in addresses">
    <div>
      <p>Country: {{address.country}}</p>
    <p v-if="address.state">State: {{address.state}}</p>
    <p v-if="address.city">City: {{address.city}}</p>
      <p>Street: {{address.street}}</p>
      <p>{{address.postal_code}}</p>
    </div>
    <button @click="deleteAddress(address)"><img src="/delete.svg" alt=""></button>
  </div>
  </div>
  <AddAddress @open="openLoadingPopup(value)"/>
  <LoadingPopup v-if="isLoading" />
</template>

<script setup lang="ts">
import AddAddress from "~/components/AddAddress.vue";
import LoadingPopup from "~/components/UI/LoadingPopup.vue";

definePageMeta({
  layout: "profile"
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const isLoading = ref<boolean>(false)

const addresses = ref<AddressType[]>([])

const openLoadingPopup = (value: boolean):void => {
  isLoading.value = value
}

const loadUserAddress = async ():Promise<void> => {

  let { data: address, error } = await supabase
      .from('addresses')
      .select('*')
      .filter('user_id', 'eq', user.value!.id)

  addresses.value = address

}

const deleteAddress = async (address:AddressType): Promise<void> => {

 try {
   isLoading.value = true
   const { error } = await supabase
       .from('addresses')
       .delete()
       .eq('id', address.id)
 }catch (e){
   console.log(e)
 }finally {
   isLoading.value = false
 }

}

onMounted(() => {
  loadUserAddress()

  const channel = supabase.channel('table-db-changes')

  const subscription = channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'addresses',
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          addresses.value.unshift(payload.new)
        } else if (payload.eventType === 'DELETE') {
          addresses.value = addresses.value.filter(item => item.id !== payload.old.id)
        } else if (payload.eventType === 'UPDATE') {
          const index = addresses.value.findIndex(d => d.id === payload.new.id)
          if (index !== -1) {
            addresses.value[index] = payload.new
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